import { Prediction, TransitRoute, Stop } from "../types/Transit.type";
import FavouriteService from "./FavouriteService";

class TTCApi {
  static readonly HOST = "http://webservices.nextbus.com/service/publicXMLFeed";
  static readonly QUERY_ROUTELIST = "?command=routeList&a=<agency>";
  static readonly QUERY_ROUTE = "?command=routeConfig&a=<agency>&r=<route>";
  static readonly QUERY_PREDICTIONS =
    "?command=predictions&a=<agency>&r=<route>&s=<stop>";

  agency: string;

  constructor() {
    this.agency = "ttc";
  }

  static FIELD_WHITELIST = ["tag", "title"];
  async GetRoutes(): Promise<TransitRoute[]> {
    const res = await (
      await fetch(
        TTCApi.HOST + TTCApi.QUERY_ROUTELIST.replace("<agency>", this.agency)
      )
    ).text();
    const xml = new window.DOMParser().parseFromString(res, "text/xml");
    const json = this.XmlToJson(xml.documentElement);

    const routes: TransitRoute[] = json.children;
    return routes;
  }

  async GetRoute(tag: string): Promise<TransitRoute> {
    const res = await (
      await fetch(
        TTCApi.HOST +
          TTCApi.QUERY_ROUTE.replace("<agency>", this.agency).replace(
            "<route>",
            tag
          )
      )
    ).text();
    const xml = new window.DOMParser().parseFromString(res, "text/xml");
    const json = this.XmlToJson(xml.documentElement);
    if (json.children[0].name === "Error") {
      throw json.children[0].text;
    }
    const route: TransitRoute = {
      title: json.children[0].title,
      tag: json.children[0].tag,
      color: json.children[0].color,
      stops: json.children[0].children,
    };

    route.stops = route.stops!!.map((s: Stop) => {
      s.route = route;
      return s;
    });

    return route;
  }

  async GetStopPredictions(
    stopTag: string,
    routeTag: string
  ): Promise<Prediction[]> {
    const res = await (
      await fetch(
        TTCApi.HOST +
          TTCApi.QUERY_PREDICTIONS.replace("<agency>", this.agency)
            .replace("<route>", routeTag)
            .replace("<stop>", stopTag)
      )
    ).text();
    const xml = new window.DOMParser().parseFromString(res, "text/xml");
    const json = this.XmlToJson(xml.documentElement);
    if (!json.children || json.children[0].name === "Error") {
      throw json.children[0].text || "ERROR";
    }
    if (json.children[0]?.children) {
      const predictions: Prediction[] = json.children[0]?.children[0]?.children.map(
        (p: any) => {
          p.prediction = parseInt(p.prediction);
          return p;
        }
      );
      return predictions;
    } else {
      return [];
    }
  }

  async GetStop(stopTag: string, routeTag: string): Promise<Stop> {
    const favouriteService = new FavouriteService();
    const route = await this.GetRoute(routeTag);
    const stop = route.stops?.find((s) => s.tag === stopTag);
    if (!stop) {
      throw Error(`Stop '${stopTag}' not found`);
    } else {
      stop.predictions = await this.GetStopPredictions(stopTag, routeTag);
      stop.fave = favouriteService.IsFavourite(stop);
      return stop;
    }
  }

  async GetMultiStopPredictions(stopTags: string[], routeTag: string) {}

  async _GETALLSTOPS(): Promise<Stop[]> {
    const timeoutPromise = (duration: number) => {
      return new Promise((res) => {
        setTimeout(res, duration);
      });
    };

    const routeList = await this.GetRoutes();

    const routeRequests = await routeList.map(async (r) => {
      await timeoutPromise(25);
      return await this.GetRoute(r.tag);
    });

    const routes = await Promise.all(routeRequests);
    console.log(routes);
    const stops = routes.reduce((prev, curr) => {
      prev = prev.concat(curr.stops || []);
      return prev;
    }, [] as Stop[]);

    return stops;
  }

  //recursive XMLToJsonFunction
  XmlToJson(el: Element): any {
    let ret: any = {};
    Array.from(el.attributes).forEach((attr, i) => {
      ret[attr.name] = attr.value;
    });
    ret.name = el.tagName;
    ret.text = el.textContent;
    if (el.hasChildNodes()) {
      ret.children = Array.from(el.children).map((child, i) => {
        return this.XmlToJson(child);
      });
    }
    return ret;
  }
}

export default TTCApi;

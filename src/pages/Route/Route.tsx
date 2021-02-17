import React, { useCallback, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Layout from "../../components/layout/Layout";
import LazyLoader from "../../components/lazyloader/LazyLoader";
import RouteSearch from "../../components/search/Search";
import TransitStopListItem from "../../components/transitstop/TransitStop";
import TTCApi from "../../services/TTCApi";
import { Stop, TransitRoute } from "../../types/Transit.type";
import {
  RouteTitle,
  StopListContainer,
  Wrapper,
  SectionTitle,
} from "./Route.styles";

interface MatchParams {
  routeTag: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const defaultRoute: TransitRoute = {
  title: "",
  tag: "",
  color: "",
};

const Route: React.FC<Props> = ({ match }) => {
  const [stopFilter, setStopFilter] = React.useState<string>("");
  const [route, setRoute] = React.useState<TransitRoute>(defaultRoute);
  const [loadedStops, setLoadedStops] = React.useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = React.useState<Stop | null>(null);

  const LoadNewStops = useCallback(async (numStops = 3) => {
    if (route && route.stops && route.stops.length > 0) {
      //if no more stops, then dont load
      if (loadedStops.length >= route.stops.length) {
        console.log("no more stops!");
        return;
      }
      const ttcApi = new TTCApi();
      const newStops = route.stops?.slice(
        loadedStops?.length,
        loadedStops?.length + numStops
      );
      const predictionStops = newStops?.map(async (s) => {
        s.predictions = await ttcApi.GetStopPredictions(s.tag, route.tag);
        return s;
      });
      const s = await Promise.all(predictionStops!!);
      const updatedStops = loadedStops?.concat(s);
      setLoadedStops(updatedStops);
    }
  }, [loadedStops, route]);

  useEffect(() => {
    const ttcApi = new TTCApi();
    const f = async () => {
      const fetchedRoute = await ttcApi.GetRoute(match.params.routeTag);
      setRoute(fetchedRoute);
    };
    f();
  }, [match.params.routeTag]);

  useEffect(() => {
    if(loadedStops.length === 0){
      LoadNewStops(9);
    }
  }, [route, LoadNewStops, loadedStops]);

  const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.name === "stopFilter") {
      setStopFilter(ev.target.value);
    }
  };

  const resultClickHandler = async (result: string) => {
    const s = route.stops?.find((s) => s.title === result);
    if (s) {
      const ttcApi = new TTCApi();
      s.predictions = await ttcApi.GetStopPredictions(s.tag, route.tag);
      setSelectedStop(s);
    }
  };

  const clearSelectedStop = () => {
    setSelectedStop(null);
  };

  return (
    <Layout>
      <RouteTitle>{route.title}</RouteTitle>
      <RouteSearch
        onChange={(ev) => {
          changeHandler(ev);
        }}
        onResultClick={(s) => {
          resultClickHandler(s);
        }}
        name={"stopFilter"}
        value={stopFilter}
        results={route.stops
          ?.filter(
            (s) =>
              s.title?.toLowerCase().indexOf(stopFilter.toLowerCase().trim()) >
              -1
          )
          .map((s) => s.title)}
      />
      <SectionTitle>Stops</SectionTitle>
      {selectedStop ? (
        <Wrapper>
          <StopListContainer>
            <TransitStopListItem
              stop={selectedStop}
              key={selectedStop.tag}
              onCloseButtonClick={clearSelectedStop}
            />
          </StopListContainer>
        </Wrapper>
      ) : (
        <LazyLoader
          onScrollToBottom={() => {
            LoadNewStops();
          }}
        >
          <Wrapper>
            <StopListContainer>
              <TransitionGroup component={null} enter={true} exit={true}>
                {loadedStops?.map((s) => (
                  <CSSTransition
                    key={s.tag}
                    timeout={{ enter: 500, exit: 300 }}
                    classNames="pop-fade"
                    in={true}
                  >
                    <TransitStopListItem stop={s} key={s.tag} />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </StopListContainer>
          </Wrapper>
        </LazyLoader>
      )}
    </Layout>
  );
};

export default Route;

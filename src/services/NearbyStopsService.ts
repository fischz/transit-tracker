
//to save on api requests, the locations of all stops is saved in a static file, this service class handles operations that require an index of all stops regardless of routes

import { Stop } from "../types/Transit.type";
import TTCApi from "./TTCApi";

class NearbyStopsService {

    //distance is in km 
    async GetNearbyStops (lat: number, lng: number, distance = 0.15): Promise<Stop[]> {

        const req = await fetch('/stops.json')
        const json = await req.json()
        const nearby = json.filter((s:any) => {
            return this.GetDistance(lat, lng, s.lat, s.lon) < distance; 
        })
        console.log(nearby);
        if(nearby.length && nearby.length > 0){
            const ttcApi = new TTCApi();
            const nearbyStopRequests = nearby.map(async (n:any):Promise<Stop> => {
                const s = await ttcApi.GetStop(n.stopTag, n.routeTag)
                return s;
            });
            const nearbyStops = await Promise.all(nearbyStopRequests) as Stop[];
            console.log(nearbyStops);
            return nearbyStops;
        }

        return []
    }

    //use haversine formula to get distance between given coords and coords of each stop
    GetDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
        const latDiff = (lat2-lat1) * (Math.PI/180);
        const lngDiff = (lng2-lng1) * (Math.PI/180);
        
        const a = 
            Math.sin(latDiff/2) * Math.sin(latDiff/2) +
            Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
            Math.sin(lngDiff/2) * Math.sin(lngDiff/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        var d = 6371 * c;
        return d;
    }


}

export default NearbyStopsService;
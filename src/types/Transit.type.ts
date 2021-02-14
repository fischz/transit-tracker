export interface TransitRoute {
  tag: string;
  title: string;
  color: string;
  stops?: Stop[];
}

export interface Stop {
  stopId: string;
  tag: string;
  title: string;
  route: TransitRoute;
  lat: string;
  lon: string;
  predictions?: Prediction[];
  fave?: boolean;
}

export interface Prediction {
  epochTime: number;
  minutes: number;
  seconds: number;
  dirTag: string;
}

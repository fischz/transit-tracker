import React from "react";
import { MapAspectRatioContainer, MapIFrame } from "./TransitStopMap.styles";

interface Props {
  lat: string;
  lon: string;
  title: string;
}

const TransitStopMap: React.FC<Props> = ({ lat, lon, title }) => (
  <MapAspectRatioContainer>
    <MapIFrame
      title={title}
      width="100%"
      height="300px"
      frameBorder="0"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLEMAPS_KEY}
        &q=${title}&zoom=17`}
    />
  </MapAspectRatioContainer>
);

export default TransitStopMap;

import React, { useCallback, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Layout from "../../components/layout/Layout";
import RouteList from "../../components/routelist/RouteList";
import { InputGroup } from "../../components/shared.styles";
import TransitStopListItem from "../../components/transitstop/TransitStop";
import {
  Collapsible,
  ToggleButton,
} from "../../components/transitstop/TransitStop.styles";
import FavouriteService from "../../services/FavouriteService";
import NearbyStopsService from "../../services/NearbyStopsService";
import TTCApi from "../../services/TTCApi";
import { TransitRoute, Stop } from "../../types/Transit.type";
import {
  SectionTitle,
  StopListContainer,
  Wrapper,
} from "../Route/Route.styles";

type FetchState =  'notStarted' | 'fetching' | 'success' | 'error'

const Index: React.FC = () => {
  const [routes, setRoutes] = useState<TransitRoute[]>([]);
  const [nearbyStopsFetchState,setNearbyStopsFetchState] = useState<FetchState>('notStarted');
  const [
    geolocation,
    setGeolocation,
  ] = React.useState<GeolocationPosition | null>(null);

  const [favourites, setFavourites] = useState<Stop[]>([]);
  const [nearbyStops, setNearbyStops] = useState<Stop[]>([]);
  const [nearbyStopDistance, setNearByStopDistance] = useState<number>(0.25);

  const [isNearbySettingsOpen, setisNearbySettingsOpen] = useState<boolean>(
    false
  );

  const getFavourites = useCallback(async () => {
    const favouriteService = new FavouriteService();
    const favourites = await favouriteService.GetFavourites();
    setFavourites(favourites);
  }, [setFavourites]);

  const getNearbyStops = useCallback(
    async (pos: GeolocationPosition) => {
      setNearbyStopsFetchState('fetching');
      const nearbyService = new NearbyStopsService();
      const nearbyStops = await nearbyService.GetNearbyStops(
        pos.coords.latitude,
        pos.coords.longitude,
        nearbyStopDistance
      );
      setNearbyStopsFetchState('success');
      setNearbyStops(nearbyStops);
    },
    [nearbyStopDistance]
  );

  const getGeoLocation = useCallback(async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setGeolocation(pos);
        getNearbyStops(pos);
      });
    } else {
      console.log("Location Not available");
    }
  }, [getNearbyStops]);

  const ToggleSettingsPopup = useCallback(async () => {
    if (isNearbySettingsOpen) {
      setisNearbySettingsOpen(false);
    } else {
      setisNearbySettingsOpen(true);
    }
  }, [isNearbySettingsOpen]);

  useEffect(() => {
    const ttcApi = new TTCApi();
    (async () => {
      const routes = await ttcApi.GetRoutes();
      setRoutes(routes);
    })();
    getFavourites();
    getGeoLocation();
  }, [getFavourites, getGeoLocation]);

  return (
    <Layout>
      <SectionTitle>
        <span>Nearby Stops</span>
        <ToggleButton
          onClick={ToggleSettingsPopup}
          enabled={isNearbySettingsOpen}
        >
          <img src="/settings.svg" alt="open map button"></img>
        </ToggleButton>
      </SectionTitle>
      <Collapsible open={isNearbySettingsOpen}>
        <Wrapper>
          <InputGroup>
            <span> Distance </span>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={nearbyStopDistance}
              onChange={(ev) => {
                setNearByStopDistance(parseFloat(ev.currentTarget.value));
              }}
            />
            <span>{`${nearbyStopDistance}km`}</span>
          </InputGroup>
          <InputGroup>
            <span>Location</span>
            {geolocation ? (
              <span>{`${geolocation?.coords.latitude}, ${geolocation?.coords.longitude}`}</span>
            ) : (
              <span>Unavailable</span>
            )}
          </InputGroup>
        </Wrapper>
      </Collapsible>
      {geolocation ? (
        <Wrapper>
          {nearbyStopsFetchState === 'success'? <StopListContainer>
            <TransitionGroup component={null} enter={true} exit={true}>
              {nearbyStops?.map((s) => (
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
          </StopListContainer>: <span> Fetching Stops...</span> }
        </Wrapper>
      ) : (
        <Wrapper>
          <span>Enable Location to see nearby stops</span>
        </Wrapper>
      )}

      <SectionTitle>Favorite Stops</SectionTitle>
      {favourites.length > 0 ? (
        <Wrapper>
          <StopListContainer>
            <TransitionGroup component={null} enter={true} exit={true}>
              {favourites?.map((s) => (
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
      ) : (
        <Wrapper>Favorited stops will be displayed here.</Wrapper>
      )}
      <SectionTitle>Browse Routes</SectionTitle>
      <RouteList routes={routes} />
    </Layout>
  );
};

export default Index;

import React, { useCallback, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import FavouriteService from '../../services/FavouriteService';
import { Stop } from '../../types/Transit.type';
import TransitPredictionListItem from './TransitPredictionListItem';
import { CloseButton, Container, Header, PredictionsContainer, Collapsible, ActionBar, ToggleButton, SubHeader } from './TransitStop.styles';
import TransitStopMap from './TransitStopMap';


interface Props {
    stop: Stop;
    onCloseButtonClick?: () => void
}

const TransitStopListItem: React.FC<Props> = ({stop, onCloseButtonClick}) => {

    const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
    const [isMapOpened, setIsMapOpened] = useState<boolean>(false);
    const [isFavourite, setIsFavourite] = useState<boolean>(stop.fave || false);

    const ToggleMap = useCallback(() => {
        setIsMapOpen(!isMapOpen);
    }, [isMapOpen, setIsMapOpen]);

    const ToggleFavourite = useCallback(() => {
        const favouriteService = new FavouriteService();
        if(isFavourite){
            favouriteService.RemoveFavourite(stop);
            setIsFavourite(false);
        } else {
            favouriteService.AddFavourite(stop);
            setIsFavourite(true);
        }
        
    }, [stop, isFavourite, setIsFavourite]);

    return <Container>
        <div>
        <Header>
            <span>{stop.title}</span>
            { onCloseButtonClick? <CloseButton onClick={onCloseButtonClick}>X</CloseButton>: null }
        </Header>
        <SubHeader>
            <span>{stop.route.title}</span>
        </SubHeader>
        <PredictionsContainer>
            {(stop.predictions && stop.predictions.length > 0)? stop.predictions?.map((p, i) => (
                <TransitPredictionListItem prediction={p} key={i}/>
            )): <span>Arrival times unavailable.</span>}
        </PredictionsContainer>
        <Collapsible open={isMapOpen}>
            <CSSTransition key={stop.tag} classNames='pop-fade' timeout={{enter: 500, exit: 500}} in={isMapOpen} onEnter={() => {setIsMapOpened(true)}} onExited={() => { setIsMapOpened(false) }}>
                {isMapOpened? <TransitStopMap lat={stop.lat} lon={stop.lon} title={stop.title}/>: <div style={{height:'300px'}}/>}
            </CSSTransition>
        </Collapsible>
        </div>
        <ActionBar>
            <ToggleButton onClick={ToggleMap} enabled={isMapOpen}><img src='/map.svg' alt='open map button'></img></ToggleButton>
            <ToggleButton onClick={ToggleFavourite} enabled={isFavourite}><img src='/heart.svg' alt='favourite button'/></ToggleButton>
        </ActionBar>
        </Container>
}

export default TransitStopListItem;
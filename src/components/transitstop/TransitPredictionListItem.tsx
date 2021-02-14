import React, { useEffect, useState } from "react";
import { Prediction } from "../../types/Transit.type";
import { Container } from "./TransitPredictionListItem.styles";

interface Props {
  prediction: Prediction;
}

const TransitPredictionListItem: React.FC<Props> = ({ prediction }) => {
  const [time, setTime] = useState<number>(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  const duration = prediction.epochTime - time - 60000;
  const minutes = Math.max(duration / 1000 / 60, 0);
  const seconds = Math.max((duration / 1000) % 60, 0);
  const timerText = `${Math.floor(minutes)}:${(
    "0" + Math.floor(seconds).toString()
  ).substr(-2)}`;

  const arrivalTime = new Date(0);
  arrivalTime.setUTCSeconds(Math.floor(prediction.epochTime / 1000));

  return (
    <Container>
      <span>{timerText}</span>
      <span>{arrivalTime.toLocaleTimeString()}</span>
    </Container>
  );
};

export default TransitPredictionListItem;

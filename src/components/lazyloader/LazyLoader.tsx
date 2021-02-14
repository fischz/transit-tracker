import React, { useEffect } from "react";

interface Props {
  onScrollToBottom: () => void;
  children: React.ReactNode;
}

const LazyLoader: React.FC<Props> = ({ onScrollToBottom, children }) => {
  useEffect(() => {
    const onScroll = (e: Event) => {
      //const t = e.target as Element
      const atBottom =
        window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
      if (atBottom) {
        onScrollToBottom();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScrollToBottom]);

  return <div>{children}</div>;
};

export default LazyLoader;

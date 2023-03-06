import { useState, useEffect } from "react";
import { waitFunction } from "./waitFunction";

export const useTypedMessage = (message) => {
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    setTypedMessage("");

    if (message) {
      (async () => {
        let visibleMessage = "";
        for (let i = 0; i < message.length; i++) {
          await waitFunction(25);
          visibleMessage = visibleMessage + message[i];
          setTypedMessage(visibleMessage);
        }
      })();
    }
  }, [message]);
  return typedMessage;
};

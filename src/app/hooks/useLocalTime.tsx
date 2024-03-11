import { useState, useEffect } from "react";

// TODO: TYPE PROPERLY
function useLocalTime(timezone: string) {
  const [time, setTime] = useState("");

  // Increment by 1 second
  const TIME_INCREMENT = 1000;

  useEffect(() => {
    let seconds = new Date().getTime();

    const timer = setInterval(() => {
      seconds += TIME_INCREMENT;
      const localTime = new Date(seconds).toLocaleTimeString("en-US", {
        timeZone: timezone,
      });
      setTime(localTime);
    }, TIME_INCREMENT);

    return () => {
      clearInterval(timer);
    };
  }, [timezone]);

  return time;
}

export default useLocalTime;

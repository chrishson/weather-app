import { getTime, getWeekday } from "@/lib/utils";
import { useState, useEffect } from "react";

function useLocalTime(timezone: string) {
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");

  // Increment by 1 second
  const TIME_INCREMENT = 1000;

  useEffect(() => {
    let seconds = new Date().getTime();

    const timer = setInterval(() => {
      seconds += TIME_INCREMENT;

      const localTime = getTime(seconds, timezone);
      const localDay = getWeekday(seconds, timezone);

      setTime(localTime);
      setDay(localDay);
    }, TIME_INCREMENT);

    return () => {
      clearInterval(timer);
    };
  }, [timezone]);

  return { time, day };
}

export default useLocalTime;

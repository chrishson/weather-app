import { getTime, getWeekday } from "@/lib/utils";
import { useState, useEffect } from "react";

function useLocalTime(timezone: string) {
  const [dynamicTime, setDynamicTime] = useState("");
  const [dynamicDay, setDynamicDay] = useState("");

  // Increment by 1 second
  const TIME_INCREMENT = 1000;

  useEffect(() => {
    let seconds = new Date().getTime();

    const timer = setInterval(() => {
      seconds += TIME_INCREMENT;

      const localTime = getTime(seconds, timezone);
      const localDay = getWeekday(seconds, timezone);

      setDynamicTime(localTime);
      setDynamicDay(localDay);
    }, TIME_INCREMENT);

    return () => {
      clearInterval(timer);
    };
  }, [timezone]);

  return { dynamicTime, dynamicDay };
}

export default useLocalTime;

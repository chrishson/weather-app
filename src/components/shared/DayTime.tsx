import useLocalTime from "@/app/hooks/useLocalDayTime";
import { getTime, getWeekday } from "@/lib/utils";

type DayTimeProps = {
  timezone: string;
};

// Extracted into own component so that it doesn't cause parent component to rerender on every tick.
export default function DayTime({ timezone }: DayTimeProps) {
  const { dynamicTime, dynamicDay } = useLocalTime(timezone);
  const isTimeCalculated = Boolean(dynamicTime) && dynamicTime !== "";

  const seconds = new Date().getTime();
  const localTime = getTime(seconds, timezone);
  const localDay = getWeekday(seconds, timezone);

  return (
    <>
      {isTimeCalculated
        ? `${dynamicDay}, ${dynamicTime}`
        : `${localDay}, ${localTime}`}
    </>
  );
}

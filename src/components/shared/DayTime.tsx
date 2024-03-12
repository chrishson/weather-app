import useLocalTime from "@/app/hooks/useLocalDayTime";

type DayTimeProps = {
  timezone: string;
};

// Extracted into own component so that it doesn't cause parent component to rerender on every tick.
export default function DayTime({ timezone }: DayTimeProps) {
  const { time, day } = useLocalTime(timezone);
  return (
    <>
      {day}, {time}
    </>
  );
}

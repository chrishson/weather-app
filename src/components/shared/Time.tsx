import useLocalTime from "@/app/hooks/useLocalTime";

type TimeProps = {
  timezone: string;
};

// Extracted into own component so that it doesn't cause parent component to rerender.
export default function Time({ timezone }: TimeProps) {
  const time = useLocalTime(timezone);
  return <>{time}</>;
}

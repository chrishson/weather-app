import { weatherIconMap } from "@/lib/weatherIconMap";
import Image from "next/image";

interface IconComponentProps {
  weatherCode?: number;
  className?: string;
}

// Modified from https://github.com/DariusLukasukas/nextjs-weather-app/blob/main/components/ui/icon-component.tsx
// Used with icons from https://erikflowers.github.io/weather-icons/
export default function IconComponent({
  weatherCode,
  className,
}: IconComponentProps) {
  // Need a weather code to render the proper Icon
  if (!weatherCode) return null;
  const iconName = weatherIconMap[weatherCode];

  return (
    <div className={`relative invert-0 dark:invert ${className}`}>
      <Image
        fill
        alt={weatherCode.toString()}
        src={`/icons/wi-${iconName}.svg`}
        className="select-none"
      />
    </div>
  );
}

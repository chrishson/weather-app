import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { Button } from "../ui/button";
import { useTemperatureUnitStore } from "@/stores/temperatureUnitStore";

export default function TemperatureUnitToggleButton() {
  const { temperatureUnit, setTemperatureUnit } = useTemperatureUnitStore();
  const toggleTemperatureUnit = () => {
    temperatureUnit === "metric"
      ? setTemperatureUnit("imperial")
      : setTemperatureUnit("metric");
  };
  return (
    <Button variant="outline" size="icon" onClick={toggleTemperatureUnit}>
      {temperatureUnit === "metric" ? (
        <TbTemperatureCelsius size={20} />
      ) : (
        <TbTemperatureFahrenheit size={20} />
      )}
    </Button>
  );
}

import { useEffect, useState } from "react";

const Main = () => {
  const [water, setWater] = useState<{
    temperature: number;
    setPoint: number;
    operation?: NodeJS.Timeout;
  }>({ temperature: 23, setPoint: 50 });
  const [heater, setHeater] = useState({ state: false });
  useEffect(() => {
    clearInterval(water.operation);
    if (heater.state) {
      setWater((prev) => ({
        ...prev,
        operation: setInterval(() => {
          setWater((prev) => ({
            ...prev,
            temperature:
              prev.temperature < prev.setPoint
                ? prev.temperature + 1
                : prev.temperature,
          }));
        }, 1000),
      }));
    } else {
      setWater((prev) => ({
        ...prev,
        operation: setInterval(() => {
          setWater((prev) => ({
            ...prev,
            temperature:
              prev.temperature > 23 ? prev.temperature - 1 : prev.temperature,
          }));
        }, 2000),
      }));
    }
  }, [heater.state]);
  useEffect(() => {
    if (water.temperature > 79) window.electronAPI.playSound(true);
    else window.electronAPI.playSound(false);
  }, [water.temperature]);
  return (
    <main>
      <div>water temperature is: {water.temperature}</div>
      <input
        type="number"
        value={water.temperature}
        onChange={(e) =>
          setWater((prev) => ({
            ...prev,
            temperature: Number(e.target.value),
          }))
        }
      />
      <button
        onClick={() => setHeater((prev) => ({ ...prev, state: !prev.state }))}
      >
        ON/OFF
      </button>
      <div>setpoint is: {water.setPoint}</div>
      <input
        type="number"
        value={water.setPoint}
        onChange={(e) =>
          setWater((prev) => ({ ...prev, setPoint: Number(e.target.value) }))
        }
      />
      <div
        className={`w-12 h-12 ${
          water.temperature < 80
            ? "bg-green-700 border-green-950"
            : "bg-red-700 border-red-950"
        }`}
      ></div>
    </main>
  );
};

export default Main;

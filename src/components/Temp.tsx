import React, { useEffect, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";

const Temp = () => {
  const [inRange, setInRange] = useState(false);
  const [draggable, setDraggble] = useState(true);
  const [water, setWater] = useState<{
    temperature: number;
    setPoint: 70;
    operation?: NodeJS.Timeout;
  }>({ temperature: 23, setPoint: 70 });
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
              prev.temperature < 100 ? prev.temperature + 1 : prev.temperature,
          }));
        }, 200),
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
        }, 500),
      }));
    }
  }, [heater.state]);
  useEffect(() => {
    if (water.temperature > water.setPoint) window.electronAPI.playSound(true);
    else window.electronAPI.playSound(false);
  }, [water.temperature]);
  useEffect(() => {
    if (inRange && heater.state === false) {
      setHeater((prev) => ({ ...prev, state: true }));
    } else if (heater.state === true && !inRange)
      setHeater((prev) => ({ ...prev, state: false }));
  }, [draggable]);

  const eventLogger = (e: MouseEvent, data: DraggableData) => {
    if (!draggable) return;
    setDraggble(false);
    setTimeout(() => {
      setDraggble(true);
    }, 100);
    setInRange(data.x > 770 && data.y < -213 && data.x < 1020 && data.y > -276);
    console.log(data.x);
    console.log(data.y);
  };
  return (
    <>
      <div className="bg-[url('../../assets/pics/image.png')] ml-[650px] bg-contain bg-no-repeat h-[300px] -mb-20 w-[500px]"></div>

      <div className="flex flex-row w-min gap-5 ml-80 border z-10 border-black bg-slate-500 p-2">
        <form className="border border-black h-28 w-52 flex justify-center items-center top-[250px] left-[70px] flex-col">
          <label htmlFor="temperature" className="pb-2 pt-4">
            Temperature control (°C)
          </label>
          <input
            className="h-8 w-40 bg-slate-300 rounded-lg items-center text-center"
            type="number"
            value={water.temperature}
            onChange={(e) =>
              setWater((prev) => ({
                ...prev,
                temperature: Number(e.target.value),
              }))
            }
          />
        </form>
        <div
          className={`rounded-full h-28 w-28 top-[20%] left-[30%] pt-6 text-6xl font-extrabold text-center font-mono ${
            water.temperature > water.setPoint
              ? "animate-custom bg-red-400"
              : "bg-green-400"
          }`}
        ></div>
        <div
          className={`h-28 w-28 top-[20%] left-[30%] pt-6 text-6xl font-extrabold text-center font-mono border border-black underline`}
        >
          {water.temperature}
        </div>
      </div>

      <Draggable onDrag={eventLogger}>
        <img className="h-48 w-48" src="../../assets/pics/lighter.png" alt="" />
      </Draggable>
      {water.temperature > water.setPoint && (
        <img
          className="h-40 w-40 absolute bottom-[25%] left-[45%] animate-custom rotate-"
          src="../../assets/pics/alarm.png"
          alt=""
        />
      )}
    </>
  );
};

export default Temp;

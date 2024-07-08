import React, { useEffect, useState } from "react";

const Temp = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
  return (
    <>
      <div className=" h-screen w-screen items-center bg-black relative">
        <div className="flex flex-col  justify-center  items-center">
          <h1
            onClick={() => setPage("heater")}
            className="hover:cursor-pointer w-fit h-fit pt-8 text-white text-6xl font-extrabold text-center mb-9 font-mono"
          >
            {`<--`} Water heater
          </h1>
        </div>
        <div className="flex justify-center flex-col items-center">
          {water.temperature > water.setPoint ? (
            <div>
              <img
                className="h-20 ml-2 animate-custom -mb-8"
                src="../../assets/pics/f.png"
                alt=""
              />
              <img
                className="h-72"
                src="../../assets/pics/fire_detector.png"
                alt=""
              />
            </div>
          ) : (
            <div>
              <img
                className="h-20 animate-custom -mb-8"
                src="../../assets/pics/.png"
                alt=""
              />
              <img
                className="h-72"
                src="../../assets/pics/fire_detector2.png"
                alt=""
              />
            </div>
          )}
        </div>
        {water.temperature > water.setPoint && (
          <img
            className="h-40 w-40 absolute top-[20%] left-[80%] animate-custom rotate-"
            src="../../assets/pics/alarm.png"
            alt=""
          />
        )}
        <div
          className={` rounded-full  h-28 w-28 absolute top-[20%] left-[30%] pt-6   text-white text-6xl font-extrabold text-center font-mono ${
            water.temperature > water.setPoint
              ? "animate-custom bg-red-400"
              : "bg-green-400"
          }`}
        >
          {water.temperature}
        </div>
        <form className="  border-4 rounded-3xl pb-16 w-52 flex justify-center items-center absolute top-[250px] left-[70px] flex-col ">
          <label htmlFor="temperature" className="text-white pb-2 pt-4">
            Temperature (°C)
          </label>
          <input
            className="h-8 w-40 items-center text-center"
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
        <button
          className="hover:cursor-pointer border-2 bg-red-500 rounded-3xl w-44 hover:bg-red-800 h-fit absolute top-[60%] left-[5%]  text-white  font-extrabold text-center mb-9 font-mono"
          onClick={() => setHeater((prev) => ({ ...prev, state: !prev.state }))}
        >
          Fire
        </button>
        {heater.state && (
          <div className="flex justify-center align-bottom  absolute left-[730px] top-[800px]">
            <div className="flex flex-row justify-center">
              <div className="container">
                <div className="red flame"></div>
                <div className="orange flame"></div>
                <div className="yellow flame"></div>
                <div className="white flame"></div>
              </div>
              <div className="container2 -ml-2 mt-3">
                <div className="red flame"></div>
                <div className="orange flame"></div>
                <div className="yellow flame"></div>
                <div className="white flame"></div>
              </div>
              <div className="container2 -ml-2 mt-4">
                <div className="red flame"></div>
                <div className="orange flame"></div>
                <div className="yellow flame"></div>
                <div className="white flame"></div>
              </div>
              <div className="container2 -ml-2 mt-1">
                <div className="red flame"></div>
                <div className="orange flame"></div>
                <div className="yellow flame"></div>
                <div className="white flame"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Temp;

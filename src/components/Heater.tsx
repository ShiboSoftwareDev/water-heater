import { useEffect, useState } from "react";

const Heater = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
    if (water.temperature > water.setPoint) window.electronAPI.playSound(true);
    else window.electronAPI.playSound(false);
  }, [water.temperature]);

  return (
    <section className="bg-black h-screen w-screen flex flex-col justify-center relative">
      <h1
        onClick={() => setPage("temp")}
        className=" hover:cursor-pointer w-fit h-fit ml-[790px]  text-white text-6xl font-extrabold text-center mb-9 font-mono"
      >
        {` `} flame {`-->`}
      </h1>

      <div className="  flex justify-center">
        <div className=" bg-[url('../../assets/pics/water_heater2.png')] bg-cover relative   h-[850px] w-[490px]">
          <p
            className={` lcd text-3xl font-bold  top-[61%] left-[233px] absolute ${
              water.temperature < water.setPoint
                ? "text-green-500"
                : water.temperature <= water.setPoint
                ? "text-red-500"
                : "text-red-900 brightness-200 animate-custom"
            } `}
          >
            {water.temperature}
          </p>
          <div
            className={` absolute top-[25%] left-[193px] ${
              water.temperature <= water.setPoint
                ? "hidden "
                : "text-red-900 brightness-200 font-black text-4xl  animate-custom"
            }`}
          >
            Alarm
          </div>
          <div
            className={`w-6 h-6 brightness-200	 ${
              heater.state ? "bg-green-800 " : "bg-red-800  "
            } rounded-full absolute top-[70%] left-[237px] `}
          ></div>
          <form className="  border pb-16 w-52 flex justify-center items-center absolute top-[250px] left-[700px] flex-col ">
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
            <label htmlFor="setPoint" className="text-white pt-4">
              Set point (°C)
            </label>
            <input
              className="text-center w-40 h-8 pb "
              type="number"
              value={water.setPoint}
              onChange={(e) =>
                setWater((prev) => ({
                  ...prev,
                  setPoint: Number(e.target.value),
                }))
              }
            />
          </form>
          <button
            onClick={() =>
              setHeater((prev) => ({ ...prev, state: !prev.state }))
            }
            className={`h-8 w-32  text-white rounded-lg absolute top-[430px] left-[741px] ${
              heater.state
                ? "bg-red-800 hover:bg-red-500 border-2 border-red-900"
                : "  bg-green-800 hover:bg-green-500 border-2 border-green-900"
            }`}
          >
            {heater.state ? "Turn off" : "Turn on"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Heater;

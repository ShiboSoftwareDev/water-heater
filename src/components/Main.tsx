import React from "react";
import Heater from "./Heater";
import Temp from "./Temp";

const Main = () => {
  const [page, setPage] = React.useState("temp");
  console.log(page);
  return (
    <>
      {page === "heater" && <Heater setPage={setPage} />}
      {page === "temp" && <Temp setPage={setPage} />}
    </>
  );
};

export default Main;

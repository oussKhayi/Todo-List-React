import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  // const [isFirstTime, setIsFirstTime] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("firstVisit")) {
      Swal.fire(
        "Feature !",
        "All it takes is a click to modify a task's status!",
        "info"
      );
      localStorage.setItem("firstVisit", `${false}`);
    }
  }, []);
  return (
    <section className="vh-100 gradient-custom section">
      <Todo />
    </section>
  );
}

export default App;

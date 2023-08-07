import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import Child from "./Child";

const Todo = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [filtering, setFiltering] = useState(null);

  useEffect(() => {
    console.log("effect");
    if (localStorage.getItem("todoList")) {
      setData(JSON.parse(localStorage.getItem("todoList")).todo);
    } else {
      localStorage.setItem(
        "todoList",
        JSON.stringify({
          todo: [...data],
        })
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      const currDate = new Date();
      const newTodo = {
        id: v4(),
        title: input,
        status: "pending",
        dates: {
          createdAt: "10101010",
          startedAt: null,
          doneAt: null,
        },
      };
      setData((prev) => {
        localStorage.setItem(
          "todoList",
          JSON.stringify({
            todo: [newTodo, ...prev],
          })
        );
        return [newTodo, ...prev];
      });

      setInput("");
    } else {
      Swal.fire("", "The task could not be empty!", "warning");
    }
  };

  const handleClick = (ele) => {
    Swal.fire(`${ele.title}`, `Status : ${ele.status}`);
  };

  const deleteTodo = (id) => {
    let temporaryData = data.filter((i) => i.id !== id);
    setData(temporaryData);
    localStorage.setItem(
      "todoList",
      JSON.stringify({
        todo: temporaryData,
      })
    );
    Swal.fire({
      icon: "success",
      title: "Your Task has been deleted!",
      showConfirmButton: false,
      timer: 1100,
    });
  };

  const handleChange = (id) => {
    const tempo = [...data];
    tempo.map((task) => {
      if (task.id === id) {
        if (task.status === "pending") {
          task.status = "onGoing";

          Swal.fire({
            icon: "success",
            title: `Your To-Do has been passed to Ongoing group`,
            showConfirmButton: false,
            timer: 1100,
          });
        } else if (task.status === "onGoing") {
          task.status = "done";
          Swal.fire({
            icon: "success",
            title: `Your To-Do has been passed to done group`,
            showConfirmButton: false,
            timer: 1100,
          });
        }
        setData([...tempo]);
        localStorage.setItem(
          "todoList",
          JSON.stringify({
            todo: [...tempo],
          })
        );
      }
    });
  };

  const editTodo = async (id) => {
    const targetTodo = data.find((i) => i.id === id);
    const { value: todo } = await Swal.fire({
      input: "text",
      inputLabel: "Update your to-do list:",
      inputValue: `${targetTodo.title}`,
      inputPlaceholder: `${targetTodo.title}`,
    });

    if (todo) {
      const temporaryData = data.map((t) => {
        if (t.id === id) {
          t.title = todo;
        }
        return t;
      });
      setData(temporaryData);

      Swal.fire({
        icon: "success",
        title: "Your To-Do updated successfully!",
        showConfirmButton: false,
        timer: 1100,
      });
    }
  };

  const deleteAll = () => {
    Swal.fire({
      title: "Are you sure!",
      text: "Do you want to delete the whole tasks?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData([]);
        localStorage.removeItem("todoList");
        Swal.fire("Deleted!", "Your To-Do List has been emptied.", "success");
      }
    });
  };

  return (
    <div className="container py-5 pt-0 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-8 d-flex justify-content-center">
          <div className="card">
            <div className="card-body px-4">
              <h3>Get things done !</h3>
              <form className="d-flex justify-content-center align-items-center mb-4">
                <div className="form-outline flex-fill">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                <button className="btn btn-info ms-2" onClick={handleSubmit}>
                  Add Task
                </button>
              </form>
              {/* Tabs navs */}
              <ul
                className="nav nav-tabs mb-4 pb-2 d-flex col-12"
                id="ex1"
                role="tablist"
              >
                <li className="nav-item shadow-sm me-2">
                  <button
                    className="btn border m-0 nav-link rounded text-info px-3"
                    onClick={() => setFiltering("")}
                  >
                    All<i className="ms-1 fa-solid fa-list-check"></i>
                  </button>
                </li>
                <li className="nav-item shadow-sm me-2">
                  <button
                    className="btn border m-0 nav-link rounded text-secondary px-2"
                    onClick={() => setFiltering("pending")}
                  >
                    Pending<i className="ms-1 fa-solid fa-hourglass-start"></i>
                  </button>
                </li>
                <li className="nav-item shadow-sm me-2">
                  <button
                    className="btn border m-0 nav-link rounded text-warning px-2"
                    onClick={() => setFiltering("onGoing")}
                  >
                    Ongoing
                    <i className="ms-1 fa-solid fa-person-running"></i>
                  </button>
                </li>
                <li className="nav-item shadow-sm me-2">
                  <button
                    className="btn border m-0 nav-link rounded text-success px-3"
                    onClick={() => setFiltering("done")}
                  >
                    Done<i className="ms-1 fa-solid fa-check-double"></i>
                  </button>
                </li>
              </ul>
              {/* Tabs navs */}
              {/* Tabs content */}
              <div className="tab-content" id="ex1-content">
                <div className="tab-pane fade show active">
                  <ul className="list-group list-group-light">
                    {filtering
                      ? data
                          .filter((e) => e.status === filtering)
                          .map((ele, i) => (
                            <Child
                              key={i}
                              props={ele}
                              deleteTodo={deleteTodo}
                              editTodo={editTodo}
                              handleClick={handleClick}
                              handleChange={handleChange}
                            />
                          ))
                      : data.map((ele, i) => (
                          <Child
                            key={i}
                            props={ele}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                            handleChange={handleChange}
                            handleClick={handleClick}
                          />
                        ))}
                  </ul>
                </div>
              </div>
              <div className="text-center mt-2">
                {/* Tabs content */}
                {data.length > 1 && (
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteAll()}
                  >
                    Delete All Tasks
                  </button>
                )}
              </div>
            </div>

            <div className="text-center text-secondary">
              Copyright ©{" "}
              <a
                className="text-dark fw-bold"
                target="_blank"
                href="https://ousskhayi.github.io/Portfolio"
              >
                {" "}
                OussKHAYI
              </a>{" "}
              2023
            </div>
            <div className="text-secondary d-flex justify-content-center pb-2 mt-1">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/oussKhayi"
                className="contact-link nav-link nav-item"
              >
                <i className="fa-brands fa-linkedin me-3 fs-4"></i>
              </a>
              <a
                target="_blank"
                href="https://github.com/oussKhayi"
                className="contact-link nav-link nav-item "
              >
                <i className="fa-brands fa-github me-3 fs-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;

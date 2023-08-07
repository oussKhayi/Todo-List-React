import React, { useState } from "react";

const Child = (props) => {
  const item = props.props;

  return (
    <>
      {
        <li
          className={`list-group-item px-3 border-0 rounded-3 mb-2 d-flex justify-content-between list-group-item-${
            item.status === "done"
              ? "success"
              : item.status === "onGoing"
              ? "warning"
              : "secondary"
          }`}
        >
          <div
            className="title-item border-end border-secondary me-2 pe-3"
            onClick={() => props.handleChange(item.id)}
          >
            {item.title}
          </div>
          <div>
            <button
              className="btn btn-sm p-0 eye-icon"
              onClick={() => props.handleClick(item)}
            >
              <i className="fa-solid fa-eye" />
            </button>
            <button
              className="btn btn-sm p-0 mx-2 text-primary"
              onClick={() => props.editTodo(item.id)}
            >
              <i className="fa-solid fa-pen-to-square" />
            </button>
            <button
              className="btn btn-sm p-0 text-danger"
              onClick={() => props.deleteTodo(item.id)}
            >
              <i className="fa-regular fa-trash-can" />
            </button>
          </div>
        </li>
      }
    </>
  );
};

export default Child;

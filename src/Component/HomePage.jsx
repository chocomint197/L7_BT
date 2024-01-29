import React, { useState } from "react";
import ProductItem from "./ProductItem";

export default function TodoList() {
  const [newTask, setNewTask] = useState("");
  const [dataList, setDataList] = useState([
    {
      id: 0,
      name: "Git Bash",
      status: "uncomplete",
      checked: false,
    },
    {
      id: 1,
      name: "Node.js",
      status: "uncomplete",
      checked: false,
    },
    {
      id: 2,
      name: "Javascript",
      status: "uncomplete",
      checked: false,
    },
    {
      id: 3,
      name: "API",
      status: "uncomplete",
      checked: false,
    },
  ]);
  const [activeTab, setActiveTab] = useState("All");

  const inputValue = (e) => {
    setNewTask(e.target.value);
  };
  const addTask = () => {
    const lowerCaseNewTask = newTask.toLowerCase();
    if (newTask.trim() === "") {
      alert("Task không được để trống");
    } else if (
      dataList.some((task) => task.name.toLowerCase() === lowerCaseNewTask)
    ) {
      alert("Đã tồn tại ở trong list");
    } else {
      const newTaskItem = {
        id: dataList.length,
        name: newTask,
        status: "uncomplete",
      };
      setDataList([...dataList, newTaskItem]);
      setNewTask("");
    }
  };
  const deleteTask = (taskId) => {
    const updatedDataList = dataList.filter((task) => task.id !== taskId);
    setDataList(updatedDataList);
  };

  const toggleStatus = (taskId, newStatus) => {
    const updatedDataList = dataList.map((task) =>
      task.id === taskId
        ? { ...task, status: newStatus, checked: !task.checked }
        : task
    );

    setDataList(updatedDataList);
  };

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const filterTasks = () => {
    if (activeTab === "All") {
      return dataList;
    } else if (activeTab === "Completed") {
      return dataList.filter((task) => task.status === "complete");
    } else {
      return dataList.filter((task) => task.status === "uncomplete");
    }
  };

  return (
    <div className="container">
      <h1>TO DO LIST</h1>
      <div className="inputbox">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={inputValue}
        />
      </div>
      <div className="navbar-container">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link${activeTab === "All" ? " active" : ""}`}
              href="#"
              onClick={() => handleTab("All")}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link${activeTab === "Active" ? " active" : ""}`}
              href="#"
              onClick={() => handleTab("Active")}
            >
              Active
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link${
                activeTab === "Completed" ? " active" : ""
              }`}
              href="#"
              onClick={() => handleTab("Completed")}
            >
              Completed
            </a>
          </li>
          <li className="nav-item add-btn">
            <a className="nav-link add" href="#" onClick={addTask}>
              Add
            </a>
          </li>
        </ul>
        <div className="list-container">
          {filterTasks().map((item) => (
            <ProductItem
              key={item.id}
              item={item}
              onDelete={() => deleteTask(item.id)}
              onToggleStatus={toggleStatus}
              checked={item.checked}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

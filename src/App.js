import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

export default function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");


  const handleAddToDo=()=>{
    let newToDoItem = {
      title: newTitle,
      description: newDescription
    }
    let updatedToDoArray = [...allTodos]
    updatedToDoArray.push(newToDoItem);
    setAllTodos(updatedToDoArray)
    localStorage.setItem("todolist", JSON.stringify(updatedToDoArray));
    setNewDescription("");
    setNewTitle("");
  }
  useEffect(()=>{
    let savedToDo = JSON.parse(localStorage.getItem("todolist"));
    if(savedToDo){
      setAllTodos(savedToDo);
    }

  },[]);

  return (
    <div className="App">
      <h1>My ToDo List</h1>
      <div className="todo-container">
        <div className="todo-inputs">
          <div className="todo-input-item">
            <label> To Do Title: </label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              type="text"
              placeholder="What is your task?"
            />
          </div>
          <div className="todo-input-item">
            <label> To Do Description: </label>
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              type="text"
              placeholder="What is your description?"
            />
          </div>
          <div className="todo-input-item">
            <div></div>
            <button onClick={handleAddToDo} type="button" className="primaryBtn">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            ToDo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
{allTodos.map((item, index)=>{
  return(
       <div className="todo-list-item " key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete className="icon" />
              <FaCheck className="check-icon" />
              <FiEdit3 className="edit-icon" />
            </div> 
             </div>
    )         
})}

        
     
        
        </div>
      </div>
    </div>
  );
}

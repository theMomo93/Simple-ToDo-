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
  const [completed, setCompleted]= useState([]);

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

  const handleDeleteToDo = (index) => {
    let reducedToDo = [...allTodos];
    reducedToDo.splice(index, 1); 
  
    localStorage.setItem("todolist", JSON.stringify(reducedToDo));
    setAllTodos(reducedToDo);
  };
  
  const handleDeleteCompletedToDo = (index) => {
    let reducedCompleted = [...completed];
    reducedCompleted.splice(index, 1); 
  
    localStorage.setItem("completed", JSON.stringify(reducedCompleted));
    setCompleted(reducedCompleted);
  };

const handleEditToDo=(index)=>{
const editedToDo = allTodos[index];

const newTitle = prompt("Edit Title:", editedToDo.title);
const newDescription = prompt("Edit Description:", editedToDo.description);

if(newTitle !== null && newDescription !== null){
  const updatedToDo = {
    ...editedToDo,
    title: newTitle,
    description: newDescription,
  };
  const updatedAllTodos = [...allTodos];
  updatedAllTodos[index] = updatedToDo;
  setAllTodos(updatedAllTodos);
  localStorage.setItem("todolist", JSON.stringify(updatedAllTodos));
}
}

const handleComplete = (index) => {
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth() + 1;
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  let completedOn =
    dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
  let filteredItem = {
    ...allTodos[index],
    completedOn: completedOn,
  };

  let updatedCompletedArray = [...completed, filteredItem];
  setCompleted(updatedCompletedArray);

  let updatedAllTodos = [...allTodos];
  updatedAllTodos.splice(index, 1); // Remove item from allTodos at index
  setAllTodos(updatedAllTodos);

  localStorage.setItem("completed", JSON.stringify(updatedCompletedArray));
  localStorage.setItem("todolist", JSON.stringify(updatedAllTodos));
};
  useEffect(()=>{

    let savedToDo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompleted = JSON.parse(localStorage.getItem("completed"))
    if(savedToDo){
      setAllTodos(savedToDo);
    }
    if(savedCompleted){
      setCompleted(savedCompleted);
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
              placeholder="What do you have to do?"
            />
          </div>
          <div className="todo-input-item">
            
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
{isCompleteScreen ===false && allTodos.map((item, index)=>{
  return(
       <div className="todo-list-item " key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete onClick={()=>handleDeleteToDo(index)} className="icon" />
              <FaCheck onClick={()=>handleComplete(index)} className="check-icon" />
              <FiEdit3 onClick={()=>handleEditToDo(index)} className="edit-icon" />
            </div> 
             </div>
    )         
})}

{isCompleteScreen ===true  && completed.map((item, index)=>{
  return(
       <div className="todo-list-item " key={index}>
            <div>
              <h3 className="line-through">{item.title}</h3>
              <p className="line-through">{item.description}</p>
              <p><small>Completed on: {item.completedOn}</small></p>
            </div>
            <div>
              <AiOutlineDelete onClick={()=>handleDeleteCompletedToDo(index)}title="delete" className="icon" />
              </div> 
             </div>
    )         
})}
     
        
        </div>
      </div>
    </div>
  );
}

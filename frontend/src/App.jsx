import React, { useEffect, useState } from 'react'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import axios from 'axios'
import './App.css'

function App() {
  const [list, setList] = useState([])
  const API_URL = 'http://localhost:5000/api/todos'
  useEffect(()=> {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    try{
      const response = await axios.get(API_URL);
      setList(response.data);
    }
    catch(err){
      console.log(`Error while fetching Todo's: ${err}`)
    }
    }
  const addTodos = async (title) =>{
    try{
    const response = await axios.post(API_URL, {title});
    setList([...list,response.data ]);
    }
    catch(err) {
      console.log(`Error while adding todo: ${err}`)
    }
  }
  const toggleTodo = async (id) => {
    const todo = list.find((i) => i._id === id)
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
      completed : !todo.completed
      })
      setList(list.map((t)=> t._id === id ? response.data : t));
    }
    catch(err){
      console.log(`error during toggling todo: ${err}`)
    }
  }
  const deleteTodo = async (id) => {
    try{
      const todo = list.find((e)=> e._id === id);
      if (todo){
        const response = await axios.delete(`${API_URL}/${id}`);
        setList(list.filter(i => i._id !== id ));
      }
    }
    catch(err){
      console.log(`error while deleting todo: ${err}`)
    }
  }
  return (
    <div>
      <h1>MERN Todo App</h1>
      <TodoForm onAdd={addTodos}/>
      <h1>Todo's:</h1>
      <TodoList 
        todos={list}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <hr/>
    </div>
  )
}

export default App

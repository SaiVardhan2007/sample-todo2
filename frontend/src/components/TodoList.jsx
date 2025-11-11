import React from 'react'

export default function TodoList({todos, onDelete, onToggle}) {
  return (
    <>
      <ul>
        {todos.map((todo)=> (
          <li key = {todo._id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} >
            <span onClick={()=>{onToggle(todo._id)}}>{todo.title}</span>
            <button onClick={() =>{onDelete(todo._id)}}>delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

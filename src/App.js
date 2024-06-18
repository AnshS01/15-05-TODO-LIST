import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ToDoList from './ToDoList'
import Home from './Home';

const App = () => {
  return (
    <>
      <Home />
      <ToDoList />
    </>
  )
}

export default App
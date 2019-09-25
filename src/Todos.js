import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import { API, graphqlOperation } from "aws-amplify";

const ListTodos = `
  query {
    listTodos{
      items{
        id description name completed
      }
    }
  }

`;

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function getTodos() {
      const todoData = await API.graphql(graphqlOperation(ListTodos));
      setTodos(todoData.data.listTodos.items);
    }
    getTodos();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {todos.map((todo, i) => (
        <div>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });

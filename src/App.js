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
      {todos.map((todo, i) => (
        <div key={i}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });

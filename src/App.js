import React, { useState } from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import { API, graphqlOperation, Storage } from "aws-amplify";

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
  const [todos, setTodos] = useState([{ name: "no todos" }]);
  const [file, setFile] = useState([{ fileUrl: "", file: "", fileName: "" }]);

  const updateTodos = async () => {
    const todoData = await API.graphql(graphqlOperation(ListTodos));
    setTodos(todoData.data.listTodos.items);
  };

  const getFile = async () => {
    Storage.get("avatar.JPG")
      .then(data => {
        setFile({ fileUrl: data });
      })
      .catch(err => {
        console.log("error fetching image!");
      });
  };

  const handleChange = e => {
    const file = e.target.files[0];
    setFile({ fileUrl: URL.createObjectURL(file), file, fileName: file.name });
  };

  const saveFile = () => {
    Storage.put(file.fileName, file.file)
      .then(() => {
        console.log("succesfully saved file!");
        setFile([{ fileUrl: "", file: "", fileName: "" }]);
      })
      .catch(err => {
        console.log("error uploading file!");
      });
  };

  return (
    <div className="App">
      <button onClick={updateTodos}>Get todos</button>
      {todos.map((todo, i) => (
        <div key={i}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
        </div>
      ))}
      <input type="file" onChange={handleChange} />
      <img src={file.fileUrl} alt="no file uploaded" />
      <button onClick={saveFile}>Save file</button>
      <button onClick={getFile}>Get file</button>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });

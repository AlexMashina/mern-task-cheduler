import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

import "./MainPage.scss"

export default function MainPage() {
  const [text, setText] = useState("");
  const {userId} = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  const getTodo = useCallback(async () => {
    try {
      await axios.get("https://mern-task-scheduler.herokuapp.com/api/todo", {
        headers: {
          "Content-Type": "application/json"
        },
        params: { userId }
      })
      .then(response => setTodos(response.data))

    } catch (error) {
      console.log(error)
    }
  }, [userId])

  const createTodo = useCallback(async () => {
    if(!text) return null;

    try {
      await axios.post("https://mern-task-scheduler.herokuapp.com/api/todo/add", {text, userId}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setTodos([...todos], response.data);
        setText("");
        getTodo();
      })
    } catch (error) {
      console.log(error)
    }
  }, [text, userId, todos, getTodo]);

  const removeTodo = useCallback(async (id) => {
    try {
      await axios.delete(`https://mern-task-scheduler.herokuapp.com/api/todo/delete/${id}`, {id}, {
        headers: { "Content-Type": "application/json" }
      })
      .then(() => getTodo())
    } catch (error) {
      console.log(error)
    }
  }, [getTodo]);

  const completedTodo = useCallback(async (id) => {
    try {
      await axios.put(`https://mern-task-scheduler.herokuapp.com/api/todo/completed/${id}`, {id}, {
        headers: {"Content-Type": "application/json"}
      })
      .then(response => {
        setTodos([...todos], response.data);
        getTodo();
      })
    } catch (error) {
      console.log(error)
    }
  }, [getTodo, todos])

  const warningTodo = useCallback(async (id) => {
    try {
      await axios.put(`https://mern-task-scheduler.herokuapp.com/api/todo/warning/${id}`, { id }, {
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          setTodos([...todos], response.data);
          getTodo();
        })
    } catch (error) {
      console.log(error)
    }
  }, [getTodo, todos])
  

  useEffect(() => {
    getTodo()
  }, [getTodo])

  return (
    <div className="container">
      <div className="main-page">
        <h4>Добавить задачу</h4>
        <form className="form form-login" onSubmit={e => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input 
                  type="text"
                  id="text"
                  name="inpute"
                  className="validate"
                  onChange={e => setText(e.target.value)}
                  value={text} 
              />
              <label htmlFor="input">Задача:</label>
            </div>
          </div>
          <div className="row">
            <button 
                className="waves-effect waves-light btn blue"
                onClick={createTodo}
            >Добавить</button>
          </div>
        </form>

        <h3>Активные задачи</h3>
        <div className="todos">
          {
             todos.map((todo, index) => {
               let cls = ["row flex todos-item"];

               if(todo.completed) {
                 cls.push("completed")
               }

               if (todo.warning) {
                 cls.push("warning")
               }

              return (<div className={cls.join(" ")} key={index}>
                        <div className="col todos-num">{index + 1}</div>
                        <div className="col todos-text">{todo.text}</div>
                        <div className="col todos-buttons">
                          <i className="material-icons blue-text" 
                             onClick={() => completedTodo(todo._id)}
                          >check</i>
                          <i className="material-icons orange-text"
                             onClick={() => warningTodo(todo._id)}
                          >warning</i>
                          <i className="material-icons red-text" onClick={() => removeTodo(todo._id)}>delete</i>
                        </div>
                      </div>
                    )
                  })
          }
        </div>
      </div>
    </div>
  )
}

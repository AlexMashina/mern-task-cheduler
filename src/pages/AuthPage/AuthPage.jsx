import React, { useState, useContext } from 'react'
import {BrowserRouter, Route, Switch, Link, useHistory} from "react-router-dom";
import axios from "axios";

import "./AuthPage.scss"
import { AuthContext } from '../../context/AuthContext';

export default function AuthPage() {
  const history = useHistory();

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const { login } = useContext(AuthContext)

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
    console.log(form)
  }

  const registerHandler = async () => {
    try {
      await axios.post("https://mern-task-scheduler.herokuapp.com/api/auth/registration", {...form}, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      history.push("/");

    } catch (error) {
      console.log(error)
    }
  }

  const loginHandler = async () => {
    try {
      await axios.post("https://mern-task-scheduler.herokuapp.com/api/auth/login", { ...form }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          login(response.data.token, response.data.userId)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <React.Fragment>
          <div className="container">
            <div className="auth-page">
              <Route path="/login">
                <h3>Авторизация</h3>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="email"
                        name="email"
                        className="validate"
                        onChange={changeHandler} />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        type="password"
                        name="password"
                        className="validate"
                        onChange={changeHandler} />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <button 
                    className="waves-effect waves-light btn btn-blue"
                    onClick={loginHandler}
                    >Войти</button>
                    <Link to="/registration" className="btn-outline btn-reg">Зарегистрироваться ?</Link>
                  </div>
                </form>
              </Route>

              <Route path="/registration">
                <h3>Регистрация</h3>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="email"
                        name="email"
                        className="validate"
                        onChange={changeHandler} />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        type="password"
                        name="password"
                        className="validate"
                        onChange={changeHandler} />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <button onClick={registerHandler} className="waves-effect waves-light btn btn-blue">Регистрация</button>
                    <Link to="/login" className="btn-outline btn-reg">Уже есть акаунт ?</Link>
                  </div>
                </form>
              </Route>

            </div>
          </div>
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  )
}

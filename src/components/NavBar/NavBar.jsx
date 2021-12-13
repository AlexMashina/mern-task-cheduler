import React, { useContext } from 'react'

import "./NavBar.scss"
import { AuthContext } from '../../context/AuthContext'

export default function NavBar() {
  const { logout, isLogin } = useContext(AuthContext)

  return (
    <div>
      <nav>
        <div className="nav-wrapper navbar blue">
          <a href="/" className="brand-logo">Планировщик задач</a>
          {
            isLogin
              ? <ul id="nav-mobile" className="right hide0on-med-and-down">
                  <li><a href="/" onClick={logout}>Выйти</a></li>
                </ul>
              : <ul id="nav-mobile" className="right hide0on-med-and-down">
                  <li><a href="/">Войти</a></li>
                </ul>
          }
        </div>
      </nav>
    </div>
  )
}

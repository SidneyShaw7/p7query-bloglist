import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [authentication, dispatch] = useAuth()

  const loginUser = async (e) => {
    e.preventDefault()
    console.log('Login button clicked')
    const { username, password } = authentication
    // const credentials = { username, password }
    console.log('Authentication state:', authentication)

    try {
      const response = await loginService.login({ username, password })
      const { user, token } = response

      blogService.setToken(token)
      dispatch({
        type: 'LOGIN',
        username: e.target.username.value,
        password: e.target.password.value,
      })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // const handleUsernameChange = (e) => {
  //   dispatch({ type: 'UPDATE_USERNAME', username: e.target.value })
  // }

  // const handlePasswordChange = (e) => {
  //   dispatch({ type: 'UPDATE_PASSWORD', password: e.target.value })
  // }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginUser}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={authentication.username}
            name='username'
            onChange={(e) =>
              dispatch({ type: 'UPDATE_USERNAME', username: e.target.value })
            }
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={authentication.password}
            name='password'
            onChange={(e) =>
              dispatch({ type: 'UPDATE_PASSWORD', password: e.target.value })
            }
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm

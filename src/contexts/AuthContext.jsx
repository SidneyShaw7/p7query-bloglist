/* eslint-disable indent */
import { useContext, useReducer, createContext } from 'react'
import loginService from '../services/login'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        // const { password, username } = state
        username: action.username,
        password: action.password,
        authenticated: true,
      }
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.password }
    case 'UPDATE_USERNAME':
      return { ...state, username: action.username }
    case 'LOGOUT':
      return { username: null, password: null, authenticated: false } // Reset authenticated flag
    default:
      return state
  }
}

const initialAuthState = {
  username: '',
  password: '',
  authenticated: false,
}

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [authentication, authenticationDispatch] = useReducer(
    authReducer,
    initialAuthState
  )

  return (
    <AuthContext.Provider value={[authentication, authenticationDispatch]}>
      {children}
    </AuthContext.Provider>
  )
}

// export const login = ({ username, password }) => {
//   const credentials = { username, password }
//   return async (dispatch) => {
//     try {
//       const user = await loginService.login(credentials)
//       dispatch({
//         type: 'LOGIN',
//         username,
//         password,
//         // authenticated: true,
//       })
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

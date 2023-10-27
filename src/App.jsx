import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // const [notification, setNotification] = useState(null)
  // const [style, setStyle] = useState(true)

  // USE EFFECTS

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    {
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [])

  const blogFormRef = useRef()

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  // const handleError = (error, setStyle, setNotification) => {
  //   console.error(error)
  //   setStyle(false)

  //   const message =
  //     error.response.request.status === 401
  //       ? 'Wrong credentials'
  //       : error.message

  //   setNotification(message)

  //   setTimeout(() => {
  //     setNotification(null)
  //   }, 3500)
  // }

  const handleLogin = async (user) => {
    try {
      const loggedUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    } catch (error) {
      // handleError(error, setStyle, setNotification)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  // const addBlog = async (blogObj) => {
  //   try {
  //     await blogService.create(blogObj)
  //     blogFormRef.current.toggleVisibility()
  //     const newBlogs = await blogService.getAll()
  //     setBlogs(newBlogs)
  //   } catch (error) {
  //     // handleError(error, setStyle, setNotification)
  //   }
  // }

  // const likeIt = async (id) => {
  //   const blog = blogs.find((b) => b.id === id)
  //   const likedBlog = { ...blog, likes: blog.likes + 1 }
  //   try {
  //     const returnedBlog = await blogService.update(id, likedBlog)
  //     setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
  //     console.log(blog), console.log(returnedBlog)
  //   } catch (error) {
  //     // handleError(error, setStyle, setNotification)
  //   }
  // }

  // const remove = async (id) => {
  //   const blog = blogs.find((b) => b.id === id)
  //   if (window.confirm(`Remove the blog "${blog.title}"`)) {
  //     try {
  //       await blogService.remove(id)
  //       setBlogs(blogs.filter((blog) => blog.id !== id))
  //     } catch (error) {
  //       // handleError(error, setStyle, setNotification)
  //     }
  //   }
  // }

  const loginForm = () => (
    <LoginForm handleLogin={handleLogin} user={user} setUser={setUser} />
  )

  const blogForm = () => {
    return (
      <>
        {' '}
        <p>
          {user.username} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          {/* <BlogForm createBlog={addBlog} /> */}
        </Togglable>
      </>
    )
  }

  return (
    <div>
      <Notification />
      <LoginForm handleLogin={handleLogin} user={user} setUser={setUser} />
      {/* {!user && loginForm()} */}
      <h2>blogs</h2>
      {/* {user && blogForm()} */}
      <NewBlog />
      <Blogs />
    </div>
  )
}

export default App

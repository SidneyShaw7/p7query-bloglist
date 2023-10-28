import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, update, remove } from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] }) || []
      queryClient.invalidateQueries(
        { queryKey: ['blogs'] },
        blogs.filter((b) => b.id !== id)
      )
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleLike = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = (id) => {
    deleteBlogMutation.mutate({ id })
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <button onClick={() => handleDelete(blog.id)}>delete</button>
    </div>
  )
  //   return (
  //     <div style={blogStyle}>
  //       <div>{blog.title}</div>
  //       <div>{blog.author}</div>
  //       <div>{blog.url}</div>
  //       <div>likes: {blog.likes}</div>
  //     </div>
  //   )
}

const Blogs = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    initialData: [],
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <Blog key={blog.id} blog={blog} />
          </div>
        )
      })}
    </div>
  )
}

export default Blogs

import { useMutation } from '@tanstack/react-query'
import { useNotification } from '../contexts/NotificationContext'
import { create } from '../services/blogs'
import { useQueryClient } from '@tanstack/react-query'

const NewBlog = () => {
  const [notification, dispatch] = useNotification()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: create,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['blogs'] })
    // },
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] }) || []
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.concat(newBlog))
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const addBlog = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value

    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''

    newBlogMutation.mutate({ title, author, url })
    dispatch({ type: 'SHOW', payload: 'Anecdote was added!' })
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id='title' type='text' name='Title' placeholder='title' />
        </div>
        <div>
          author:
          <input id='author' type='text' name='Author' placeholder='author' />
        </div>
        <div>
          url:
          <input id='url' type='text' name='Url' placeholder='url' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewBlog

import { useQuery } from '@tanstack/react-query'
import { getAll } from '../services/blogs'

export const getBlogs = () => {
  return useQuery('blogs', getAll)
}

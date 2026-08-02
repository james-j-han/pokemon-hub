import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { supabase } from '../supabaseClient'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase.from('posts').select().eq('id', id).single()
      if (data) {
        setTitle(data.title)
        setContent(data.content || '')
      }
      setLoading(false)
    }
    fetchPost()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id)

    if (error) {
      console.error(error)
      return
    }
    navigate(`/posts/${id}`)
  }

  if (loading) return <p>Loading...</p>

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Save Changes</button>
    </form>
  )
}

export default EditPost
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { supabase } from '../supabaseClient'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [flag, setFlag] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase.from('posts').select().eq('id', id).single()
      if (data) {
        setTitle(data.title)
        setContent(data.content || '')
        setFlag(data.flag || '')
      }
      setLoading(false)
    }
    fetchPost()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await supabase
      .from('posts')
      .update({ title, content, flag: flag || null })
      .eq('id', id)

    if (error) {
      console.error(error)
      return
    }
    navigate(`/posts/${id}`)
  }

  if (loading) return <p>Loading...</p>

  return (
    <form onSubmit={handleSubmit} className='post-form'>
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
      <select value={flag} onChange={(e) => setFlag(e.target.value)}>
        <option value="">No flag</option>
        <option value="Question">Question</option>
        <option value="Opinion">Opinion</option>
        <option value="Guide">Guide</option>
        <option value="News">News</option>
        <option value="Meme">Meme</option>
      </select>
      <button type="submit">Save Changes</button>
    </form>
  )
}

export default EditPost
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../supabaseClient'
import { getUserId } from '../getUserId'
import Spinner from '../components/Spinner'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [flag, setFlag] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setUploading(true)

    let imageUrl = null

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        console.error(uploadError)
        setUploading(false)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName)

      imageUrl = publicUrlData.publicUrl
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({ title, content, image_url: imageUrl, user_id: getUserId(), flag: flag || null })
      .select()

    setUploading(false)

    if (error) {
      console.error(error)
      return
    }

    navigate(`/posts/${data[0].id}`)
  }

  return (
    <form onSubmit={handleSubmit} className='post-form'>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <select value={flag} onChange={(e) => setFlag(e.target.value)}>
        <option value="">No flag</option>
        <option value="Question">Question</option>
        <option value="Opinion">Opinion</option>
        <option value="Guide">Guide</option>
        <option value="News">News</option>
        <option value="Meme">Meme</option>
      </select>
      <button type="submit" disabled={uploading}>
        {uploading ? <Spinner small /> : 'Create Post'}
      </button>
    </form>
  )
}

export default CreatePost
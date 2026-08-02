import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../supabaseClient'
import { getUserId } from '../getUserId'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)
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
      .insert({ title, content, image_url: imageUrl, user_id: getUserId() })
      .select()

    setUploading(false)

    if (error) {
      console.error(error)
      return
    }

    navigate(`/posts/${data[0].id}`)
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" disabled={uploading}>
        {uploading ? 'Posting...' : 'Create Post'}
      </button>
    </form>
  )
}

export default CreatePost
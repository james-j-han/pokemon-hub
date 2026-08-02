import { Link } from 'react-router'
import { ChevronUp } from 'lucide-react'
import { flagIcons } from '../flagIcons'

function PostCard({ post }) {
  const FlagIcon = post.flag ? flagIcons[post.flag] : null

  return (
    <Link to={`/posts/${post.id}`} className="post-card">
      <span className="post-flag-slot">
        {post.flag && (
          <span className="post-flag">
            <FlagIcon size={14} /> {post.flag}
          </span>
        )}
      </span>
      <h3>{post.title}</h3>
      <div className="post-card-meta">
        <span>{new Date(post.created_at).toLocaleString()}</span>
        <span className='upvote-count'><ChevronUp size={14} /> {post.upvotes}</span>
      </div>
    </Link>
  )
}

export default PostCard
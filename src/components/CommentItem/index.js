import './index.css'

const CommentItem = props => {
  const {commentData} = props
  const {postId, name, email, comment} = commentData
  return (
    <li className="comment-item-container">
      <p className="post-data">{postId}</p>
      <p className="name-data">{name}</p>
      <p className="email-data">{email}</p>
      <p className="comments-data">{comment}</p>
    </li>
  )
}

export default CommentItem

<script>
  export let currentUser
  export let comments
  export let replyingToID = null
  export let replyingToName = null
  export let replyOpen = null

  let commentText = ''

  const addNewComment = (text) => {
    const newComment = {
      content: text,
    }
    fetch('http://localhost:5555/api/v1/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => response.json())
      .then((json) => (comments = [...comments, json]))
  }

  const addReply = (text) => {
    let parentCommentIndex = comments.findIndex(
      (comment) => comment.id === replyingToID
    )

    const newReply = {
      content: text,
      replyName: replyingToName,
    }

    fetch(`http://localhost:5555/api/v1/comments/${replyingToID}`, {
      method: 'POST',
      body: JSON.stringify(newReply),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => response.json())
      .then((json) => {
        comments[parentCommentIndex].replies = [
          ...comments[parentCommentIndex].replies,
          json,
        ]
      })
    replyOpen = false
  }

  const handleClick = (text) => {
    if (replyingToID) {
      addReply(text)
      return
    }
    addNewComment(text)
  }
</script>

<div>
  <textarea bind:value={commentText} placeholder="Add a comment..." />
  <footer>
    <img src={currentUser.image} alt="" />
    <button
      on:click={() => {
        handleClick(commentText)
        commentText = ''
      }}
    >
      {replyingToID ? 'Reply' : 'Send'}
    </button>
  </footer>
</div>

<style>
  div {
    margin: 1rem;
    padding: 1rem;
    background-color: var(--white);
    border-radius: 0.5rem;
  }
  textarea {
    border: 1px solid var(--light);
    border-radius: 0.5rem;
    padding: 0.8rem 1.3rem;
    height: 5rem;
    width: calc(100% - 2.8rem);
    resize: none;
  }
  footer {
    display: flex;
    align-items: center;
    margin-top: 0.8rem;
  }
  img {
    height: 2rem;
    margin-right: auto;
  }
  button {
    text-transform: uppercase;
    padding: 0.7rem 1.4rem;
    background-color: var(--pri);
    border: unset;
    color: var(--white);
    font-weight: 500;
    border-radius: 0.3rem;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.4;
  }
</style>

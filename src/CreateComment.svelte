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

  const handleClick = (text) =>
    replyingToID ? addReply(text) : addNewComment(text)
</script>

<div>
  <textarea bind:value={commentText} placeholder="Add a comment..." />
  <img src={currentUser.image} alt="" />
  <button
    on:click={() => {
      handleClick(commentText)
      commentText = ''
    }}
  >
    {replyingToID ? 'Reply' : 'Send'}
  </button>
</div>

<style>
  div {
    display: grid;
    margin: 1rem;
    padding: 1rem;
    background-color: var(--white);
    border-radius: 0.5rem;
    gap: 1rem;
    grid-template-areas: 
      'text text'
      'img button'
    ;
    align-items: center;
  }
  textarea {
    border: 1px solid var(--light);
    border-radius: 0.5rem;
    padding: 0.8rem 1.3rem;
    height: 5rem;
    width: calc(100% - 2.8rem);
    resize: none;
    grid-area: text;
  }
  img {
    height: 2rem;
    margin-right: auto;
    grid-area: img;
  }
  button {
    text-transform: uppercase;
    height: 3rem;
    width: 6.5rem;
    padding: 0.7rem;
    background-color: var(--pri);
    border: unset;
    color: var(--white);
    font-weight: 500;
    border-radius: 0.5rem;
    cursor: pointer;
    grid-area: button;
    justify-self: end;
  }
  button:hover {
    opacity: 0.4;
  }
  @media screen and (min-width: 650px) {
    div {
      display: flex;
      flex-direction: row;
    }
  }
</style>

<script>
  import Time from 'svelte-time'
  import ConfirmDelete from './ConfirmDelete.svelte'
  import CreateComment from './CreateComment.svelte'
  import Score from './Score.svelte'

  export let id
  export let content
  export let createdAt
  export let votes
  export let user
  export let replyName = null
  export let isReply = null
  export let comments
  export let currentUser
  export let parentID = null

  let replyOpen = false
  let deleteOpen = false
  let editOpen = false
  let newContent = content

  const toggleReplyArea = () => {
    replyOpen = !replyOpen
  }

  const removeFromPage = () => {
    if (!isReply) {
      const commentIndex = comments.findIndex((comment) => comment.id === id)
      return (comments = [
        ...comments.slice(0, commentIndex),
        ...comments.slice(commentIndex + 1),
      ])
    }
    const parentIndex = comments.findIndex((comment) => comment.id === parentID)
    const commentIndex = comments[parentIndex].replies.findIndex(
      (comment) => comment.id === id
    )
    return (comments[parentIndex].replies = [
      ...comments[parentIndex].replies.slice(0, commentIndex),
      ...comments[parentIndex].replies.slice(commentIndex + 1),
    ])
  }

  const toggleDeleteDialog = () => {
    deleteOpen = !deleteOpen
  }

  const deleteComment = (id) => {
    fetch(`http://localhost:5555/api/v1/comments/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((json) => {
        return json.deleted && removeFromPage()
      })
  }

  const toggleEdit = () => {
    if (editOpen) {
      newContent = content
    }
    editOpen = !editOpen
  }

  const handleUpdate = (id) => {
    const payload = { content: newContent }
    fetch(`http://localhost:5555/api/v1/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => response.json())
      .then((json) => (content = json.content))
    editOpen = false
  }
</script>

<article data-comment-id={id} class={isReply && 'reply'}>
  <header>
    <img src={user.image} alt="" />
    <h2>{user.username}</h2>
    {#if currentUser.username === user.username}
      <p class="you">you</p>
    {/if}
    <p>
      <Time
        relative
        live={10000}
        timestamp={new Date(createdAt.replace(' ', 'T') + 'Z')}
      />
    </p>
  </header>

  {#if editOpen}
    <div class="content editing">
      <div class="outline">
        {#if replyName}
          <span class="handle">@{replyName}</span>
        {/if}
        <p
          bind:textContent={newContent}
          class="textarea"
          contenteditable="true"
        />
      </div>
      <button on:click={() => handleUpdate(id)} class="update">Update</button>
    </div>
  {:else}
    <p class="content">
      {#if replyName}
        <span class="handle">@{replyName}</span>
      {/if}
      {content}
    </p>
  {/if}

  <div class="score-container">
    <Score votes={JSON.parse(votes)} userID={currentUser.id} commentID={id} />
  </div>
  <div class="controls">
    {#if currentUser.username === user.username}
      <button on:click={toggleDeleteDialog} class="icon delete">
        <span>Delete</span>
      </button>
      <button on:click={toggleEdit} class="icon edit"><span>Edit</span></button>
    {:else}
      <button on:click={toggleReplyArea} class="icon reply"
        ><span>Reply</span></button
      >
    {/if}
  </div>
</article>
{#if replyOpen}
  <CreateComment
    {currentUser}
    bind:comments
    bind:replyOpen
    replyingToID={parentID || id}
    replyingToName={user.username}
  />
{/if}
{#if deleteOpen && user.username === currentUser.username}
  <ConfirmDelete
    deleteComment={() => deleteComment(id)}
    toggleDeleteDialog={() => toggleDeleteDialog()}
  />
{/if}

<style>
  article {
    display: grid;
    grid-template-areas:
      'header header header'
      'content content content'
      'score . controls';
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;
    line-height: 1.5;
    padding: 1rem;
    background-color: var(--white);
    margin: 1rem 1rem;
    border-radius: 0.5rem;
  }
  header {
    display: flex;
    align-items: center;
    gap: 1rem;
    grid-area: header;
  }
  header img {
    height: 32px;
  }
  .you {
    background-color: var(--pri);
    color: var(--white);
    font-weight: 500;
    font-size: 0.8rem;
    margin-left: -0.5rem;
    border-radius: 0.2rem;
    padding: 0rem 0.5rem 0.1rem;
  }
  .content {
    grid-area: content;
  }
  .score-container {
    grid-area: score;
  }
  .controls {
    display: flex;
    grid-area: controls;
    margin-left: auto;
  }
  h2,
  p {
    font-size: 1rem;
    margin: 0;
  }
  h2 {
    color: var(--pri-dark);
    font-weight: 500;
  }
  p {
    color: var(--pri-greyed);
  }
  .handle {
    color: var(--pri);
    font-weight: 500;
    opacity: unset;
  }
  .icon {
    display: inline-flex;
    background-color: inherit;
    gap: 0.4rem;
    align-items: center;
    border: unset;
    cursor: pointer;
    height: 1.5rem;
    font-size: 1rem;
    font-weight: 700;
  }
  .edit,
  .reply {
    color: var(--pri);
  }
  .delete {
    color: var(--loud);
  }
  .icon::before {
    --size: 1.1rem;
    display: inline-flex;
    align-items: center;
    content: '';
    background-repeat: no-repeat;
    background-size: calc(var(--size) * 0.8);
    background-position: center;
    height: var(--size);
    width: var(--size);
  }
  .delete::before {
    background-image: url(/images/icon-delete.svg);
  }
  .edit::before {
    background-image: url(/images/icon-edit.svg);
  }
  .reply::before {
    background-image: url(/images/icon-reply.svg);
  }
  button:hover {
    opacity: 0.4;
  }
  .editing {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .outline {
    /* Apply only when editing text */
    border: 1px solid var(--light);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    display: grid;
  }
  .update {
    background-color: var(--pri);
    color: var(--white);
    font-weight: 500;
    text-transform: uppercase;
    border: unset;
    border-radius: 0.5rem;
    width: 6.5rem;
    height: 3rem;
    cursor: pointer;
    margin-left: auto;
  }
  [contenteditable] {
    outline: unset;
  }
</style>

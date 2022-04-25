<script>
  import Comment from './Comment.svelte'
  import CreateComment from './CreateComment.svelte'

  let comments
  let currentUser

  fetch('/data.json')
    .then((response) => response.json())
    .then((result) => {
      comments = result.comments
      currentUser = result.currentUser
    })
    .catch((err) => console.log('Error: ', err.message))

  const addNewComment = (text) => {
    const newComment = {
      id: Math.random().toString(16).slice(2, 8),
      content: text,
      createdAt: new Date(),
      replies: [],
      score: 0,
      user: currentUser,
    }
    comments = [...comments, newComment]
  }
</script>

{#if !comments}
  <p>Please wait for some comments</p>
{:else}
  {#each comments as comment}
    <Comment {...comment} currentUser={currentUser.username} />
    {#if comment.replies.length}
      <div class="replies">
        {#each comment.replies as reply}
          <Comment {...reply} currentUser={currentUser.username} isReply />
        {/each}
      </div>
    {/if}
  {/each}

  <CreateComment {currentUser} {addNewComment} />
{/if}

<style>
  .replies {
    margin-left: 1rem;
    border-left: 0.15rem solid var(--light);
  }
</style>

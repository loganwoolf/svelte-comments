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
</script>

{#if !comments}
  <p class="no-comments">Be the first to comment!</p>
{:else}
  {#each comments as comment}
    <Comment {...comment} {currentUser} bind:comments />
    {#if comment.replies.length}
      <div class="replies">
        {#each comment.replies as reply}
          <Comment {...reply} {currentUser} bind:comments isReply />
        {/each}
      </div>
    {/if}
  {/each}
{/if}
{#if currentUser}
  <CreateComment {currentUser} bind:comments />
{/if}

<style>
  .no-comments {
    margin: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    color: var(--pri-greyed);
    background-color: var(--white);
  }
  .replies {
    margin-left: 1rem;
    border-left: 0.15rem solid var(--light);
  }
</style>

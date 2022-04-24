<script>
  import Comment from './Comment.svelte'

  let comments
  let currentUser
  fetch('/data.json')
    .then((response) => response.json())
    .then((result) => {
      comments = result.comments
      currentUser = result.currentUser
    })
    .catch((err) => console.log('Error: ', err.message))
  $: console.log({ comments, currentUser })
</script>

{#if !comments}
  <p>Please wait for some comments</p>
{:else}
  {#each comments as comment}
    <Comment {...comment} />
    {#if comment.replies.length}
      <div class="replies">
        {#each comment.replies as reply}
          <Comment {...reply} isReply />
        {/each}
      </div>
    {/if}
  {/each}
{/if}

<style>
  .replies {
    margin-left: 1rem;
    border-left: 0.15rem solid var(--light);
  }
</style>

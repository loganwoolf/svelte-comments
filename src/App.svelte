<script>
  import { onMount } from 'svelte'
  import Comment from './Comment.svelte'
  import CreateComment from './CreateComment.svelte'

  let currentUser
  let comments = []

  onMount(() => {
    const fetchUser = fetch('http://localhost:5555/api/v1/users/current')
    const fetchComments = fetch('http://localhost:5555/api/v1/comments')
    Promise.all([fetchUser, fetchComments])
      .then((response) => Promise.all(response.map((res) => res.json())))
      .then((result) => ([currentUser, comments] = result))
      .catch((err) => console.log('Error: ', err.message))
  })
</script>

{#if !comments.length}
  <p class="no-comments">Be the first to comment!</p>
{:else}
  {#each comments as comment}
    <Comment {...comment} {currentUser} bind:comments />
    {#if comment.replies.length}
      <div class="replies" data-reply-to-id={comment.id}>
        {#each comment.replies as reply}
          <Comment
            {...reply}
            parentID={comment.id}
            {currentUser}
            bind:comments
            isReply
          />
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
  @media screen and (min-width: 650px) {
    .replies {
      margin-left: 3.25rem;
      padding-left: 1.25rem;
    }
  }
</style>

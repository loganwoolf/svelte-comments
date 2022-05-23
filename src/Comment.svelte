<script>
  import Time from 'svelte-time'
  import CreateComment from './CreateComment.svelte'
  import Score from './lib/Score.svelte'

  export let id
  export let content
  export let createdAt
  export let score
  export let user
  export let replyName
  export let isReply
  export let comments
  export let currentUser
  export let parentID

  let replyOpen = false

  const toggleReplyArea = () => {
    replyOpen = !replyOpen
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
      <Time relative live={10000} timestamp={new Date(createdAt.replace(' ', 'T') + 'Z')} />
    </p>
  </header>

  <p>
    {#if replyName}
      <span class="handle">@{replyName}</span>
    {/if}
    {content}
  </p>

  <footer>
    <Score {score} />
    {#if currentUser.username === user.username}
      <button class="delete"><span>Delete</span></button>
      <button class="edit"><span>Edit</span></button>
    {:else}
      <button on:click={toggleReplyArea} class="reply"
        ><span>Reply</span></button
      >
    {/if}
  </footer>
</article>
{#if replyOpen}
  <CreateComment {currentUser} bind:comments bind:replyOpen replyingToID={parentID || id} replyingToName={user.username} />
{/if}

<style>
  article {
    display: flex;
    flex-direction: column;
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
  footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  button {
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
  button::before {
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
</style>

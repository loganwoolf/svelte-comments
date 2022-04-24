<script>
  import Score from './lib/Score.svelte'

  export let id
  export let content
  export let createdAt
  export let score
  export let user
  export let replyingTo
  export let isReply
  $: console.log(replyingTo)
</script>

<article data-comment-id={id} class={isReply && 'reply'}>
  <header>
    <img src={user.image.png} alt="" />
    <h2>{user.username}</h2>
    <p>{createdAt}</p>
  </header>
  <p>
    {#if replyingTo}
      <span class="handle">@{replyingTo}</span>
    {/if}
    {content}
  </p>
  <footer>
    <Score {score} />
    <button>Reply</button>
  </footer>
</article>

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
    justify-content: space-between;
    align-items: center;
  }
  button {
    background-color: inherit;
    border: unset;
    cursor: pointer;
    height: 1.5rem;
    font-weight: 700;
    color: var(--pri);
  }
  button::before {
    display: inline-flex;
    align-items: center;
    content: '';
    background-image: url(/images/icon-reply.svg);
    background-repeat: no-repeat;
    background-size: 0.8rem;
    height: 1rem;
    width: 1.2rem;
  }
</style>

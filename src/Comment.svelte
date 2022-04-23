<script>
  export let id
  export let content
  export let createdAt
  export let score
  export let user
  export let isReply

</script>

<article data-comment-id={id} class={isReply && 'reply'}>
  <header>
    <img src="{user.image.png}" alt="" />
    <h2>{user.username}</h2>
    <p>{createdAt}</p>
  </header>
  <p>{content}</p>
  <footer>
    <p>+ {score} -</p>
    <button>Reply</button>
  </footer>
</article>

<style>
</style>

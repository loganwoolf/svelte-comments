<script>
  export let currentUser
  export let comments
  $: console.log(comments )
  let text = ''

  const addNewComment = () => {
    console.log("I ran!" )
    const newComment = {
      id: Math.random().toString(16).slice(2, 8),
      content: text,
      createdAt: new Date,
      replies: [],
      score: 0,
      user: currentUser
    }
    comments = [...comments, newComment]
  }
</script>

<div>
  <textarea bind:value={text} placeholder="Add a comment..." />
  <footer>
    <img src={currentUser.image.png} alt="" />
    <button on:click={addNewComment} >Send</button>
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
</style>

<script>
  export let image
  // export let username
</script>

<div>
  <textarea name="" id="" cols="30" rows="3" placeholder="Add a comment..." />
  <footer>
    <img src={image.png} alt="" />
    <!-- <img src="/images/avatars/image-juliusomo.png" alt="" /> -->
    <button>Send</button>
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

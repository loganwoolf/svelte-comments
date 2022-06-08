<script>
  export let deleteComment
  export let toggleDeleteDialog
</script>

<div class="backdrop">
  <div class="confirm">
    <h2>Delete comment</h2>
    <p>
      Are you sure you want to delete this comment? This will remove the comment
      and can't be undone.
    </p>
    <footer>
      <button on:click={toggleDeleteDialog} class="cancel">No, cancel</button>
      <button on:click={deleteComment} class="warn">Yes, delete</button>
    </footer>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: hsla(0, 100%, 0%, 0.4);
    z-index: 1;
    display: grid;
    place-items: center;
  }

  .confirm {
    opacity: 1;
    width: calc(100% - 5.5rem);
    max-width: 21rem;
    padding: 1.75rem;
    padding-top: 1.5rem;
    background-color: var(--white);
    line-height: 1.5;
    border-radius: 0.5rem;
  }
  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }
  p {
    color: var(--pri-greyed);
  }
  footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  button {
    color: var(--white);
    font-weight: 500;
    font-size: 1rem;
    text-transform: uppercase;
    border: unset;
    border-radius: 0.5rem;
    cursor: pointer;
    height: 3rem;
  }
  button:hover {
    opacity: 0.4;
  }
  .cancel {
    background-color: var(--pri-greyed);
  }
  .warn {
    background-color: var(--loud);
  }
</style>

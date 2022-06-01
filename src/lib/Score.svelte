<script>
  export let votes
  export let userID

  const upVote = () => {
    // score += 1
  }
  const downVote = () => {
    // score -= 1
  }
</script>

<div class="score">
  <button class="icon score-up" on:click={upVote} />
  <p>{votes.up_users.length - votes.down_users.length}</p>
  <button class="icon score-down" on:click={downVote} />
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 2.5rem 1rem 2.5rem;
    grid-auto-rows: 2.5rem;
    justify-items: center;
    align-items: center;
    background-color: var(--lighter);
    border-radius: 0.5rem;
    margin-right: auto;
  }
  button {
    width: 100%;
    height: 100%;
    border: unset;
    cursor: pointer;
  }
  .score-up {
    mask: url(/images/icon-plus.svg);
  }
  .score-down {
    mask: url(/images/icon-minus.svg);
  }
  .icon {
    display: inline-block;
    background-color: var(--pri-light);
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 25%;
  }
  .icon:hover {
    background-color: var(--pri);
  }
  p {
    color: var(--pri);
    font-weight: 500;
    user-select: none;
  }
</style>

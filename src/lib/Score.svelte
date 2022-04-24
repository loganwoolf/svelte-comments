<script>
  export let score
  const upVote = () => {
    score += 1
  }
  const downVote = () => {
    score -= 1
  }
</script>

<div class="score">
  <button class="score-up" on:click={upVote} />
  <p>{score}</p>
  <button class="score-down" on:click={downVote} />
</div>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(3, 2rem);
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
    background-color: unset;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .score-up {
    background-image: url(/images/icon-plus.svg);
  }
  .score-down {
    background-image: url(/images/icon-minus.svg);
  }
  p {
    color: var(--pri);
    font-weight: 500;
    user-select: none;
  }
</style>

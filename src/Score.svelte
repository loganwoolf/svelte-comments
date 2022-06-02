<script>
  export let votes
  $: score = votes.up_users.length - votes.down_users.length
  export let userID
  export let commentID

  let voted = 0

  if (votes.up_users.includes(userID)) {
    voted = 1
  } else if (votes.down_users.includes(userID)) {
    voted = -1
  }

  const upVote = () => {
    if (voted === 1) {
      return
    }
    if (voted === -1) {
      return vote(0)
    }
    return vote(1)
  }
  const downVote = () => {
    if (voted === -1) {
      return
    }
    if (voted === 1) {
      return vote(0)
    }
    return vote(-1)
  }
  const vote = (vote) => {
    fetch(`http://localhost:5555/api/v1/comments/${commentID}/vote`, {
      method: 'PATCH',
      body: JSON.stringify({ voted: vote }),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    })
      .then((response) => response.json())
      .then((json) => {
        votes = json
        voted = vote
      })
  }
</script>

<div class="score">
  <button
    class="icon score-up {voted === 1 ? 'upvoted' : 'novote'}"
    on:click={upVote}
  />
  <p class={score < 0 && 'negative'}>{score}</p>
  <button
    class="icon score-down {voted === -1 ? 'downvoted' : 'novote'}"
    on:click={downVote}
  />
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 2.5rem 1.25rem 2.5rem;
    grid-auto-rows: 2.5rem;
    justify-items: center;
    align-items: center;
    background-color: var(--lighter);
    border-radius: 0.5rem;
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
  .novote:hover {
    background-color: var(--pri);
  }
  .upvoted {
    background-color: var(--pri);
  }
  .downvoted {
    background-color: var(--loud);
  }
  p {
    color: var(--pri);
    font-weight: 500;
    user-select: none;
  }
  .negative {
    color: var(--loud);
  }
  
  @media screen and (min-width: 650px) {
    div {
      grid-template-columns: unset;
      grid-auto-rows: unset;
      grid-auto-columns: 2.5rem;
      grid-template-rows: 2.5rem 1.25rem 2.5rem;
    }

  }
</style>

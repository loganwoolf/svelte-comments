<script>
  export let deleteComment
  export let toggleDeleteDialog
</script>

<div class="confirm">
  <h2>Delete Comment</h2>
  <p>
    Are you sure you want to delete this comment? This will remove the comment
    and can't be undone.
  </p>
  <button on:click={toggleDeleteDialog}>No, cancel</button>
  <button on:click={deleteComment}>Yes, delete</button>
</div>

<style>
</style>

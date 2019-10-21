<script>
	export let tasks

  async function update_status(e, task) {
		e && e.preventDefault()
		let payload = task;
    console.log("payload", payload)
		const config = {
		  method: 'PATCH',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json'
			}
		}
		let res = await fetch(`task.json`, config)
		let resp = await res.json()
		res = await fetch(`tasks.json`);
	  tasks = await res.json();
    console.log(tasks)
		return resp
  }

</script>

<style>
	.table-action {
		display: flex;
		justify-content: space-between;
	}
	.list-task-container {
		justify-content: center;
		text-align: center;
		margin-top: 5px;
		margin-bottom: 5px;
		width: 50%;
	}
	.list-task-title {
		font-size: 2em;
		margin: 10px;
		padding: 5px;
	}
	.task-element {
		padding: 5px;
		margin: 10px;
		border: 2px solid rgba(0,0,0,0.7);
		border-radius: 25px;
		background-color: rgba(0,0,0,0.1);
	}
</style>

<div class='table-action'>
	<div class='list-task-container pending'>
		<div class='list-task-title'>To do</div>
		{#each tasks.Todo || [] as task}
      <div class="task-element" on:click={(e) => update_status(e, task)}>{task.name}</div>
		{/each}
	</div>
	<div class='list-task-container done'>
		<div class='list-task-title'>Done</div>
		{#each tasks.Done || [] as task}
			<div class="task-element" on:click={(e) => update_status(e, task)}>{task.name}</div>
		{/each}
	</div>
</div>

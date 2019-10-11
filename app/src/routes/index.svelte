
<script context="module">
	export async function preload() {

		const res = await this.fetch(`tasks.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { data };
		} else {
			this.error(res.status, data.message);
		}
	}

</script>

<script>

	import List from '../components/List.svelte'
	import { onMount } from 'svelte';

	async function new_task(e, task_name) {
		e && e.preventDefault()

		let data = {"name": task_name};
		const config = {
		  method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}
		console.log('bodyyyy', JSON.stringify(data))
		let res = await fetch(`tasks.json`, config)
		console.log('resclient', res)
		let resp = await res.json()
		console.log('resp2', resp)
		return resp
	};

	let task_name = '';

	export let data;

</script>

<style>
	h1 {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	.input-container {
		justify-content: space-between;
		text-align: center;
	}

	.input-container input {
		padding-left: 0.3em;
		font-size: 1.2em;
		margin: 0 .5em;
		min-width: 125px;
		border: 1px solid #eee;
		border-left: 3px solid;
		border-radius: 5px;
		transition: border-color .5s ease-out;
	}

	.input-container input:optional {
 		border-left-color: #999;
	}
	.input-container input:required {
	  border-left-color: palegreen;
	}
	.input-container input:invalid {
		border-left-color: salmon;
	}
	.input-container button {
		color: white;
		background-color: dimgrey;
		font-size: 1.2em;
		min-width: 125px;
		border-radius: 10px;
		border: 2px solid #4e4e4e;
		cursor: pointer;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>To do</title>
</svelte:head>

<h1>Tasks of the day</h1>

<div class="input-container">
	<input bind:value={task_name} placeholder="Add a task">
	<button disabled={task_name === ""} on:click={(e) => new_task(e, task_name)}>
		Create task
	</button>
</div>

<List tasks={data} />

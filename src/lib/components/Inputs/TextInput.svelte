<script lang="ts">
	import { debounce } from '$lib/utils';

	export let name: string;
	export let label: string;
	export let placeholder: string = '';
	export let value: string;
	export let iconName: string;
	export let onChange: () => void = () => {};
</script>

<div class="input {name}">
	<label class="text-dark bold" for={name}>{label}</label>

	<div class="input-container">
		<input
			type="text"
			{name}
			id={`${name}-input`}
			bind:value
			{placeholder}
			on:keyup={debounce(onChange)}
		/>
		<i
			class={`clickable ${value ? 'ri-close-circle-line' : iconName}`}
			on:click={() => {
				value = '';
				onChange();
			}}
		></i>
	</div>
</div>

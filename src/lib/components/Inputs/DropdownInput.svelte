<script context="module" lang="ts">
	export type SortValue = '-created' | 'created';

	export type SortOption = {
		value: SortValue;
		displayText: string;
	};
</script>

<script lang="ts">
	export let name: string;
	export let label: string;
	export let options: SortOption[];
	export let value: string;
	export let iconName: string;
	export let onChange: () => void = () => {};
</script>

<div class="input {name}">
	<label class="text-dark bold" for={name}>{label}</label>

	<div class="input-container">
		<select {name} id={`${name}-input`} bind:value on:change={onChange}>
			{#each options as option}
				<option value={option.value}>{option.displayText}</option>
			{/each}
		</select>
		<i class={iconName}></i>
	</div>
</div>

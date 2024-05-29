<script context="module" lang="ts">
	export type ToggleValues = string[];

	export type ToggleOption = {
		value: string;
		displayText: string;
		color?: string;
	};
</script>

<script lang="ts">
	export let name: string;
	export let label: string;
	export let options: ToggleOption[];
	export let selected: ToggleValues;
	export let onClick: () => void = () => {};

	// Because Svelte's reactivity is triggered by assignments,
	// using array methods like push and splice won't automatically cause updates.
	const toggleOption = (optionValue: ToggleOption['value']) => {
		if (!selected.includes(optionValue)) {
			selected = [...selected, optionValue];
		} else {
			selected = selected.filter((item) => {
				return item !== optionValue;
			});
		}
	};
</script>

<div class="input {name}">
	<label class="text-dark bold" for={name}>{label}</label>

	{#each options as option}
		<div class="input-container" on:click={onClick}>
			<div
				class="toggleInput {option.color || ''}"
				class:active={selected.includes(option.value)}
				on:click={() => toggleOption(option.value)}
			>
				{option.displayText}
			</div>

			<i
				class:ri-eye-line={selected.includes(option.value)}
				class:ri-eye-close-line={!selected.includes(option.value)}
			></i>
		</div>
	{/each}
</div>

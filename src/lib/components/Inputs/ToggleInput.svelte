<script module lang="ts">
	export type ToggleValues = string[];

	export type ToggleOption = {
		value: string;
		displayText: string;
		color?: string;
	};
</script>

<script lang="ts">
	type ToggleInputProps = {
		name: string;
		label: string;
		options: ToggleOption[];
		selected: ToggleValues;
		onClick?: () => void;
	};

	let {
		name,
		label,
		options,
		selected = $bindable(),
		onClick = () => {}
	}: ToggleInputProps = $props();

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

	{#each options as option (option.value)}
		<div class="input-container" onclick={onClick}>
			<div
				class="toggleInput {option.color || ''}"
				class:active={selected.includes(option.value)}
				onclick={() => toggleOption(option.value)}
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

<style lang="scss">
	@use 'ui/forms';
</style>

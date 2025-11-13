<script module lang="ts">
	export type SortValue = '-created' | 'created';

	export type SortOption = {
		value: SortValue;
		displayText: string;
	};
</script>

<script lang="ts">
	type DropdownInputProps = {
		name: string;
		label: string;
		options: SortOption[];
		value: string;
		iconName: string;
		onChange?: () => void;
	};

	let {
		name,
		label,
		options,
		value = $bindable(),
		iconName,
		onChange = () => {}
	}: DropdownInputProps = $props();
</script>

<div class="input {name}">
	<label class="text-dark bold" for={name}>{label}</label>

	<div class="input-container">
		<select {name} id={`${name}-input`} bind:value onchange={onChange}>
			{#each options as option (option.value)}
				<option value={option.value}>{option.displayText}</option>
			{/each}
		</select>
		<i class={iconName}></i>
	</div>
</div>

<style lang="scss">
	@use 'ui/forms';
</style>

<script lang="ts">
	import { debounce } from '$lib/utils';

	type TextInputProps = {
		name: string;
		label: string;
		placeholder?: string;
		value: string;
		iconName: string;
		onChange?: () => void;
	};

	let {
		name,
		label,
		placeholder = '',
		value = $bindable(),
		iconName,
		onChange = () => {}
	}: TextInputProps = $props();
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
			onkeyup={debounce(onChange)}
		/>
		<i
			class={`clickable ${value ? 'ri-close-circle-line' : iconName}`}
			onclick={() => {
				value = '';
				onChange();
			}}
		></i>
	</div>
</div>

<style lang="scss">
	@use 'ui/forms';
</style>

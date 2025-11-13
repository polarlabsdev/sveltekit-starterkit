<script lang="ts">
	let { centerIcon = true } = $props();
</script>

<div class="loading-icon text-primary" class:center-xxs={centerIcon}>
	<i class="ri-loader-2-line icon-lg spin"></i>
</div>

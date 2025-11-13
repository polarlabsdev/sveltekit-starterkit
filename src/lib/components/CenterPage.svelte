<script lang="ts">
	let { children } = $props();
</script>

<div class="margin">
	<div class="row center-xxs middle-xxs" style="height: 100vh">
		<div class="col-xxs-12">
			{@render children()}
		</div>
	</div>
</div>

<style lang="scss">
	@use 'layout/flexgrid';
</style>

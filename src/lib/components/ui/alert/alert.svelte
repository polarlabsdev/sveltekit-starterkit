<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const alertVariants = tv({
		base: 'relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:mt-0.5 [&>svg]:text-current [&>i]:size-4 [&>i]:shrink-0 [&>i]:mt-0.5 [&>i]:text-current',
		variants: {
			variant: {
				default: 'bg-card text-card-foreground border-border',
				primary:
					'bg-primary/15 text-primary border-primary/50 [&>svg]:text-primary [&>i]:text-primary [&_[data-slot=alert-description]]:text-primary/90',
				secondary:
					'bg-secondary text-secondary-foreground border-secondary [&>svg]:text-secondary-foreground [&>i]:text-secondary-foreground [&_[data-slot=alert-description]]:text-secondary-foreground/90',
				destructive:
					'bg-destructive/15 text-destructive border-destructive/50 [&>svg]:text-destructive [&>i]:text-destructive [&_[data-slot=alert-description]]:text-destructive/90',
				info: 'bg-info/15 text-info border-info/50 [&>svg]:text-info [&>i]:text-info [&_[data-slot=alert-description]]:text-info/90',
				success:
					'bg-success/15 text-success border-success/50 [&>svg]:text-success [&>i]:text-success [&_[data-slot=alert-description]]:text-success/90',
				warning:
					'bg-warning/15 text-warning border-warning/50 [&>svg]:text-warning [&>i]:text-warning [&_[data-slot=alert-description]]:text-warning/90',
				danger:
					'bg-danger/15 text-danger border-danger/50 [&>svg]:text-danger [&>i]:text-danger [&_[data-slot=alert-description]]:text-danger/90'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	export type AlertVariant = VariantProps<typeof alertVariants>['variant'];
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert"
	class={cn(alertVariants({ variant }), className)}
	{...restProps}
	role="alert"
>
	{@render children?.()}
</div>

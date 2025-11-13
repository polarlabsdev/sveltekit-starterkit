# Copilot Instructions - SvelteKit StarterKit

## Architecture Overview

This is a **Svelte 5 + SvelteKit 2** project with **Tailwind CSS 4** and **shadcn-svelte** components. Key architectural decisions:

- **File-based routing** in `src/routes/` with SvelteKit conventions (`+page.svelte`, `+layout.svelte`, `+page.server.ts`)
- **Modern Tailwind CSS 4** with native CSS support (no PostCSS) and `@tailwindcss/vite` plugin
- **shadcn-svelte** component system in `src/lib/components/ui/` with `components.json` configuration
- **Node.js adapter** for production deployment with Docker multi-stage builds
- **Sentry integration** via hooks for error tracking and source maps
- **Vite 7** for lightning-fast development and builds
- **TypeScript** with strict configuration and SvelteKit path aliases

## Testing Patterns

**When Writing Tests:**

- **Vitest** for unit tests - focus on component logic and utility functions
- **Playwright** for integration tests - multi-browser end-to-end testing
- Use Playwright VS Code extension for test generation: record interactions, remove `baseURL` from generated tests
- Component testing with `@testing-library/svelte` for unit tests

## Component Patterns

**shadcn-svelte Integration:**

```svelte
import Button from '$lib/components/ui/button/button.svelte'; import * as Card from
'$lib/components/ui/card';

<Button variant="outline" size="lg">Click me</Button>
<Card.Root>
	<Card.Header><Card.Title>Title</Card.Title></Card.Header>
	<Card.Content>Content</Card.Content>
</Card.Root>
```

**Theme System:**

- Use `mode-watcher` for theme switching: `import { setMode, mode } from 'mode-watcher'`
- CSS custom properties in `:root` and `.dark` classes in `tailwind.css`
- Theme toggle example in `src/lib/components/ThemeToggle.svelte`

**Styling Conventions:**

- **Utility-first** with Tailwind CSS 4 native features (`@theme`, `@utility`, `@layer`)
- **Semantic HTML typography:** Use `<h1>`, `<p>`, `<blockquote>` etc. - styles defined in `typography.css`
- **Typography utilities:** `text-lead`, `text-small`, `display-1-4` for semantic enhancement
- **Container utility:** Always use `container` class - includes responsive padding (1rem→2rem) and max-width
- **Theme colors only:** Use semantic classes like `bg-background`, `text-foreground`, `text-primary` - never hardcoded colors
- **Icons:** RemixIcon via `<i class="ri-icon-name"></i>` classes
- **Custom breakpoints:** xs (420px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Font system:** Geist for UI, monospace for code blocks

## Key Configuration Files

**Build & Development:**

- `vite.config.ts` - Sentry, Tailwind, sitemap plugins with environment loading
- `svelte.config.js` - Node adapter, warning suppression for common false positives
- `tailwind.css` - Tailwind 4 configuration with design tokens and custom utilities
- `components.json` - shadcn-svelte paths and registry configuration

**Code Quality:**

- `eslint.config.js` - Flat ESLint config with TypeScript + Svelte rules
- Husky pre-commit hooks enforce formatting and linting
- `ignoredWarningKeywords` in svelte.config.js suppresses common false positives

## Production Deployment

**Docker Pattern:**

- Multi-stage build: Node 22 Alpine builder + minimal runtime container
- Build args: `SENTRY_ORG`, `SENTRY_PROJECT` for source map uploads
- Security: runs as `node` user, not root
- Command: `node -r dotenv/config build/index.js` (dotenv required for production env vars)

**Environment Variables:**

- `ORIGIN` - Required for production (domain URL)
- `SENTRY_ORG`, `SENTRY_PROJECT` - Optional error tracking
- `PUBLIC_API_URL` - Client-side API base URL

**Sentry Integration:**

- Configured in `src/lib/utils/sentry.ts` and loaded via hooks
- Source maps automatically uploaded during build with proper org/project config

## File Organization

**Component Library:**

- `src/lib/components/ui/` - shadcn-svelte components (managed via CLI)
- `src/lib/components/` - Custom project components (e.g., `ThemeToggle.svelte`)
- `src/lib/utils/` - Utility functions including `cn()` for class merging

**Routing & Pages:**

- `src/routes/+layout.svelte` - Root layout with ModeWatcher and global styles
- `src/routes/+page.server.ts` - Server-side data loading patterns
- `src/hooks.server.ts` - Sentry + sitemap hooks with sequence composition
- `src/app.html` - HTML shell template

**Styling System:**

- `src/lib/styles/tailwind.css` - Main styles with design tokens and utilities
- `src/lib/styles/typography.css` - Typography utilities
- `src/lib/styles/fonts.css` - Font definitions
- Custom breakpoints: `xs: 420px` through `4xl: 2200px`
- Font system: Geist for UI, monospace for code blocks

**Configuration & Deployment:**

- `web_chart/` - Helm charts for Kubernetes deployment
- `static/` - Static assets (favicon, manifests, robots.txt)

## Common Pitfalls

- **Remove `baseURL`** from Playwright generated tests (use dev server URL)
- **Use semantic HTML** - rely on `typography.css` for base styles, enhance with utilities
- **Use `container` class** for layouts - never add padding/margin, it's handled automatically
- **Use theme colors only** - `bg-background`, `text-muted-foreground`, not `bg-gray-100` or hardcoded values
- **Use `cn()` utility** for conditional classes: `cn("base-class", condition && "conditional-class")`
- **Import shadcn components** with exact paths: `$lib/components/ui/button/button.svelte`
- **Environment loading** in Vite config uses `loadEnv()` pattern for Sentry configuration

## Integration Points

**Sitemap Generation:**

- Dynamic routes via `getRoutes` function in hooks (example commented)
- Static routes configured in `src/sitemap.ts`
- Robots.txt generation based on `PUBLIC_ENV_NAME` environment

**Error Tracking:**

- Sentry handles both client (`hooks.client.ts`) and server (`hooks.server.ts`) errors
- Source maps uploaded during build process with proper organization/project targeting

## Modern Framework Best Practices

**Tailwind CSS 4 Patterns:**

- **CSS-first configuration** - Use `@theme`, `@utility`, `@layer` instead of JavaScript config
- **Native CSS features** - Leverage cascade layers, `@property`, and `color-mix()`
- **Design tokens** - Define colors and spacing in CSS custom properties for consistent theming
- **Modern utilities** - Use new 3D transforms, `@starting-style` for animations, field-sizing
- **No PostCSS needed** - Built-in import support eliminates additional tooling

**Svelte 5 Patterns:**

- **Runes over legacy reactivity** - Use `$state()`, `$derived()`, `$effect()` instead of `let` declarations and `$:`
- **Universal reactivity** - Share reactive state in `.svelte.js`/`.svelte.ts` files across components
- **Snippets for reusability** - Use snippet blocks and render tags to avoid component duplication
- **Props as callbacks** - Pass event handlers as props instead of `createEventDispatcher`
- **Components as functions** - Leverage Svelte 5's function-based component optimization
- **Fine-grained reactivity** - Runes enable more efficient updates than legacy array invalidation

**Development Philosophy:**

- **Component-First:** Abstract common UI elements into reusable components
- **Type Safety:** Use TypeScript everywhere for better developer experience
- **Utility CSS:** Leverage Tailwind's utility classes for rapid styling
- **Accessibility:** Build with accessibility in mind using shadcn-svelte components
- **Performance:** Optimize for Core Web Vitals and user experience

## Available Components

**shadcn-svelte Components:**

- Button (variants: primary, secondary, outline, ghost, destructive)
- Card (Header, Content, Footer sections)
- Form Controls: Input, Label, Checkbox, Select, Radio Group
- Feedback: Alert, Badge, Skeleton
- Layout: Separator, Toggle

**Typography System:**

- **Semantic HTML first:** Use proper HTML elements (`<h1>`, `<h2>`, `<p>`, `<blockquote>`, `<ul>`, `<ol>`, `<code>`, `<pre>`)
- **All base styles in `typography.css`:** Comprehensive semantic element styling with proper font families
- **Utility classes for enhancement:** `display-1-4`, `text-lead`, `text-small`, `text-muted`, `quote`, `list-check`

```svelte
<!-- Semantic HTML with automatic styling -->
<h1>Automatically styled heading</h1>
<p>Body text with proper font family</p>

<!-- Enhanced with utility classes -->
<h1 class="display-1">Large display heading</h1>
<p class="text-lead">Lead paragraph</p>
<blockquote class="quote">Quote with author</blockquote>
```

**Theme Color System:**
Use semantic color classes that automatically work with dark mode:

- `bg-background`, `text-foreground` (main page colors)
- `bg-card`, `text-card-foreground` (card backgrounds)
- `text-primary`, `bg-primary` (accent/brand colors)
- `text-muted-foreground`, `bg-muted` (subdued content)
- `bg-secondary`, `text-secondary-foreground` (secondary UI)
- `text-destructive`, `bg-destructive` (errors/warnings)
- `border-border`, `ring-ring` (borders and focus rings)

**Container Usage:**

```svelte
<div class="container">
	<!-- Content automatically gets responsive padding (1rem→2rem) and max-width -->
</div>
```

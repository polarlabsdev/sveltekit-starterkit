# Polar Labs SvelteKit StarterKit

The intention of this repo is to be a simple place to start any new SvelteKit project without having to go through all the initial boilerplate steps. We use it internally for our projects and also push updates to an open source Github repo. If you'd like to use it either clone or fork this repo and do as you'd like!

## Overview

This repo contains a modern SvelteKit application built with the latest tools and best practices. We have made the following choices with this StarterKit:

- **Svelte 5** - The latest version of Svelte with modern reactivity and improved performance
- **SvelteKit 2** - File-based routing with server-side rendering and static site generation
- **Tailwind CSS 4** - The newest version with native CSS support and improved performance via `@tailwindcss/vite`
- **shadcn-svelte** - A comprehensive component library providing accessible, customizable UI components
- **TypeScript** - Full type safety with strict configuration
- **Vite 7** - Lightning-fast development server and build tool
- **Vitest & Playwright** - Unit testing with Vitest and end-to-end testing with Playwright
- **ESLint 9 & Prettier** - Modern linting and formatting with flat config
- **Husky** - Pre-commit hooks for code quality
- **Sentry** - Error tracking and performance monitoring
- **Node.js Adapter** - Production-ready deployment with Docker support
- **Mode Watcher** - Elegant dark/light theme switching
- **RemixIcon** - Beautiful icon library with 2000+ icons

The intention is that this repo provides a production-ready StarterKit that you can deploy immediately and start building features - no "beginning of the project" boilerplate needed!

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 22+)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd sveltekit-starterkit
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:

```bash
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Project Structure

SvelteKit uses a file-based router similar to Next.js but with its own conventions. Here's how this project is organized:

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/           # shadcn-svelte components
│   │   └── ThemeToggle.svelte
│   ├── styles/
│   │   ├── tailwind.css  # Main Tailwind styles
│   │   ├── typography.css # Typography utilities
│   │   └── fonts.css     # Font definitions
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript types
├── routes/
│   ├── +layout.svelte    # Root layout
│   ├── +page.svelte      # Home page
│   └── +page.server.ts   # Server-side data loading
├── app.html              # HTML shell
└── hooks.server.ts       # Server hooks
```

### Development Philosophy

- **Component-First**: Abstract common UI elements into reusable components
- **Type Safety**: Use TypeScript everywhere for better developer experience
- **Utility CSS**: Leverage Tailwind's utility classes for rapid styling
- **Accessibility**: Build with accessibility in mind using shadcn-svelte components
- **Performance**: Optimize for Core Web Vitals and user experience

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run SvelteKit and TypeScript checks
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Format code with Prettier
- `npm run test` - Run all tests (unit + integration)
- `npm run test:unit` - Run unit tests with Vitest
- `npm run test:integration` - Run browser tests with Playwright

## Deployment

This repo includes a production-ready Docker setup with multi-stage builds for optimal image size and security.

### Docker Deployment

The included Dockerfile uses Node.js 22 Alpine and follows best practices:

1. **Multi-stage build** - Separate build and runtime containers
2. **Security** - Runs as non-root user
3. **Optimized** - Removes dev dependencies in production image

**Before building, set up your environment variables:**

```bash
# Copy example environment file
cp .env.example .env
# Edit .env with your production values
```

**Build and run:**

```bash
# Build the image
docker build -t your-app:latest .

# Run with docker-compose
version: "3.8"
services:
  app:
    image: your-app:latest
    container_name: your-app
    env_file: .env
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Environment Variables

Required environment variables for production:

- `ORIGIN` - The domain your site will be accessed from (e.g., `https://yoursite.com`)
- `SENTRY_ORG` - Your Sentry organization (optional, for error tracking)
- `SENTRY_PROJECT` - Your Sentry project (optional, for error tracking)
- `PUBLIC_API_URL` - Public API URL for client-side requests

### Kubernetes Deployment

The project includes Helm charts in `web_chart/` for Kubernetes deployment using our Polar Labs helm StarterKit from [helm.polarlabs.ca](https://helm.polarlabs.ca). The setup assumes:

- No nginx reverse proxy (SvelteKit handles this)
- Environment variables injected via Kubernetes secrets/configmaps
- Ingress controller for external traffic

### CI/CD

The project includes Bitbucket Pipelines configuration that can be adapted for other CI/CD systems. Our deployment strategy focuses on simplicity and speed:

**Branch Model:**

- Feature branches → Pull Requests → Main → Production
- All code must pass tests before merging
- Husky pre-commit hooks ensure code quality

**Pipeline Steps:**

1. **Pull Requests**: Run tests, linting, and type checking
2. **Main Branch**: Full test suite + optional deployment trigger
3. **Production**: Build Docker image → Push to registry → Deploy to Kubernetes

**Quality Gates:**

- TypeScript type checking with `svelte-check`
- ESLint with strict rules
- Prettier code formatting
- Unit tests with Vitest
- Integration tests with Playwright
- Pre-commit hooks with Husky

**Deployment Variables:**
Set these in your CI/CD system:

- `DOCKER_REGISTRY` - Your container registry
- `KUBE_CONFIG` - Kubernetes configuration
- `SENTRY_AUTH_TOKEN` - For source map uploads
- Environment-specific secrets

## Styling with Tailwind CSS 4 and shadcn-svelte

This StarterKit uses the latest Tailwind CSS 4 with native CSS support and shadcn-svelte for components. This combination provides both utility-first styling and high-quality, accessible components out of the box.

### Tailwind CSS 4 Features

**Native CSS Support**: Tailwind 4 uses native CSS features, eliminating the need for PostCSS plugins:

- `@import 'tailwindcss'` imports the framework directly
- `@theme` blocks for custom design tokens
- `@utility` for custom utilities
- `@layer` for organizing styles

**Custom Design System**: Our configuration includes:

- **Responsive breakpoints**: xs (420px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Typography scale**: Display variants, semantic headings, and utility classes
- **Color system**: Semantic colors with dark mode support using CSS custom properties
- **Container utilities**: Responsive padding and max-width constraints

### shadcn-svelte Components

We use [shadcn-svelte](https://shadcn-svelte.com/) for accessible, customizable UI components:

```svelte
import Button from '$lib/components/ui/button/button.svelte'; import * as Card from
'$lib/components/ui/card'; import Badge from '$lib/components/ui/badge/badge.svelte';

<Button variant="outline" size="lg">Click me</Button>

<Card.Root>
	<Card.Header>
		<Card.Title>Card Title</Card.Title>
		<Card.Description>Card description</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>Card content goes here</p>
	</Card.Content>
</Card.Root>
```

### Available UI Components

The StarterKit includes these shadcn-svelte components:

- **Button**: Multiple variants (primary, secondary, outline, ghost, destructive)
- **Card**: Header, content, and footer sections
- **Form Controls**: Input, Label, Checkbox, Select, Radio Group
- **Feedback**: Alert, Badge, Skeleton
- **Layout**: Separator, Toggle
- **Custom**: ThemeToggle for dark/light mode switching

### Typography System

Semantic HTML with utility classes for enhanced typography:

```svelte
<h1 class="display-1">Large Display Heading</h1>
<h2>Semantic Heading 2</h2>
<p class="text-lead">Lead paragraph for introductions</p>
<p>Regular paragraph text</p>
<p class="text-small text-muted-foreground">Small muted text</p>
```

### Color System & Dark Mode

Colors are defined using CSS custom properties with automatic dark mode:

```css
:root {
	--background: oklch(1 0 0);
	--foreground: oklch(0.145 0 0);
	--primary: oklch(0.205 0 0);
	/* ... more colors */
}

.dark {
	--background: oklch(0.145 0 0);
	--foreground: oklch(0.985 0 0);
	/* ... dark variants */
}
```

Use `mode-watcher` for theme switching:

```svelte
import {(setMode, mode)} from 'mode-watcher';

<button onclick={() => setMode($mode === 'dark' ? 'light' : 'dark')}> Toggle Theme </button>
```

### Custom Utilities

Add custom utilities in `tailwind.css`:

```css
@utility container {
	margin-inline: auto;
	padding-inline: var(--container-padding);
	max-width: var(--breakpoint-xl);
}

@utility text-balance {
	text-wrap: balance;
}
```

### Best Practices

1. **Use semantic HTML** with utility classes for styling
2. **Leverage component composition** with shadcn-svelte
3. **Follow the design system** defined in `tailwind.css`
4. **Use CSS custom properties** for theme consistency
5. **Prefer utilities over custom CSS** for maintainability

## Configuration

The project configuration is streamlined with modern tooling:

### Core Configuration Files

- **`vite.config.ts`** - Build tool configuration with Tailwind, Sentry, and sitemap plugins
- **`svelte.config.js`** - Svelte preprocessing and adapter configuration
- **`tailwind.css`** - Tailwind 4 configuration with design tokens and utilities
- **`components.json`** - shadcn-svelte component configuration
- **`eslint.config.js`** - Flat ESLint configuration with TypeScript and Svelte rules
- **`playwright.config.ts`** - End-to-end testing configuration

### Key Features

**Vite Plugins:**

- `@tailwindcss/vite` - Native Tailwind CSS 4 support
- `@sentry/sveltekit` - Error tracking and performance monitoring
- `sitemapPlugin` - Automatic sitemap generation

**PostCSS**: Minimal configuration (Tailwind 4 handles most preprocessing natively)

**TypeScript**: Strict configuration with SvelteKit path aliases

## Testing

The project includes comprehensive testing setup with modern tools:

### Unit Testing with Vitest

```bash
# Run unit tests
npm run test:unit

# Run with watch mode during development
npx vitest
```

**Features:**

- Fast test execution with Vite's infrastructure
- TypeScript support out of the box
- Component testing capabilities
- Coverage reporting

### Integration Testing with Playwright

```bash
# Run integration tests
npm run test:integration

# Run specific browsers
npx playwright test --project=chromium
npx playwright test --project=firefox
```

**Features:**

- Cross-browser testing (Chromium, Firefox)
- Visual regression testing capabilities
- Network interception and mocking
- Parallel test execution

### Writing Tests

**Playwright Test Generation:**
Use the [Playwright VS Code extension](https://playwright.dev/docs/codegen#generate-tests-in-vs-code) to generate tests:

1. Install the Playwright extension
2. Start your dev server (`npm run dev`)
3. Use "Record new test" in VS Code
4. Remove the baseURL from generated tests (it uses your dev server)

**Component Testing:**

```typescript
// Example unit test
import { render } from '@testing-library/svelte';
import Button from '$lib/components/ui/button/button.svelte';

test('renders button with correct variant', () => {
	const { getByRole } = render(Button, {
		props: { variant: 'outline' }
	});

	expect(getByRole('button')).toHaveClass('border');
});
```

### Customization Checklist

Before deploying, update these items:

- [ ] Replace favicon in `static/` directory
- [ ] Update `site.webmanifest` with your app details
- [ ] Change `app.html` title and meta tags
- [ ] Update Sentry configuration in `vite.config.ts`
- [ ] Set production environment variables
- [ ] Update Docker image name in `Dockerfile`
- [ ] Configure domain-specific settings

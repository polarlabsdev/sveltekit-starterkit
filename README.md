# Polar Labs Sveltekit Starterkit

The intention of this repo is to be a simple place to start any new sveltekit project without having to go through all the initial boilerplate steps. We use it internally for our projects and also push updates to an open source Github repo. If you'd like to use it either clone or fork this repo and do as you'd like!

## Overview

This repo contains the barebones of a sveltekit 4.2 app. We have made the following choices with this starterkit:

- We left the default testing and build libs (vite and playwright)
- We chose to use [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess) as it allows us to use external files and global css out of the box
- We chose to use a custom SCSS framework based on a customized [flexboxgrid](http://flexboxgrid.com/) that has been updated to use Sass and integrate into a greater custom framework. This is a starterkit for those strong in CSS, though you could swap things out pretty easily for something like TailwindCSS
- We use autoprefixer to handle brower compatibility (so you could just add tailwind to the postcss plugins)
- We included a dockerfile that can be deployed verbatim to kubernetes
- We included our standard helm template for deploying to kubernetes (TODO)
- We included a bitbucket pipelines file we use ourselves that manages the deployment to kubernetes. It should be trivial to convert this to your own CI/CD service

The intention is that (especially if you agree with our choices) this repo provides a starterkit that you can simply point to your own kubernetes and start writing code - no "beginning of the project" boilerplate needed!

## Developing

Sveltekit uses a file-based router like next.js but with very much its own flavour. You can find these files all under `src/routes`. Sveltekit documentation can explain exactly how to use these files.

Common files like components can be found in `src/lib` which can be easily accessed in page files as `import x from '$lib/whatever`. It is best to abstract common elements of your site into components as much as possible. Ideally your page files are actually quite small as your components can isolate their logic and styles (what is even necessary outside the global framework explained below). If you find individual pages getting long, you should step back and consider if there are things that can be abstracted.

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deployment

This repo comes with a working Dockerfile that you can simply build and deploy. It uses node v20 and uses a builder image which copies into a deployable image which keeps the final size small since most of svelte is preprocessors we can remove for the deployable image.

**Before you build any docker images though, make sure you generate a `.env` file in the root!** There is an example in the repo if you'd like to run it manually, as well as a script for CI/CD in the `bin/` folder that will convert env vars in your machine to a .env file.

We use the node-adapter for sveltekit with the barest setup accepting most of their defaults. **This means the only thing you need to do to build is pass ORIGIN (the domain your site will be accessed from) as a build-arg.** The app will then run on port 3000. Here is an example build command and docker-compose:

```
docker build -t your-built-image:1.0.0 --build-arg origin=https://yourdomain.com:3000 .

version: "3.8"
services:
  your-website:
    image: your-built-image:latest
    container_name: your-website
    ports:
      - 3000:3000
    restart: unless-stopped
```

> **Note:** We deploy this container using our helm template _(link to be added once it's online)_ so in our docker image we don't use nginx reverse-proxies or anything like that. It's up to you how you would like to deploy.

### CI/CD

We include our bitbucket pipelines file as a reference for how to deploy this container in an automated fashion. We use the github branch model and aim for quick deploys over complicated release models. Our flow looks like this:

- Pull Requests
  - On every pull request run tests. We set branch restrictions in our repo to only allow merges to main, and only after the pipeline passes
  - We will likely use kubernetes in the future to deploy preview environments with a manual trigger instead of keeping a dedicated staging env alive
  - We do all our linting/formatting with husky (included in this repo) to keep our build minutes low
- Merge to Main
  - Run all the tests again to make sure everything still jives with the existing code before we deploy it
  - On manual trigger, build the docker image, upload to a private registry, deploy to kubernetes (TODO)

Keeping our process simple means we can rapidly deploy updates without having to worry about named branches, release branches, or hotfix merges back to develop. In our eyes, all code should be complete and passing tests before it goes to main, and if that's true it can go to prod.

> **Note:** Make sure you set the pipeline variables/secrets in the file!

## How to use the included SCSS Framework

This is a custom framework that has been built up over many years of web development that requires solid CSS knowledge but if used well make development rapid and deeply integrated. However, if that's not your cup of tea it should be trivial to switch to TailwindCSS.

**The Philosophy:**

The idea behind this framework is to double down on semantic HTML (which has never been more possible since our discovery of Svelte!) and provide a set of global styles that allow you to quickly piece together a website using common classes and typography within a 12 column grid system based on flexbox with several flexbox goodies. There is a basic example we are using as a "hello world" homepage now that you will notice is completely responsive right out of the box with the code you see on the page - no page specific CSS needed!

There are several important concepts behind this system:

- The grid
- Proper usage of rem units
- Proper usage of scss variables
- Semantic typography
- Common utility classes

### The grid

The grid is a throwback to the old 12 column 960/bootstrap grid but using flexbox to power it instead of float like the olden days. The concept is simple:

- Wrap everything inside a `.row` class (DO NOT FORGET THIS OR THINGS GUNNA BE BROKE)
- Place `.col` classes inside the row with the number of columns (out of 12) this container should take up, and for what screen size.

Consider everything from a container perspective. Don't put columns directly on content elements (type, images, etc). Everything should be inside a container, and everything inside the container should be sized by percentage (usually just 100%). Then you can just resize the containers as the screen changes.

Doing this, you can place all your content inside containers that take up a certain number of columns depending on the screen size (defined in your variables.scss file, more on that later). For example, you might have an element like this:

```
<div class="row">
  <div class="col-xxs-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
    <div class="box background-primary"></div>
  </div>
</div>
```

In regular english, this means simply the following:

- on extra extra small screens this container should be 12 columns (100%)
- on small screens, it should be 6 columns (50%)
- on medium screens, 4 (33.3%)
- on large screens, 3 (25%)
- and so on

There are also lots of fun utility classes, like `between-sm` which you can put on the row class which will apply flexbox's `space-around` property on small screens and above.

For a (mostly) full overview of the available options check out http://flexboxgrid.com/. In the future we'd like to fork this website and open source fully the scss version of the grid with the extra goodies we've addded such as our vertical stretch options you can see in `src/lib/styles/partials/_flexgrid.scss`.

### Proper usage of rem units

This unit simply put, is the font-size of the `<html></html>` tag multiplied by the rem unit. For example, the default font size is 16px. If I set a width of 2rem, the browser will compute the width to be 32px.

Why do this? Because if you're consistent with it, **you can scale your entire website from a single location.**

If you look at `src/lib/styles/partials/_typography.scss` you'll see a number of media queries on the html tag using our scss variables for screen sizes - the same ones the grid uses. Forget for a minute that the property is called `font-size` and mentally replace it with `rem-scale` and what you can do is essentially set a base multiplier for the scale of your entire website based on the screen size, which means never again will you have to set 50 media queries to adjust font sizes and margins based on what screen size you're viewing. So long as you use rem everywhere anyways.

There is [a handy vscode extension](https://marketplace.visualstudio.com/items?itemName=sainoba.px-to-rem) to help you convert back and forth from px. In practise, you can use px on your laptop screen (which is likely set to 16px in common.scss) then just swap all the px values when you're done.

### Proper usage of scss variables

Take a look at `src/lib/styles/partials/_variables.scss` and notice how all the site colours and screen sizes can be found there. And some even alias each other! The idea is that you can set all of your colours here and use them programmatically (almost like JS even, except remember sass is a preprocessor).

With some planning ahead, you can do the following:

- Control all the colours of your website from a single place
- Control all the various styling elements from a single place, such as border radius or website margins
- Create auto-generated utility classes (see ~line 85 of `src/lib/styles/partials/_common.scss`)
- Control the sizes of your breakpoints\*

Take advantage of this! Anywhere you would use a constant in JS, you should use a sass variable here.

\* -> NOTE: In the current version of the site you _can_ set your screen sizes here, but to update the grid you must also swap the `$breakpoints` variable in `src/lib/styles/partials/_flexgrid.scss`. There might be other places as well such as `src/lib/components/ResponsiveHelper.svelte`. In the future we will figure out a better way to handle this.

### Semantic typography

Our intention here is to stick as close to semantic HTML as possible. It's better for SEO, it's better for readability, it's better for you. In `src/lib/styles/partials/_typography.scss` we define the sizes and styles of all the HTML tags you might use for fonts from h1 -> p. Then when you're writing code, you can simply use the tag that you would expect to use. If you are writing font styles directly in page CSS, you should have a very good reason to be breaking the style guide.

You'll also notice we generate more utility classes to easily apply colours from the variables.scss file to your fonts right from the HTML.

### Common utility classes

The ultimate goal of this thinking is to write as little page specific CSS as possible. You can't get around certain unique aspects of your pages needing custom styling, but if you can think abstractly and break your site elements down essentially into lego pieces, you can construct your website quickly and easily and change the entire site from a single place.

This framework functions best when you really take to heart the power and role of CSS in your website. For example, don't animate things by changing their values with JS. Create classes like `.open` and `.closed` and simply add and remove those classes from an element using JS. And if you can get abstract enough, you can reuse those classes across different parts of your website.

The major difference between this and a library like Tailwind is that this way provides you a strong ability to customize your framework and take advantage of the many powerful features of CSS like tag selectors or CSS animations. It does require you to be strict to your own rules, but it also allows you to set your own rules.

## Preprocessing

All preprocessing can be found in these two files:

- svelte.config.js
- vite.config.ts

Though there is also a `postcss.config.js` which contains the config to run autoprefixer for the CSS. There is also some added parts to the scss section of `svelte-preprocess` which allow us to prepend our variables and mixins to page styles.

## Testing

Testing is done with vitests for unit tests and playwright for integration tests. These come default with sveltekit.

We recommend using this: https://playwright.dev/docs/codegen#generate-tests-in-vs-code to easily write tests in the browser. The only catch is that for some reason vscode doesn't start the server, so you have to have your own dev server running then remove the url from the resulting test file.

## Useful Resources

- [How Svelte Stores work (state management)](https://www.youtube.com/watch?v=L3uBfL-4dDM)

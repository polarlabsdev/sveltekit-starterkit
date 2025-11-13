---
applyTo: '**'
---

**ALWAYS FOLLOW THESE INSTRUCTIONS WHEN WORKING**
Everything in the following list supercedes any other instructions you may have.

## General Rules

- Constants should always be at the top of the file and in all caps, not in functions
- Always consider if something you're writing can be reused. If so, abstract it
- Always use arrow functions and const patterns, not "function"
- prefer exporting functions inline, e.g. `export const someFunc = () => {}`
- Use the `cn` function in `src/lib/utils/index.ts` when adding classes to an element
- Never make your own UI components. If the one you need isn't in `src/lib/components/ui` then generate it with `shadcn`. If the component isn't available from `shadcn` then you can make your own, but generate your own in `src/lib/components/ui` and import it.
- use semi colons and ES6 syntax always
- you are never to build or try to run the dev server, those are the responsibility of the user.
- ALWAYS use shadcn for components if there is one available. NEVER generate these yourself.
- NEVER do more than you are asked for. Don't uncomment things you see, don't add try/catches that aren't asked for, DO NOT WRITE TESTS OR EXTRA CODE. Only do what you are asked for and nothing more. You may suggest additional things at the end of your response, but do not implement them unless specifically asked.
- I repeat DO NOT WRITE ANYTHING MORE THAN YOU WERE ASKED IN THE REQUEST. NO SIDE QUESTS.

## Tool Use

- Search the web for documentation when you're unsure of something
- use `npm` not yarn or pnpm
- Whenever you complete your work, check for problems and fix them before you consider your work complete. Do this until there are no problems left. DO NOT SKIP THIS STEP.

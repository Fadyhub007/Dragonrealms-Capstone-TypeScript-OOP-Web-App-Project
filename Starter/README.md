 TypeScript Static Site

- Install dependencies
- Compile TypeScript to `dist/` (ES module output)
- Run a tiny static server and edit TypeScript in watch mode

Files in this folder:
- `index.html` — the page that loads `dist/index.js` as an ES module
- `src/index.ts` — TypeScript source that handles the form and DOM updates
- `styles.css` — base styling
- `tsconfig.json` — TypeScript config (rootDir `src`, outDir `dist`)
- `package.json` — scripts: `build`, `watch`, `serve`, `dev`

Setup and run

```bash
# from this folder
npm install

# start dev (compile watch + serve)
npm run dev

# or compile only
npm run build

# then open dist/index.html in the browser (serve required for module imports)
```

Notes
- `npm run dev` runs two processes: the TypeScript compiler in watch mode and `live-server` that serves the `dist` folder and reloads the browser on changes.
- Edit `src/index.ts` and the compiler will recompile into `dist/index.js`. The page will refresh automatically.


Exercise: Add a "Special Ability" field
-------------------------------------
Follow these steps to extend the form and TypeScript model. This is a short exercise to show how adding a field in HTML requires small, type-safe changes in TypeScript.

1) Update the HTML
Open `index.html` and add a new input inside the form (example placed before the actions div):

```html
<label>Special Ability: <input name="ability" /></label>
```

2) Update the Character model
Open `src/index.ts` and update the `Character` class to accept the new field. Change the constructor signature to include `ability?: string` and store it as a public property. For example:

```ts
class Character {
	constructor(public name: string, public cls: string, public age?: number, public ability?: string) {}
}
```

3) Read the new field from the form
In `src/index.ts` where you read FormData, get `ability` and pass it into the Character constructor:

```ts
const ability = (data.get('ability') || '').toString().trim() || undefined;
const character = new Character(name, cls, age, ability);
```

4) Render the ability in the card
Update `createCard` so the ability is shown (and only when present):

```ts
el.innerHTML = `
	<h3>${escapeHtml(c.name)}</h3>
	<p><strong>Class:</strong> ${escapeHtml(c.cls)}</p>
	<p><strong>Age:</strong> ${c.age ?? '—'}</p>
	${c.ability ? `<p><strong>Ability:</strong> ${escapeHtml(c.ability)}</p>` : ''}
`;
```

5) Rebuild and test
Run the dev script to watch and serve:

```bash
npm run dev
```

Open the page and submit a character with a special ability. Confirm it appears on the card.

Optional: Add TypeScript type checks
- If you want stricter typing, add a readonly property or a method on `Character` that returns a display string for the ability.

This exercise reinforces how small HTML additions require minor TypeScript model updates and safe reading of form data.


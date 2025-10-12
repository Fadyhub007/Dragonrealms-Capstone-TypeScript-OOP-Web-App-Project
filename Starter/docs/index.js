"use strict";
// Character class models a player character with name, class (cls), and optional age.
// Using a class allows us to create instances with `new Character(...)` and
// to later add methods or computed properties if needed.
class Character {
    constructor(name, cls, age, ability) {
        this.name = name;
        this.cls = cls;
        this.age = age;
        this.ability = ability;
    }
}
// Grab DOM elements: the form where users enter character data, and the
// container where created character cards will be inserted.
const form = document.getElementById('char-form');
const list = document.getElementById('characters');
// createCard - given a Character instance, build a DOM node representing it.
// We escape user-provided text to avoid accidental HTML injection.
function createCard(c) {
    const el = document.createElement('div');
    el.className = 'character';
    el.innerHTML = `
	<h3>${escapeHtml(c.name)}</h3>
	<p><strong>Class:</strong> ${escapeHtml(c.cls)}</p>
	<p><strong>Age:</strong> ${c.age ?? '—'}</p>
	${c.ability ? `<p><strong>Ability:</strong> ${escapeHtml(c.ability)}</p>` : ''}
`;
    return el;
}
// escapeHtml - a small helper that replaces special HTML characters with
// their entity equivalents. This keeps the UI safe if users paste markup.
function escapeHtml(s) {
    // replaceAll requires ES2021+; if your tsconfig target is lower, use a
    // polyfill or a simple replace with regex.
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
// Wire up the form submit flow: when the user submits the form we:
// 1. prevent the browser's default navigation
// 2. read the form values using FormData
// 3. validate required fields (name and class)
// 4. create a Character instance
// 5. render a card and prepend it to the characters list
// 6. reset the form for the next entry
if (form && list) {
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const data = new FormData(form);
        // Read values safely and trim whitespace
        const name = (data.get('name') || '').toString().trim();
        const cls = (data.get('class') || '').toString().trim();
        const ageRaw = data.get('age');
        const age = ageRaw ? Number(ageRaw) : undefined;
        const ability = (data.get('ability') || '').toString().trim() || undefined;
        // Basic validation: require a name and class
        if (!name || !cls) {
            alert('Please enter a name and class');
            return;
        }
        // Instantiate a Character and render it
        const character = new Character(name, cls, age, ability);
        const card = createCard(character);
        list.prepend(card);
        // Clear the form so the user can add another character quickly
        form.reset();
    });
}

/* ============================================================
   Task 7 — Student Data (JSON)
   JSON.stringify, JSON.parse, Destructuring, forEach, map
   ============================================================ */

// Student objects
const students = [
    { id: 'STU-301', name: 'Hamdan Ali', gpa: 3.72, skills: ['JavaScript', 'React', 'Node.js'] },
    { id: 'STU-302', name: 'Kiran Nawaz', gpa: 3.85, skills: ['Python', 'Django', 'PostgreSQL'] },
    { id: 'STU-303', name: 'Danish Rauf', gpa: 3.60, skills: ['Java', 'Spring Boot', 'MongoDB'] }
];

// ── JSON.stringify ─────────────────────────────────────────
const jsonString = JSON.stringify(students, null, 2);
document.getElementById('jsonRaw').textContent = jsonString;

// ── JSON.parse & Destructuring ─────────────────────────────
const parsed = JSON.parse(jsonString);
const [first, second, third] = parsed;
const { name: firstName, gpa: firstGpa } = first;
const { name: secondName, gpa: secondGpa } = second;
const { name: thirdName, gpa: thirdGpa } = third;

document.getElementById('jsonParsed').innerHTML =
    `<span class="key">// Destructured from parsed JSON</span>\n\n` +
    `First:  <span class="str">${firstName}</span>  GPA: <span class="num">${firstGpa}</span>\n` +
    `Second: <span class="str">${secondName}</span>  GPA: <span class="num">${secondGpa}</span>\n` +
    `Third:  <span class="str">${thirdName}</span>   GPA: <span class="num">${thirdGpa}</span>`;

// ── forEach: render cards ──────────────────────────────────
const cardsEl = document.getElementById('cards');
let cardsHtml = '';

parsed.forEach(student => {
    const chips = student.skills.map(s => `<span>${s}</span>`).join('');
    cardsHtml += `
        <div class="card">
            <h3>${student.name}</h3>
            <p class="sub">${student.id} &middot; GPA: ${student.gpa}</p>
            <div class="tags">${chips}</div>
        </div>`;
});
cardsEl.innerHTML = cardsHtml;

// ── map: create summary strings ────────────────────────────
const summaries = parsed.map(s => `${s.name} (${s.id}) — GPA: ${s.gpa} — ${s.skills.length} skills`);
document.getElementById('mapped').innerHTML = summaries.map(s => `<p><strong>&rarr;</strong> ${s}</p>`).join('');

// Console
console.log('--- JSON Student Data ---');
console.log('Stringified:', jsonString);
console.log('Parsed:', parsed);
console.log('Destructured first:', firstName, firstGpa);
console.log('Mapped summaries:', summaries);

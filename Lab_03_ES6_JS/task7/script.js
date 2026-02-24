// ========================================
// Lab Task 7: Student Data Using JSON
// JSON.stringify, JSON.parse, Destructuring, forEach/map
// ========================================

// ---------- Step 1: Create 3 student objects ----------
const student1 = { name: "Ali Ahmed", age: 21, semester: "6th", courses: ["JavaScript", "React", "HTML"] };
const student2 = { name: "Hassan Khan", age: 20, semester: "4th", courses: ["Python", "Data Structures", "OOP"] };
const student3 = { name: "Sara Malik", age: 22, semester: "5th", courses: ["Node.js", "MongoDB", "Express"] };

const students = [student1, student2, student3];

// ---------- Step 2: Convert objects to JSON using JSON.stringify() ----------
const jsonString = JSON.stringify(students, null, 2);

// ---------- Step 3: Convert JSON back to objects using JSON.parse() ----------
const parsedStudents = JSON.parse(jsonString);

// ---------- Display results in HTML ----------
const output = document.getElementById("output");
let html = "";

// Card 1: JSON String Output
html += `
    <div class="card">
        <h2>Step 1 & 2: Objects → JSON.stringify()</h2>
        <p><span class="label">JSON String:</span></p>
        <div class="json-block">${jsonString}</div>
    </div>
`;

// Card 2: Parsed back from JSON
html += `
    <div class="card">
        <h2>Step 3: JSON.parse() → Back to Objects</h2>
        <p><span class="label">Parsed Successfully!</span> ${parsedStudents.length} students recovered.</p>
    </div>
`;

// ---------- Step 4 & 5 & 6: Destructuring + forEach/map + innerHTML ----------
// Using .map() to loop through students and build cards
const studentCards = parsedStudents.map(function (student) {
    // Step 4: Destructuring to extract properties
    const { name, age, semester, courses } = student;

    const courseTags = courses.map(c => `<span class="course-tag">${c}</span>`).join(" ");

    return `
        <div class="card">
            <div class="student-row">
                <p><span class="label">Name:</span> ${name}</p>
                <p><span class="label">Age:</span> ${age}</p>
                <p><span class="label">Semester:</span> ${semester}</p>
                <p><span class="label">Courses:</span> ${courseTags}</p>
            </div>
        </div>
    `;
}).join("");

html += `
    <div class="card">
        <h2>Step 4, 5 & 6: Destructuring + map() + innerHTML</h2>
        <p><span class="label">All Students Displayed Below:</span></p>
    </div>
`;

html += studentCards;

// Step 6 bonus: forEach example
html += `<div class="card"><h2>forEach() Loop Output</h2>`;
parsedStudents.forEach(function (student) {
    const { name, semester } = student;
    html += `<p><span class="label">${name}</span> — Semester: ${semester}</p>`;
});
html += `</div>`;

// Step 5: Display all using innerHTML
output.innerHTML = html;

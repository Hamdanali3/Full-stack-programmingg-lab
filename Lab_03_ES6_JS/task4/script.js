// ========================================
// Lab Task 4: Unique Course Registration System
// Using ES6 Set and for...of
// ========================================

// ---------- Create a Set to store registered courses ----------
const registeredCourses = new Set();

// ---------- Add courses dynamically ----------
registeredCourses.add("JavaScript");
registeredCourses.add("HTML");
registeredCourses.add("CSS");
registeredCourses.add("React");
registeredCourses.add("Node.js");

// ---------- Attempt adding duplicate courses ----------
const duplicateAttempts = ["JavaScript", "HTML", "React"];
const duplicateResults = [];

duplicateAttempts.forEach(function (course) {
    const sizeBefore = registeredCourses.size;
    registeredCourses.add(course); // Set ignores duplicates
    const sizeAfter = registeredCourses.size;

    if (sizeBefore === sizeAfter) {
        duplicateResults.push(course);
    }
});

// ---------- Loop through Set using for...of ----------
let courseListHTML = "";
for (const course of registeredCourses) {
    courseListHTML += `<span class="course-tag">${course}</span> `;
}

// ---------- Display results in HTML ----------
const output = document.getElementById("output");

let html = "";

// Card 1: All Registered Courses
html += `
    <div class="card">
        <h2>All Registered Courses (for...of loop)</h2>
        <p><span class="label">Total Unique Courses (.size):</span> ${registeredCourses.size}</p>
        <p>${courseListHTML}</p>
    </div>
`;

// Card 2: Duplicate Attempts
html += `
    <div class="card">
        <h2>Duplicate Registration Attempts</h2>
        <p><span class="label">Attempted Duplicates:</span></p>
        <p>${duplicateAttempts.map(c => `<span class="course-tag">${c}</span>`).join(" ")}</p>
        <p class="duplicate">These courses were already registered. Set prevented duplicates!</p>
        <p><span class="label">Total Courses After Duplicates:</span> ${registeredCourses.size} (unchanged)</p>
    </div>
`;

// Card 3: Checking if a course exists
const checkCourse = "React";
html += `
    <div class="card">
        <h2>Check Course Existence</h2>
        <p><span class="label">Has "${checkCourse}"?</span> ${registeredCourses.has(checkCourse) ? "Yes" : "No"}</p>
        <p><span class="label">Has "Python"?</span> ${registeredCourses.has("Python") ? "Yes" : "No"}</p>
    </div>
`;

output.innerHTML = html;

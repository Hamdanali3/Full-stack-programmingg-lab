// ========================================
// Lab Task 4: Unique Course Registration System
// Using ES6 Set and for...of
// ========================================

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
    registeredCourses.add(course);
    if (sizeBefore === registeredCourses.size) {
        duplicateResults.push(course);
    }
});

// ---------- Loop through Set using for...of ----------
let courseListHTML = "";
for (const course of registeredCourses) {
    courseListHTML += `<span class="course-tag"><i class="fas fa-bookmark"></i> ${course}</span>`;
}

// ---------- Display results ----------
const output = document.getElementById("output");

let html = `
    <div class="card">
        <h2><i class="fas fa-list-check"></i> Registered Courses (for...of)</h2>
        <p><span class="label">Total Unique Courses (.size):</span>
           <span class="badge"><i class="fas fa-hashtag"></i> ${registeredCourses.size}</span>
        </p>
        <div class="tag-container">${courseListHTML}</div>
    </div>

    <div class="card">
        <h2><i class="fas fa-ban"></i> Duplicate Attempts</h2>
        <p><span class="label">Tried to Add:</span></p>
        <div class="tag-container">
            ${duplicateAttempts.map(c => `<span class="course-tag">${c}</span>`).join("")}
        </div>
        <div class="duplicate">
            <i class="fas fa-triangle-exclamation"></i>
            These courses already exist — Set prevented duplicates!
        </div>
        <p style="margin-top:12px"><span class="label">Count After Attempts:</span>
           <span class="badge"><i class="fas fa-hashtag"></i> ${registeredCourses.size} (unchanged)</span>
        </p>
    </div>

    <div class="card">
        <h2><i class="fas fa-magnifying-glass"></i> Check Course Existence</h2>
        <p><span class="label">Has "React"?</span>
           <span class="value">${registeredCourses.has("React") ? '<i class="fas fa-circle-check" style="color:#00e676"></i> Yes' : '<i class="fas fa-circle-xmark" style="color:#ff6b6b"></i> No'}</span>
        </p>
        <p><span class="label">Has "Python"?</span>
           <span class="value">${registeredCourses.has("Python") ? '<i class="fas fa-circle-check" style="color:#00e676"></i> Yes' : '<i class="fas fa-circle-xmark" style="color:#ff6b6b"></i> No'}</span>
        </p>
    </div>
`;

output.innerHTML = html;

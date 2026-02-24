// ========================================
// Lab Task 7: Student Data Using JSON
// JSON.stringify, JSON.parse, Destructuring, forEach/map
// ========================================

// ---------- Step 1: Create 3 student objects ----------
const student1 = { name: "Ali Ahmed", age: 21, semester: "6th", courses: ["JavaScript", "React", "HTML"] };
const student2 = { name: "Hassan Khan", age: 20, semester: "4th", courses: ["Python", "Data Structures", "OOP"] };
const student3 = { name: "Sara Malik", age: 22, semester: "5th", courses: ["Node.js", "MongoDB", "Express"] };

const students = [student1, student2, student3];

// ---------- Step 2: JSON.stringify() ----------
const jsonString = JSON.stringify(students, null, 2);

// ---------- Step 3: JSON.parse() ----------
const parsedStudents = JSON.parse(jsonString);

// ---------- Display results ----------
const output = document.getElementById("output");
const getInitials = (n) => n.split(" ").map(w => w[0]).join("");

let html = `
    <div class="card">
        <span class="step-label"><i class="fas fa-1"></i> Step 1 & 2</span>
        <h2><i class="fas fa-file-code"></i> Objects → JSON.stringify()</h2>
        <p><span class="label">Converted ${students.length} student objects to JSON string:</span></p>
        <div class="json-block">${jsonString}</div>
    </div>

    <div class="card">
        <span class="step-label"><i class="fas fa-3"></i> Step 3</span>
        <h2><i class="fas fa-file-import"></i> JSON.parse() → Back to Objects</h2>
        <p><span class="label">Status:</span>
           <span class="value" style="color:#00e676"><i class="fas fa-circle-check"></i> Parsed successfully!</span></p>
        <p><span class="label">Students Recovered:</span> <span class="value">${parsedStudents.length}</span></p>
    </div>
`;

// ---------- Step 4, 5 & 6: Destructuring + map + innerHTML ----------
const studentCards = parsedStudents.map(function (student) {
    const { name, age, semester, courses } = student;
    const courseTags = courses.map(c => `<span class="course-tag"><i class="fas fa-bookmark"></i> ${c}</span>`).join("");

    return `
        <div class="card">
            <div class="student-row">
                <div class="avatar">${getInitials(name)}</div>
                <div>
                    <p><span class="value" style="font-size:1.1rem;font-weight:600">${name}</span></p>
                    <p><span class="label"><i class="fas fa-birthday-cake"></i> Age:</span> <span class="value">${age}</span>
                       &nbsp;&nbsp;
                       <span class="label"><i class="fas fa-calendar"></i> Semester:</span> <span class="value">${semester}</span></p>
                    <p><span class="label"><i class="fas fa-book"></i> Courses:</span></p>
                    <div style="margin-top:6px">${courseTags}</div>
                </div>
            </div>
        </div>
    `;
}).join("");

html += `
    <div class="card">
        <span class="step-label"><i class="fas fa-4"></i> Step 4, 5 & 6</span>
        <h2><i class="fas fa-users"></i> Destructuring + map() + innerHTML</h2>
        <p><span class="label">All ${parsedStudents.length} students displayed using ES6 features:</span></p>
    </div>
`;

html += studentCards;

// forEach bonus
html += `
    <div class="card">
        <span class="step-label"><i class="fas fa-arrows-spin"></i> Bonus</span>
        <h2><i class="fas fa-rotate"></i> forEach() Loop Summary</h2>
`;
parsedStudents.forEach(function (student) {
    const { name, semester } = student;
    html += `
        <p><span class="value"><i class="fas fa-user"></i> ${name}</span>
           <span class="label"> — Semester: ${semester}</span></p>
    `;
});
html += `</div>`;

output.innerHTML = html;

// ========================================
// Lab Task 6: Mini University Portal
// Combining Class + Map + Set + Promise
// ========================================

const output = document.getElementById("output");

// ---------- 1. Class: Student ----------
class Student {
    constructor(id, name, semester) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = new Set(); // Each student has a Set of courses (no duplicates)
    }

    // Register a course using Set
    registerCourse(course) {
        this.courses.add(course);
    }

    // Get courses as HTML tags
    getCourseTags() {
        let tags = "";
        for (const course of this.courses) {
            tags += `<span class="course-tag">${course}</span> `;
        }
        return tags;
    }
}

// ---------- 2. Map: Store students ----------
const studentMap = new Map();

// Create student objects using Class
const s1 = new Student(101, "Ali Ahmed", "6th");
s1.registerCourse("JavaScript");
s1.registerCourse("React");
s1.registerCourse("HTML");
s1.registerCourse("JavaScript"); // Duplicate — Set will ignore

const s2 = new Student(102, "Hassan Khan", "4th");
s2.registerCourse("Python");
s2.registerCourse("Data Structures");
s2.registerCourse("OOP");

const s3 = new Student(103, "Sara Malik", "5th");
s3.registerCourse("Node.js");
s3.registerCourse("MongoDB");
s3.registerCourse("Express");
s3.registerCourse("Node.js"); // Duplicate — Set will ignore

// Store students in Map (Key = ID, Value = Student object)
studentMap.set(s1.id, s1);
studentMap.set(s2.id, s2);
studentMap.set(s3.id, s3);

// ---------- 3. Display students from Map ----------
let html = `
    <div class="card">
        <h2>All Students (Map + Class + Set)</h2>
        <p><span class="label">Total Students (.size):</span> ${studentMap.size}</p>
    </div>
`;

studentMap.forEach(function (student, id) {
    html += `
        <div class="card">
            <div class="student-row">
                <p><span class="label">ID:</span> ${id}</p>
                <p><span class="label">Name:</span> ${student.name}</p>
                <p><span class="label">Semester:</span> ${student.semester}</p>
                <p><span class="label">Courses (Set — ${student.courses.size} unique):</span></p>
                <p>${student.getCourseTags()}</p>
            </div>
        </div>
    `;
});

output.innerHTML = html;

// ---------- 4. Promise: Simulate saving data to server ----------
output.innerHTML += `<p class="loading">Saving data to server... please wait 2 seconds...</p>`;

function saveToServer(data) {
    return new Promise(function (resolve, reject) {
        const isConnected = true; // Change to false to see error
        setTimeout(function () {
            if (isConnected) {
                resolve(`Successfully saved ${data.size} students to the server!`);
            } else {
                reject("Connection failed! Could not save data.");
            }
        }, 2000);
    });
}

saveToServer(studentMap)
    .then(function (message) {
        // Remove the loading message and add success card
        const loadingEl = output.querySelector(".loading");
        if (loadingEl) loadingEl.remove();

        output.innerHTML += `
            <div class="card">
                <h2>Server Response (Promise)</h2>
                <p class="success">${message}</p>
            </div>
        `;
    })
    .catch(function (error) {
        const loadingEl = output.querySelector(".loading");
        if (loadingEl) loadingEl.remove();

        output.innerHTML += `
            <div class="card">
                <h2>Server Response (Promise)</h2>
                <p class="error">${error}</p>
            </div>
        `;
    });

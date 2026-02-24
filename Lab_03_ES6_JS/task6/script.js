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
        this.courses = new Set();
    }

    registerCourse(course) {
        this.courses.add(course);
    }

    getInitials() {
        return this.name.split(" ").map(w => w[0]).join("");
    }

    getCourseTags() {
        let tags = "";
        for (const course of this.courses) {
            tags += `<span class="course-tag"><i class="fas fa-bookmark"></i> ${course}</span>`;
        }
        return tags;
    }
}

// ---------- 2. Map: Store students ----------
const studentMap = new Map();

const s1 = new Student(101, "Ali Ahmed", "6th");
s1.registerCourse("JavaScript");
s1.registerCourse("React");
s1.registerCourse("HTML");
s1.registerCourse("JavaScript"); // Duplicate — Set ignores

const s2 = new Student(102, "Hassan Khan", "4th");
s2.registerCourse("Python");
s2.registerCourse("Data Structures");
s2.registerCourse("OOP");

const s3 = new Student(103, "Sara Malik", "5th");
s3.registerCourse("Node.js");
s3.registerCourse("MongoDB");
s3.registerCourse("Express");
s3.registerCourse("Node.js"); // Duplicate — Set ignores

studentMap.set(s1.id, s1);
studentMap.set(s2.id, s2);
studentMap.set(s3.id, s3);

// ---------- 3. Display students ----------
let html = `
    <div class="card">
        <h2><i class="fas fa-users"></i> All Students</h2>
        <p><span class="label">Total Students (Map .size):</span>
           <span class="badge"><i class="fas fa-hashtag"></i> ${studentMap.size}</span></p>
    </div>
`;

studentMap.forEach(function (student, id) {
    html += `
        <div class="card">
            <div class="student-row">
                <div class="avatar">${student.getInitials()}</div>
                <div>
                    <p><span class="value" style="font-size:1.1rem;font-weight:600">${student.name}</span></p>
                    <p><span class="label"><i class="fas fa-id-badge"></i> ID:</span> <span class="value">${id}</span>
                       &nbsp;&nbsp;
                       <span class="label"><i class="fas fa-calendar"></i> Semester:</span> <span class="value">${student.semester}</span></p>
                    <p><span class="label"><i class="fas fa-book"></i> Courses (Set — ${student.courses.size} unique):</span></p>
                    <div style="margin-top:6px">${student.getCourseTags()}</div>
                </div>
            </div>
        </div>
    `;
});

output.innerHTML = html;

// ---------- 4. Promise: Simulate saving ----------
output.innerHTML += `
    <div class="loading" id="loading-msg">
        <i class="fas fa-spinner fa-spin"></i>
        Saving data to server... please wait...
    </div>`;

function saveToServer(data) {
    return new Promise(function (resolve, reject) {
        const isConnected = true;
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
        const loadingEl = document.getElementById("loading-msg");
        if (loadingEl) loadingEl.remove();

        output.innerHTML += `
            <div class="card" style="animation-delay:0.2s">
                <h2><i class="fas fa-server"></i> Server Response (Promise)</h2>
                <div class="success-banner">
                    <i class="fas fa-circle-check"></i> ${message}
                </div>
            </div>
        `;
    })
    .catch(function (error) {
        const loadingEl = document.getElementById("loading-msg");
        if (loadingEl) loadingEl.remove();

        output.innerHTML += `
            <div class="card">
                <h2><i class="fas fa-server"></i> Server Response (Promise)</h2>
                <div class="error-banner">
                    <i class="fas fa-circle-xmark"></i> ${error}
                </div>
            </div>
        `;
    });

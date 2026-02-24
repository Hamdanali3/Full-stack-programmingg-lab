// ========================================
// Lab Task 1: Student Management System
// Using ES6 Classes, let, const, Template Literals
// ========================================

// ---------- ES6 Class ----------
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }

    // Get initials for avatar
    getInitials() {
        return this.name.split(" ").map(w => w[0]).join("");
    }

    // Method to return a styled HTML card using template literals
    getCard() {
        const courseItems = this.courses
            .map(course => `<li>${course}</li>`)
            .join("");

        return `
            <div class="student-card">
                <div class="avatar">${this.getInitials()}</div>
                <h2>${this.name}</h2>
                <div class="info-row">
                    <i class="fas fa-id-badge"></i>
                    <span class="label">ID:</span>
                    <span class="value">${this.id}</span>
                </div>
                <div class="info-row">
                    <i class="fas fa-calendar-alt"></i>
                    <span class="label">Semester:</span>
                    <span class="value">${this.semester}</span>
                </div>
                <div class="info-row">
                    <i class="fas fa-book"></i>
                    <span class="label">Courses:</span>
                </div>
                <ul class="courses-list">${courseItems}</ul>
            </div>
        `;
    }
}

// ---------- Creating Student Objects (using let & const) ----------
const student1 = new Student(101, "Ali Ahmed", "6th", ["JavaScript", "HTML", "CSS", "React"]);
const student2 = new Student(102, "Hassan Khan", "4th", ["Python", "Data Structures", "OOP"]);
const student3 = new Student(103, "Sara Malik", "5th", ["Node.js", "MongoDB", "Express"]);

// Storing in array using const
const students = [student1, student2, student3];

// ---------- Displaying Students Dynamically ----------
let htmlOutput = "";

for (let i = 0; i < students.length; i++) {
    htmlOutput += students[i].getCard();
}

document.getElementById("students-container").innerHTML = htmlOutput;

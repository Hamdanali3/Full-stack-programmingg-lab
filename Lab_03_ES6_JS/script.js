// ========================================
// Lab Task 1: Student Management System
// Using ES6 Classes, let, const, Template Literals
// ========================================

// ---------- ES6 Class ----------
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;           // const-like property (won't reassign)
        this.name = name;
        this.semester = semester;
        this.courses = courses; // array of courses
    }

    // Method to return an HTML card using template literals
    getCard() {
        const courseItems = this.courses
            .map(course => `<li>${course}</li>`)
            .join("");

        return `
            <div class="student-card">
                <h2>${this.name}</h2>
                <p><span class="label">ID:</span> ${this.id}</p>
                <p><span class="label">Semester:</span> ${this.semester}</p>
                <p><span class="label">Courses:</span></p>
                <ul class="courses-list">${courseItems}</ul>
            </div>
        `;
    }
}

// ---------- Creating Student Objects (using let & const) ----------

const student1 = new Student(101, "Ali Ahmed", "6th", ["JavaScript", "HTML", "CSS", "React"]);
const student2 = new Student(102, "Hassan Khan", "4th", ["Python", "Data Structures", "OOP"]);
const student3 = new Student(103, "Sara Malik", "5th", ["Node.js", "MongoDB", "Express"]);

// Storing all students in an array using const (reference won't change)
const students = [student1, student2, student3];

// ---------- Displaying Students Dynamically ----------

// Using let for block-scoped variable
let htmlOutput = "";

for (let i = 0; i < students.length; i++) {
    htmlOutput += students[i].getCard();
}

// Render all student cards into the container using innerHTML
document.getElementById("students-container").innerHTML = htmlOutput;

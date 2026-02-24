/* ============================================================
   Task 1 — Student Management System
   ES6 Classes, let/const, template literals, dynamic rendering
   ============================================================ */

class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }

    getInitials() {
        const parts = this.name.trim().split(' ');
        return parts.map(p => p[0]).join('').toUpperCase();
    }

    render() {
        const courseChips = this.courses
            .map(c => `<span>${c}</span>`)
            .join('');

        return `
        <div class="card">
            <div class="avatar">${this.getInitials()}</div>
            <h3>${this.name}</h3>
            <div class="meta">
                <div class="meta-row"><span class="k">ID</span><span class="v">${this.id}</span></div>
                <div class="meta-row"><span class="k">Semester</span><span class="v">${this.semester}</span></div>
                <div class="meta-row"><span class="k">Courses</span><span class="v">${this.courses.length}</span></div>
            </div>
            <div class="tags">${courseChips}</div>
        </div>`;
    }
}

// Student data
const students = [
    new Student('STU-2024-001', 'Hamdan Ali', '6th', ['Web Development', 'Database Systems', 'Software Engineering']),
    new Student('STU-2024-002', 'Sara Ahmed', '5th', ['Data Structures', 'Operating Systems']),
    new Student('STU-2024-003', 'Bilal Khan', '6th', ['Machine Learning', 'Web Development', 'Cloud Computing']),
    new Student('STU-2024-004', 'Fatima Noor', '4th', ['Computer Networks', 'Algorithms']),
    new Student('STU-2024-005', 'Omar Raza', '6th', ['Cyber Security', 'Web Development', 'DevOps'])
];

// Render to DOM
const app = document.getElementById('app');
app.innerHTML = students.map(s => s.render()).join('');

// Console log
console.log('--- Student Management System ---');
students.forEach(s => {
    console.log(`${s.name} | Sem: ${s.semester} | Courses: ${s.courses.join(', ')}`);
});

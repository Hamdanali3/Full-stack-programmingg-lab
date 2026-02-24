/* ============================================================
   Task 6 — Mini University Portal
   Combines ES6 Classes, Map, Set, Promises
   ============================================================ */

const statusEl = document.getElementById('status');
const appEl = document.getElementById('app');

// ── ES6 Class ──────────────────────────────────────────────
class Student {
    constructor(id, name, department, courses) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.courses = courses;
    }

    getInitials() {
        return this.name.split(' ').map(w => w[0]).join('');
    }
}

// ── Student Map (key = student ID) ─────────────────────────
const studentMap = new Map();

studentMap.set('UNI-001', new Student('UNI-001', 'Hamdan Ali', 'Computer Science', ['Web Development', 'Database Systems', 'AI Fundamentals']));
studentMap.set('UNI-002', new Student('UNI-002', 'Mahnoor Tariq', 'Software Engineering', ['Software Design', 'Web Development', 'Testing']));
studentMap.set('UNI-003', new Student('UNI-003', 'Zain Abbas', 'Computer Science', ['Data Structures', 'Algorithms', 'Operating Systems']));
studentMap.set('UNI-004', new Student('UNI-004', 'Rimsha Khalid', 'Data Science', ['Machine Learning', 'Statistics', 'Database Systems']));
studentMap.set('UNI-005', new Student('UNI-005', 'Ali Hassan', 'Cyber Security', ['Network Security', 'Cryptography', 'Web Development']));

// ── Unique courses using Set ───────────────────────────────
function getUniqueCourses() {
    const courseSet = new Set();
    for (const [, student] of studentMap) {
        student.courses.forEach(c => courseSet.add(c));
    }
    return courseSet;
}

// ── Promise-based data loading ─────────────────────────────
function fetchPortalData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                students: studentMap,
                courses: getUniqueCourses()
            });
        }, 2000);
    });
}

function loadPortal() {
    statusEl.innerHTML = '<div class="spinner"></div> Loading university data...';
    appEl.innerHTML = '';

    fetchPortalData().then(data => {
        statusEl.innerHTML = `Loaded <strong>${data.students.size}</strong> students and <strong>${data.courses.size}</strong> unique courses.`;
        statusEl.style.color = '#059669';

        let html = '';

        // Stats
        const depts = new Set([...data.students.values()].map(s => s.department));
        html += `<div class="stats-row">
            <div class="stat"><div class="val">${data.students.size}</div><div class="lbl">Students</div></div>
            <div class="stat"><div class="val">${data.courses.size}</div><div class="lbl">Unique Courses</div></div>
            <div class="stat"><div class="val">${depts.size}</div><div class="lbl">Departments</div></div>
        </div>`;

        // Student cards
        html += '<div class="section-title">Enrolled Students</div><div class="grid">';
        for (const [id, s] of data.students) {
            const chips = s.courses.map(c => `<span>${c}</span>`).join('');
            html += `<div class="card">
                <h3>${s.name}</h3>
                <p class="sub">${id} &middot; ${s.department}</p>
                <div class="course-chips">${chips}</div>
            </div>`;
        }
        html += '</div>';

        // Unique courses
        html += '<div class="section-title">All Unique Courses (Set)</div><div class="unique-list">';
        for (const course of data.courses) {
            html += `<span class="item">${course}</span>`;
        }
        html += '</div>';

        appEl.innerHTML = html;
    });
}

console.log('--- University Portal Ready ---');

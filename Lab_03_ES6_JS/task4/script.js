/* ============================================================
   Task 4 — Unique Course Registration
   ES6 Set, duplicate detection, for...of, .size
   ============================================================ */

const courseSet = new Set();
const listEl = document.getElementById('courseList');
const sizeEl = document.getElementById('size');
const feedbackEl = document.getElementById('feedback');
const inputEl = document.getElementById('courseInput');

// Pre-register some courses for Hamdan Ali
const initialCourses = [
    'Web Development',
    'Database Systems',
    'Software Engineering',
    'Data Structures'
];
initialCourses.forEach(c => courseSet.add(c));
renderList();

function registerCourse() {
    const val = inputEl.value.trim();
    if (!val) return;

    if (courseSet.has(val)) {
        showFeedback(`"${val}" is already registered — duplicates are not allowed.`, '#dc2626');
    } else {
        courseSet.add(val);
        showFeedback(`"${val}" registered successfully.`, '#059669');
        renderList();
    }
    inputEl.value = '';
    inputEl.focus();
}

function renderList() {
    let html = '';
    let idx = 1;
    for (const course of courseSet) {
        html += `<li><span class="num">${idx}</span>${course}</li>`;
        idx++;
    }
    listEl.innerHTML = html || '<li style="color:#6b7280;font-style:italic;">No courses registered yet.</li>';
    sizeEl.textContent = courseSet.size;
    console.log(`Set size: ${courseSet.size} | Courses:`, [...courseSet]);
}

function showFeedback(msg, color) {
    feedbackEl.textContent = msg;
    feedbackEl.style.color = color;
    clearTimeout(feedbackEl._timer);
    feedbackEl._timer = setTimeout(() => { feedbackEl.textContent = ''; }, 3000);
}

// Press Enter to register
inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') registerCourse();
});

console.log('--- Course Registration Ready ---');

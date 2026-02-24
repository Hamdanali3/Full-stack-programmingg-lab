/* ============================================================
   Task 3 — Async Data Loader
   Promises, setTimeout, .then() / .catch(), DOM rendering
   ============================================================ */

const statusEl = document.getElementById('status');
const appEl = document.getElementById('app');

// Simulated user database
const usersDB = [
    { id: 1, name: 'Hamdan Ali', email: 'hamdan.ali@mail.com', role: 'Full-Stack Developer' },
    { id: 2, name: 'Ayesha Siddiqui', email: 'ayesha.s@mail.com', role: 'UI/UX Designer' },
    { id: 3, name: 'Usman Ghani', email: 'usman.ghani@mail.com', role: 'Backend Engineer' },
    { id: 4, name: 'Hira Bukhari', email: 'hira.b@mail.com', role: 'Data Analyst' }
];

// Promise-based fetch simulation
function fetchUsers(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject('Network Error: Unable to reach the server.');
            } else {
                resolve(usersDB);
            }
        }, 2500);
    });
}

// Load users on button click
function loadUsers(fail) {
    appEl.innerHTML = '';
    statusEl.innerHTML = '<div class="spinner"></div> Fetching data, please wait...';

    fetchUsers(fail)
        .then(users => {
            statusEl.textContent = `Loaded ${users.length} users successfully.`;
            statusEl.style.color = '#059669';

            appEl.innerHTML = users.map(u => `
                <div class="user-card" style="transform: translateY(8px);">
                    <h3>${u.name}</h3>
                    <p class="detail">${u.role}</p>
                    <p class="detail">${u.email}</p>
                </div>
            `).join('');
        })
        .catch(err => {
            statusEl.textContent = '';
            statusEl.style.color = '';
            appEl.innerHTML = `<div class="error-box">${err}</div>`;
        });
}

console.log('--- Async Data Loader Ready ---');

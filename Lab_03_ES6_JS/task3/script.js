// ========================================
// Lab Task 3: Asynchronous Data Loader
// Using Promises, setTimeout, .then(), .catch()
// ========================================

const output = document.getElementById("output");

// Show loading animation
output.innerHTML = `
    <div class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        Loading users... please wait 3 seconds...
    </div>`;

// ---------- Boolean flag to simulate success/failure ----------
const isServerOnline = true; // Change to false to see reject/error

// ---------- Promise-based fetchUsers ----------
function fetchUsers() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (isServerOnline) {
                resolve([
                    { id: 1, name: "Ali Ahmed", email: "ali@example.com", role: "Student" },
                    { id: 2, name: "Hassan Khan", email: "hassan@example.com", role: "Admin" },
                    { id: 3, name: "Sara Malik", email: "sara@example.com", role: "Student" },
                    { id: 4, name: "Fatima Noor", email: "fatima@example.com", role: "Teacher" }
                ]);
            } else {
                reject("Server is offline. Failed to fetch users!");
            }
        }, 3000);
    });
}

// ---------- .then() and .catch() ----------
fetchUsers()
    .then(function (users) {
        const getInitials = (n) => n.split(" ").map(w => w[0]).join("");
        const roleIcon = { Student: "fa-user-graduate", Admin: "fa-user-shield", Teacher: "fa-chalkboard-teacher" };

        let html = `
            <div class="card">
                <h2><i class="fas fa-check-circle"></i> Users Loaded Successfully</h2>
                <p><span class="label">Total Users:</span> <span class="value">${users.length}</span></p>
                <p class="success"><i class="fas fa-server"></i> Server responded in 3 seconds</p>
            </div>
        `;

        users.forEach(function (user) {
            html += `
                <div class="card">
                    <div class="user-row">
                        <div class="user-avatar">${getInitials(user.name)}</div>
                        <div class="user-info">
                            <p><span class="label">Name:</span> <span class="value">${user.name}</span></p>
                            <p><span class="label">Email:</span> <span class="value">${user.email}</span></p>
                            <p><span class="label">Role:</span> <span class="value"><i class="fas ${roleIcon[user.role] || 'fa-user'}"></i> ${user.role}</span></p>
                        </div>
                    </div>
                </div>
            `;
        });

        output.innerHTML = html;
    })
    .catch(function (error) {
        output.innerHTML = `
            <div class="card">
                <h2 class="error"><i class="fas fa-exclamation-triangle"></i> Error Loading Data</h2>
                <p class="error">${error}</p>
            </div>
        `;
    });

// ========================================
// Lab Task 3: Asynchronous Data Loader
// Using Promises, setTimeout, .then(), .catch()
// ========================================

const output = document.getElementById("output");

// Show loading message
output.innerHTML = `<p class="loading">Loading users... please wait 3 seconds...</p>`;

// ---------- Boolean flag to simulate success/failure ----------
const isServerOnline = true; // Change to false to see the reject/error case

// ---------- Promise-based fetchUsers function ----------
function fetchUsers() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (isServerOnline) {
                // Resolve with array of user objects
                resolve([
                    { id: 1, name: "Ali Ahmed", email: "ali@example.com", role: "Student" },
                    { id: 2, name: "Hassan Khan", email: "hassan@example.com", role: "Admin" },
                    { id: 3, name: "Sara Malik", email: "sara@example.com", role: "Student" },
                    { id: 4, name: "Fatima Noor", email: "fatima@example.com", role: "Teacher" }
                ]);
            } else {
                // Reject with error message
                reject("Server is offline. Failed to fetch users!");
            }
        }, 3000); // 3 seconds delay
    });
}

// ---------- Using .then() and .catch() ----------
fetchUsers()
    .then(function (users) {
        let html = `
            <div class="card">
                <h2>Users Loaded Successfully</h2>
                <p><span class="label">Total Users:</span> ${users.length}</p>
            </div>
        `;

        users.forEach(function (user) {
            html += `
                <div class="card">
                    <div class="user-row">
                        <p><span class="label">ID:</span> ${user.id}</p>
                        <p><span class="label">Name:</span> ${user.name}</p>
                        <p><span class="label">Email:</span> ${user.email}</p>
                        <p><span class="label">Role:</span> ${user.role}</p>
                    </div>
                </div>
            `;
        });

        output.innerHTML = html;
    })
    .catch(function (error) {
        output.innerHTML = `
            <div class="card">
                <h2 class="error">Error Loading Data</h2>
                <p class="error">${error}</p>
            </div>
        `;
    });

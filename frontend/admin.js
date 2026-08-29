const baseUrl = "http://localhost:3000/api";
const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role !== "admin") {
    window.location.href = "login.html";
}
document.getElementById("userName").innerText = user.name;
// ==================== ADD RESOURCE ====================
async function addResource() {
    const name = document.getElementById("resName").value;
    const type = document.getElementById("resType").value;
    const res = await fetch(`${baseUrl}/resources`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, type })
    });
    const data = await res.json();
    alert(data.message);
    loadResources();
}

// ==================== LOAD RESOURCES ====================
async function loadResources() {
    const res = await fetch(`${baseUrl}/resources`);
    const data = await res.json();
    const tbody = document.querySelector("#resourceTable tbody");
    tbody.innerHTML = "";
    data.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${r.name}</td>
            <td>${r.type}</td>
            <td>
                <button onclick="deleteResource(${r.id})">
                    Delete
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
// ==================== DELETE RESOURCE ====================
async function deleteResource(id) {
    const res = await fetch(`${baseUrl}/resources/${id}`, {
        method: "DELETE"
    });
    const data = await res.json();
    alert(data.message);
    loadResources();
}
// ==================== LOAD BOOKINGS ====================
async function loadBookings() {
    const res = await fetch(`${baseUrl}/bookings`);
    const data = await res.json();
    const tbody = document.querySelector("#bookingTable tbody");
    tbody.innerHTML = "";
    data.forEach(b => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${b.user}</td>
            <td>${b.resource}</td>
            <td>
                ${new Date(b.date)
                    .toLocaleDateString('en-GB')
                    .replace(/\//g, '-')}
            </td>
            <td>${b.time}</td>
            <td class="status-${b.status}">
                ${b.status}
            </td>
            <td>
                ${
                    b.status === 'pending'
                    ? `
                        <button onclick="updateStatus(${b.id}, 'approved')">
                            Approve
                        </button>
                        <button onclick="updateStatus(${b.id}, 'rejected')">
                            Reject
                        </button>
                    `
                    : ''
                }
            </td>
        `;

        tbody.appendChild(tr);
    });
}
// ==================== UPDATE BOOKING STATUS ====================

async function updateStatus(id, status) {
    const res = await fetch(`${baseUrl}/bookings/${id}/status`, {
      method: "PUT",
         headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ status })
    });

    const data = await res.json();
    alert(data.message);
    loadBookings();
}

// ==================== LOGOUT ====================
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
// ==================== LOAD ON PAGE ====================
loadResources();
loadBookings();
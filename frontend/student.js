const baseUrl = "http://localhost:3000/api";
const user = JSON.parse(localStorage.getItem("user"));

// Redirect to login if not logged in or not a student
if (!user || user.role !== "student") window.location.href = "login.html";

// Show student name
document.getElementById("userName").innerText = user.name;

// Load available resources into select
async function loadResources() {
  try {
    const res = await fetch(`${baseUrl}/resources`);
    const data = await res.json();
    const select = document.getElementById("resourceSelect");

    data.forEach(r => {
      const option = document.createElement("option");
      option.value = r.id;
      option.text = r.name;
      select.add(option);
    });
  } catch (err) {
    console.error("Error loading resources:", err);
    alert("Failed to load resources.");
  }
}

// Load student booking history
async function loadHistory() {
  try {
    const res = await fetch(`${baseUrl}/bookings`);
    const data = await res.json();
    const tbody = document.querySelector("#historyTable tbody");
    tbody.innerHTML = "";

    // Filter bookings for this student
    data.filter(b => b.user_id === user.id).forEach(b => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${b.resource}</td>
        <td>${b.date}</td>
        <td>${b.time}</td>
        <td class="status-${b.status}">${b.status}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error loading booking history:", err);
  }
}

// Book a resource
async function bookResource() {
  const resource_id = document.getElementById("resourceSelect").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!resource_id || !date || !time) {
    alert("Please select resource, date, and time.");
    return;
  }

  try {
    const res = await fetch(`${baseUrl}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, resource_id, date, time })
    });
    const data = await res.json();
    alert(data.message);
    loadHistory();
  } catch (err) {
    console.error("Error booking resource:", err);
    alert("Booking failed. Try again.");
  }
}

// Logout function
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Initial load
loadResources();
loadHistory();

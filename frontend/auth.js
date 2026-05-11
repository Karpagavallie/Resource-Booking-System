const baseUrl = "http://localhost:3000/api/auth";

// --------------- REGISTER + LOGIN -----------------
document.addEventListener("DOMContentLoaded", () => {
  // ---------- REGISTER ----------
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
      };

      const msg = document.getElementById("msg");

      try {
        const res = await fetch(`${baseUrl}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        });

        const data = await res.json();

        if (res.status === 201 || res.status === 200) {
          alert("Registration successful!");
          window.location.href = "login.html";
        } else {
          msg.innerText = data.message || "Registration failed";
        }
      } catch (err) {
        console.error("Error in registration fetch:", err);
        msg.innerText = "Server error. Try again later.";
      }
    });
  }

  // ---------- LOGIN ----------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const selectedRole = document.getElementById("role").value;
      const msg = document.getElementById("msg");

      if (!selectedRole) {
        msg.innerText = "Please select a role.";
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.status === 200) {
          if (data.user.role !== selectedRole) {
            msg.innerText = "Selected role does not match your account.";
            return;
          }

          localStorage.setItem("user", JSON.stringify(data.user));

          if (selectedRole === "student") {
            window.location.href = "student.html";
          } else if (selectedRole === "admin") {
            window.location.href = "admin.html";
          }
        } else {
          msg.innerText = data.message || "Login failed";
        }
      } catch (err) {
        console.error("Error in login fetch:", err);
        msg.innerText = "Server error. Try again later.";
      }
    });
  }
});
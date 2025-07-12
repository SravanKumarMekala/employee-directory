// Hook up DOM elements
const formContainer = document.getElementById("employee-form-container");
const form = document.getElementById("employee-form");
const addBtn = document.getElementById("add-employee-btn");
const cancelBtn = document.getElementById("cancel-btn");

let mockEmployees = window.mockEmployees || [];
let currentPage = 1;
let itemsPerPage = 10;

function saveToLocal() {
  localStorage.setItem("employees", JSON.stringify(mockEmployees));
}

window.onload = function () {
  const container = document.getElementById("employee-list-container");

  if (!localStorage.getItem("employees")) {
    localStorage.setItem("employees", JSON.stringify(mockEmployees));
  } else {
    mockEmployees = JSON.parse(localStorage.getItem("employees"));
  }

  if (!container || !mockEmployees) {
    container.innerHTML = "Error loading employees.";
    return;
  }

  renderEmployees();
};

// Main Render Function
function renderEmployees() {
  const container = document.getElementById("employee-list-container");
  const deptFilter =
    document.getElementById("filter-department")?.value.toLowerCase() || "";
  const roleFilter =
    document.getElementById("filter-role")?.value.toLowerCase() || "";

  container.innerHTML = "";
  let filtered = [...mockEmployees];

  const query =
    document.getElementById("search-input")?.value.toLowerCase() || "";
  if (query) {
    filtered = filtered.filter((emp) =>
      `${emp.firstName} ${emp.lastName} ${emp.email}`
        .toLowerCase()
        .includes(query)
    );
  }

  const sortBy = document.getElementById("sort-select")?.value;
  if (sortBy) {
    filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }

  if (deptFilter) {
    filtered = filtered.filter((emp) =>
      emp.department.toLowerCase().includes(deptFilter)
    );
  }

  if (roleFilter) {
    filtered = filtered.filter((emp) =>
      emp.role.toLowerCase().includes(roleFilter)
    );
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = filtered.slice(start, end);

  paginated.forEach((emp) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button class="edit-btn" data-id="${emp.id}">Edit</button>
      <button class="delete-btn" data-index="${mockEmployees.findIndex(
        (e) => e.id === emp.id
      )}">Delete</button>
    `;
    container.appendChild(card);
  });

  document.getElementById(
    "page-info"
  ).innerText = `Page ${currentPage} of ${totalPages}`;

  // Wire Delete
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      mockEmployees.splice(index, 1);
      saveToLocal();
      renderEmployees();
    });
  });

  // Wire Edit
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      const emp = mockEmployees.find((e) => e.id === id);
      if (!emp) return;

      document.getElementById("form-title").innerText = "Edit Employee";
      document.getElementById("employee-id").value = emp.id;
      document.getElementById("first-name").value = emp.firstName;
      document.getElementById("last-name").value = emp.lastName;
      document.getElementById("email").value = emp.email;
      document.getElementById("department").value = emp.department;
      document.getElementById("role").value = emp.role;

      formContainer.style.display = "block";
    });
  });
}

// Add + Edit Logic
addBtn.addEventListener("click", () => {
  form.reset();
  document.getElementById("form-title").innerText = "Add Employee";
  document.getElementById("employee-id").value = "";
  formContainer.style.display = "block";
  document.getElementById("overlay").style.display = "block";
});

cancelBtn.addEventListener("click", () => {
  formContainer.style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("employee-id").value;
  const newEmp = {
    id: id ? parseInt(id) : Date.now(),
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    department: document.getElementById("department").value,
    role: document.getElementById("role").value,
  };

  if (id) {
    const index = mockEmployees.findIndex((emp) => emp.id === parseInt(id));
    if (index !== -1) mockEmployees[index] = newEmp;
  } else {
    mockEmployees.push(newEmp);
  }

  saveToLocal();
  formContainer.style.display = "none";
  renderEmployees();
});

// Search, Sort, Pagination, Filter
document.getElementById("search-input")?.addEventListener("input", () => {
  currentPage = 1;
  renderEmployees();
});
document.getElementById("sort-select")?.addEventListener("change", () => {
  currentPage = 1;
  renderEmployees();
});
document.getElementById("prev-page")?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderEmployees();
  }
});
document.getElementById("next-page")?.addEventListener("click", () => {
  const total = Math.ceil(mockEmployees.length / itemsPerPage);
  if (currentPage < total) {
    currentPage++;
    renderEmployees();
  }
});
document.getElementById("items-per-page")?.addEventListener("change", (e) => {
  itemsPerPage = parseInt(e.target.value);
  currentPage = 1;
  renderEmployees();
});
document.getElementById("toggle-filter")?.addEventListener("click", () => {
  const panel = document.getElementById("filter-panel");
  panel.style.display = panel.style.display === "none" ? "block" : "none";
});
document.getElementById("apply-filter")?.addEventListener("click", () => {
  currentPage = 1;
  renderEmployees();
});
document.getElementById("clear-filter")?.addEventListener("click", () => {
  document.getElementById("filter-department").value = "";
  document.getElementById("filter-role").value = "";
  currentPage = 1;
  renderEmployees();
});

// Download full CSV
document.getElementById("download-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const sortBy = document.getElementById("sort-select").value;
  const deptFilter = document
    .getElementById("filter-department")
    .value.toLowerCase();
  const roleFilter = document.getElementById("filter-role").value.toLowerCase();

  let filtered = [...mockEmployees];

  if (query) {
    filtered = filtered.filter((emp) =>
      `${emp.firstName} ${emp.lastName} ${emp.email}`
        .toLowerCase()
        .includes(query)
    );
  }

  if (sortBy) {
    filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }

  if (deptFilter) {
    filtered = filtered.filter((emp) =>
      emp.department.toLowerCase().includes(deptFilter)
    );
  }

  if (roleFilter) {
    filtered = filtered.filter((emp) =>
      emp.role.toLowerCase().includes(roleFilter)
    );
  }

  if (filtered.length === 0) {
    alert("No data to export.");
    return;
  }

  // CSV header + data
  const header = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Department",
    "Role",
  ];
  const rows = filtered.map((emp) => [
    emp.id,
    emp.firstName,
    emp.lastName,
    emp.email,
    emp.department,
    emp.role,
  ]);

  const csvContent = [header, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "filtered_employees.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

// Upload CSV
document.getElementById("upload-csv")?.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const lines = event.target.result
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2) {
      alert("CSV must contain at least one employee record.");
      return;
    }

    const [headerLine, ...rows] = lines;
    rows.forEach((line) => {
      const values = line.split(",").map((v) => v.replace(/"/g, "").trim());
      if (values.length < 5) return;

      const [firstName, lastName, email, department, role] = values;

      mockEmployees.push({
        id: Date.now() + Math.floor(Math.random() * 10000),
        firstName,
        lastName,
        email,
        department,
        role,
      });
    });

    saveToLocal();
    renderEmployees();
    alert("Employees imported successfully!");
  };

  reader.readAsText(file);
});

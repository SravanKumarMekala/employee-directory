const defaultEmployees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    department: "HR",
    role: "Manager",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    department: "IT",
    role: "Developer",
  },
];

// Load from localStorage if exists, else use default
const saved = localStorage.getItem("employees");
window.mockEmployees = saved ? JSON.parse(saved) : defaultEmployees;

# 🚀 Employee Directory Web Interface

A clean, responsive web application to manage employees efficiently—ideal for internal HR tools or admin dashboards. Built with **HTML, CSS, JavaScript**, and designed to be extended with **Freemarker templates** in backend integration.

---

## 🌟 Features

✅ Real-time search by name/email  
✅ Dynamic sorting (First Name / Department)  
✅ Advanced filtering (Department + Role)  
✅ Pagination with adjustable page size  
✅ Modal-based Add/Edit employee form  
✅ CSV Upload & Download (filtered view)  
✅ Mobile-first, responsive layout  
✅ LocalStorage persistence (no backend required)

---

## 🧑‍💻 Tech Stack

- HTML5 + CSS3 (Flexbox, Media Queries)
- Vanilla JavaScript (no framework)
- Freemarker-compatible structure
- LocalStorage for offline data simulation

---

## 📦 File Structure

/employee-directory
│
├── css/
│ └── style.css # All layout + responsive styles
│
├── js/
│ ├── data.js # Mock employee data (optional)
│ └── app.js # All business logic (search, sort, filter)
│
├── index.ftlh
├── README.md


---

## 🛠️ Running the Project

### 💻 Local (No backend needed)
1. Clone the repository:
   ```bash
   git clone https://github.com/SravanKumarMekala/employee-directory.git
2. Open index.ftlh with Live Server in VS Code or any static server.

Note: Rename index.ftlh → index.html if running without Freemarker.

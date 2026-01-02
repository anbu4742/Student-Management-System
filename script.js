let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function openModal(index = -1) {
  document.getElementById("modal").style.display = "flex";
  editIndex = index;

  if (index >= 0) {
    const s = students[index];
    document.getElementById("modal-title").innerText = "Edit Student";

    document.getElementById("roll").value = s.roll;
    document.getElementById("name").value = s.name;
    document.getElementById("dept").value = s.dept;
    document.getElementById("year").value = s.year;
    document.getElementById("email").value = s.email;
  } else {
    document.getElementById("modal-title").innerText = "Add Student";
    document.querySelectorAll(".modal-content input").forEach(i => i.value = "");
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function saveStudent() {
  const roll = document.getElementById("roll").value;
  const name = document.getElementById("name").value;
  const dept = document.getElementById("dept").value;
  const year = document.getElementById("year").value;
  const email = document.getElementById("email").value;

  const newStudent = { roll, name, dept, year, email };

  if (editIndex >= 0) {
    students[editIndex] = newStudent;
  } else {
    students.push(newStudent);
  }

  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
  closeModal();
}

function loadStudents() {
  const table = document.getElementById("student-table");
  table.innerHTML = "";

  students.forEach((s, index) => {
    table.innerHTML += `
      <tr>
        <td>${s.roll}</td>
        <td>${s.name}</td>
        <td>${s.dept}</td>
        <td>${s.year}</td>
        <td>${s.email}</td>
        <td>
          <button onclick="openModal(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteStudent(i) {
  students.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
}

document.getElementById("search").addEventListener("keyup", function () {
  const key = this.value.toLowerCase();

  const rows = document.querySelectorAll("#student-table tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(key) ? "" : "none";
  });
});

window.onload = loadStudents;

window.onclick = function(e) {
  if (e.target === document.getElementById("modal")) {
    closeModal();
  }
};

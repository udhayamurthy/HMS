// Simulated JSON data
const data = {
    "users": [
        { "userID": "admin", "password": "Admin123", "name": "SYS ADMIN", "role": "ADMIN" },
        { "userID": "smith", "password": "Doctor123","name": "Dr Smith Right", "role": "DOCTOR" },
		{ "userID": "sony", "password": "Doctor123", "name": "Sony J", "role": "DOCTOR" },
        { "userID": "sofi", "password": "Front123", "name": "Sofi Varghese", "role": "FRONTDESK" }
    ],
    "appointments": [
        { "patientID": "P001", "patientName": "John Doe", "doctor": "Dr. Smith Right", "date": "2024-08-28 10:00:000", "status": "Pending" },
        { "patientID": "P002", "patientName": "Adam White", "doctor": "Dr. Sony J", "date": "2024-08-28 15:00:000", "status": "Confirmed" }
    ]
};

function login(event) {
    event.preventDefault();

    const userID = document.getElementById('userID').value;
    const password = document.getElementById('password').value;

    const user = data.users.find(u => u.userID === userID && u.password === password);

    if (user) {
        switch (user.role) {
            case 'ADMIN':
                window.location.href = 'admin.html';
                break;
            case 'DOCTOR':
                window.location.href = 'doctor.html';
                break;
            case 'FRONTDESK':
                window.location.href = 'frontdesk.html';
                break;
            default:
                alert("Invalid role!");
        }
    } else {
        alert("Invalid credentials!");
    }
}


function populateUserTable() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';
    data.users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.userID}</td>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="editUser('${user.userID}')">Edit</button>
                <button onclick="deleteUser('${user.userID}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


function populateAppointmentTable() {
    const tableBody = document.querySelector('#appointmentTable tbody');
    tableBody.innerHTML = '';
    data.appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.patientID}</td>
            <td>${appointment.patientName}</td>
            <td>${appointment.doctor}</td>
            <td>${appointment.date}</td>
            <td>
                <button onclick="editAppointment('${appointment.patientID}')">Edit</button>
                <button onclick="deleteAppointment('${index}')">Cancel</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}



function populateDoctorAppointmentTable() {
    const tableBody = document.querySelector('#doctorAppointmentTable tbody');
    tableBody.innerHTML = '';
    data.appointments.forEach((appointment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.patientID}</td>
            <td>${appointment.patientName}</td>
            <td>${appointment.date}</td>
            <td>${appointment.status}</td>
            <td>
                <button onclick="closeAppointment(${index})">Close</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
// Add listeners and handlers based on the page
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', login);
    } else if (document.querySelector('#userTable')) {
        populateUserTable();
    } else if (document.querySelector('#appointmentTable')) {
        populateAppointmentTable();
    } else if (document.querySelector('#doctorAppointmentTable')) {
        populateDoctorAppointmentTable();
    }
});

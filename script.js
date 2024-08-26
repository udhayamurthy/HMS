// Simulated JSON data
const data = {
    "users": [
        { "userID": "admin", "password": "admin123", "role": "admin" },
        { "userID": "doctor1", "password": "doctor123", "role": "doctor" },
        { "userID": "frontdesk1", "password": "frontdesk123", "role": "frontdesk" }
    ],
    "appointments": [
        { "patientID": "P001", "patientName": "John Doe", "doctor": "Dr. Smith", "date": "2024-08-28", "status": "Pending" },
        { "patientID": "P002", "patientName": "Jane Doe", "doctor": "Dr. Brown", "date": "2024-08-28", "status": "Confirmed" }
    ]
};

function login(event) {
    event.preventDefault();

    const userID = document.getElementById('userID').value;
    const password = document.getElementById('password').value;

    const user = data.users.find(u => u.userID === userID && u.password === password);

    if (user) {
        switch (user.role) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'doctor':
                window.location.href = 'doctor.html';
                break;
            case 'frontdesk':
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
                <button onclick="deleteAppointment('${appointment.patientID}')">Cancel</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function populateDoctorAppointmentTable() {
    const tableBody = document.querySelector('#doctorAppointmentTable tbody');
    tableBody.innerHTML = '';
    data.appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.patientID}</td>
            <td>${appointment.patientName}</td>
            <td>${appointment.date}</td>
            <td>${appointment.status}</td>
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

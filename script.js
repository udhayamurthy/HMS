// Simulated JSON data
const data = {
    "users": [
        { "userID": "admin", "password": "Admin123", "name": "SYS ADMIN", "role": "ADMIN" },
        { "userID": "smith", "password": "Doctor123", "name": "Dr Smith Right", "role": "DOCTOR" },
        { "userID": "sony", "password": "Doctor123", "name": "Sony J", "role": "DOCTOR" },
        { "userID": "sofi", "password": "Front123", "name": "Sofi Varghese", "role": "FRONTDESK" }
    ],
    "appointments": [
        { "patientID": "P001", "patientName": "John Doe", "doctor": "Dr. Smith Right", "date": "2024-08-28 10:00:00", "status": "Pending" },
        { "patientID": "P002", "patientName": "Adam White", "doctor": "Dr. Sony J", "date": "2024-08-28 15:00:00", "status": "Confirmed" }
    ],
    "appointments1": [
        { "patientID": "P001", "patientName": "John Doe", "doctor": "Dr. Smith Right", "date": "2024-08-28 10:00:00", "status": "Pending" },
        { "patientID": "P002", "patientName": "Adam White", "doctor": "Dr. Sony J", "date": "2024-08-28 10:30:00", "status": "Confirmed" },
        { "patientID": "P003", "patientName": "Emily Clark", "doctor": "Dr. Smith Right", "date": "2024-08-28 11:00:00", "status": "Pending" }
    ],
    "appointments2": [
        { "patientID": "P001", "patientName": "John Doe", "doctor": "Dr. Smith Right", "date": "2024-08-28 10:00:00", "status": "Pending" },
        { "patientID": "P002", "patientName": "Adam White", "doctor": "Dr. Sony J", "date": "2024-08-28 10:30:00", "status": "Confirmed" },
        { "patientID": "P003", "patientName": "Emily Clark", "doctor": "Dr. Smith Right", "date": "2024-08-28 11:00:00", "status": "Pending" },
        { "patientID": "P004", "patientName": "Michael Brown", "doctor": "Dr. Sony J", "date": "2024-08-28 11:30:00", "status": "Confirmed" },
        { "patientID": "P005", "patientName": "Jessica Blue", "doctor": "Dr. Smith Right", "date": "2024-08-28 12:00:00", "status": "Pending" },
        { "patientID": "P006", "patientName": "William Black", "doctor": "Dr. Sony J", "date": "2024-08-28 12:30:00", "status": "Confirmed" },
        { "patientID": "P007", "patientName": "Sophia Green", "doctor": "Dr. Smith Right", "date": "2024-08-28 13:00:00", "status": "Pending" },
        { "patientID": "P008", "patientName": "James Purple", "doctor": "Dr. Sony J", "date": "2024-08-28 13:30:00", "status": "Confirmed" },
        { "patientID": "P009", "patientName": "Isabella Yellow", "doctor": "Dr. Smith Right", "date": "2024-08-28 14:00:00", "status": "Pending" },
        { "patientID": "P010", "patientName": "Ethan Gray", "doctor": "Dr. Sony J", "date": "2024-08-28 14:30:00", "status": "Confirmed" }
    ]
};

function togglePassword() {
    const passwordField = document.getElementById('password');
    const togglePasswordIcon = document.querySelector('.toggle-password');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        togglePasswordIcon.textContent = '👁️'; // Change to an "eye" icon for visibility
    } else {
        passwordField.type = 'password';
        togglePasswordIcon.textContent = '👁️'; // Change back to an "eye" icon for hidden
    }
}

// Login function

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

// Add listeners for the login form
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', login);
    }
});

// Populate user table
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

// Populate appointments table on frontdesk page
function populateAppointmentTable() {
    const tableBody = document.querySelector('#appointmentTable tbody');
    tableBody.innerHTML = '';
    data.appointments1.forEach((appointment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.patientID}</td>
            <td>${appointment.patientName}</td>
            <td>${appointment.doctor}</td>
            <td>${appointment.date}</td>
            <td>
                <button onclick="editAppointment('${appointment.patientID}')">Edit</button>
                <button onclick="deleteAppointment(${index})">Cancel</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Populate appointments table on doctor page
function populateDoctorAppointmentTable() {
    const tableBody = document.querySelector('#doctorAppointmentTable tbody');
    tableBody.innerHTML = '';
    data.appointments2.forEach((appointment, index) => {
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

// Close appointment function
function closeAppointment(index) {
    data.appointments2.splice(index, 1);
    populateDoctorAppointmentTable();
}

// Refresh button handlers
function setupRefreshButtons() {
    const refreshDoctorBtn = document.getElementById('refreshDoctorBtn');
    if (refreshDoctorBtn) {
        refreshDoctorBtn.addEventListener('click', populateDoctorAppointmentTable);
    }

    const refreshFrontdeskBtn = document.getElementById('refreshFrontdeskBtn');
    if (refreshFrontdeskBtn) {
        refreshFrontdeskBtn.addEventListener('click', populateAppointmentTable);
    }
}

// Add listeners and handlers based on the page
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', login);
    } else if (document.querySelector('#userTable')) {
        populateUserTable();
    } else if (document.querySelector('#appointmentTable')) {
        populateAppointmentTable();
        setupRefreshButtons();
    } else if (document.querySelector('#doctorAppointmentTable')) {
        populateDoctorAppointmentTable();
        setupRefreshButtons();
    }
});

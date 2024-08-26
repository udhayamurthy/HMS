// Load JSON data (simulating a backend fetch)
let data = {};

fetch('./data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        initialize();
    })
    .catch(error => console.error('Error loading JSON data:', error));

// Initialize the script after loading data
function initialize() {
    if (window.location.pathname.endsWith('login.html')) {
        document.getElementById('loginForm').addEventListener('submit', login);
    } else if (window.location.pathname.endsWith('admin.html')) {
        populateUserTable();
    } else if (window.location.pathname.endsWith('frontdesk.html')) {
        populateAppointmentTable();
    } else if (window.location.pathname.endsWith('doctor.html')) {
        populateDoctorAppointmentTable();
    }
}

// Login function
function login(event) {
    event.preventDefault();
    
    const userID = document.getElementById('userID').value;
    const password = document.getElementById('password').value;
 console.log("Login attempt:", userID, password); // Debugging: Log the login attempt

    const user = data.users.find(u => u.userID === userID && u.password === password);

    if (user) {
        console.log("Login successful. Redirecting to:", user.role); // Debugging: Log successful login
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
				  console.error("Invalid role detected:", user.role); // Debugging: Log invalid role
   
        }
    } else {
        alert("Invalid credentials!");
		     console.error("Login failed: Invalid credentials"); // Debugging: Log failed login
  
    }
}

// Admin page: Populate user table
function populateUserTable() {
    const userTable = document.getElementById('userTable');
    data.users.forEach(user => {
        const row = userTable.insertRow();
        row.insertCell(0).textContent = user.userID;
        row.insertCell(1).textContent = user.role;
        row.insertCell(2).textContent = user.status;
        row.insertCell(3).innerHTML = `
            <button onclick="activateUser('${user.userID}')">Activate</button>
            <button onclick="deactivateUser('${user.userID}')">Deactivate</button>
            <button onclick="deleteUser('${user.userID}')">Delete</button>
            <button onclick="modifyUser('${user.userID}')">Modify</button>
        `;
    });
}

// Frontdesk page: Populate appointment table
function populateAppointmentTable() {
    const appointmentTable = document.getElementById('appointmentTable');
    data.appointments.forEach(appointment => {
        const row = appointmentTable.insertRow();
        row.insertCell(0).textContent = appointment.appointmentID;
        row.insertCell(1).textContent = appointment.patientName;
        row.insertCell(2).textContent = appointment.doctor;
        row.insertCell(3).textContent = appointment.date;
        row.insertCell(4).textContent = appointment.status;
        row.insertCell(5).innerHTML = `
            <button onclick="editAppointment('${appointment.appointmentID}')">Edit</button>
            <button onclick="cancelAppointment('${appointment.appointmentID}')">Cancel</button>
        `;
    });
}

// Doctor page: Populate doctor-specific appointment table
function populateDoctorAppointmentTable() {
    const doctorAppointmentTable = document.getElementById('doctorAppointmentTable');
    const doctorID = "Dr. John Smith"; // Replace with the logged-in doctor's ID

    data.appointments.forEach(appointment => {
        if (appointment.doctor === doctorID) {
            const row = doctorAppointmentTable.insertRow();
            row.insertCell(0).textContent = appointment.appointmentID;
            row.insertCell(1).textContent = appointment.patientName;
            row.insertCell(2).textContent = appointment.date;
            row.insertCell(3).textContent = appointment.status;
            row.insertCell(4).innerHTML = `
                <button onclick="completeAppointment('${appointment.appointmentID}')">Complete</button>
            `;
        }
    });
}

// Admin actions
function activateUser(userID) {
    const user = data.users.find(u => u.userID === userID);
    user.status = "active";
    alert(`User ${userID} activated`);
    // Refresh the user table or update UI
}

function deactivateUser(userID) {
    const user = data.users.find(u => u.userID === userID);
    user.status = "inactive";
    alert(`User ${userID} deactivated`);
    // Refresh the user table or update UI
}

function deleteUser(userID) {
    data.users = data.users.filter(u => u.userID !== userID);
    alert(`User ${userID} deleted`);
    // Refresh the user table or update UI
}

function modifyUser(userID) {
    const user = data.users.find(u => u.userID === userID);
    // Implement modification logic (e.g., open a modal with user details to edit)
    alert(`Modify user: ${user.userID}`);
}

// Frontdesk actions
function editAppointment(appointmentID) {
    const appointment = data.appointments.find(a => a.appointmentID === appointmentID);
    // Implement edit logic (e.g., open a modal with appointment details to edit)
    alert(`Edit appointment: ${appointment.appointmentID}`);
}

function cancelAppointment(appointmentID) {
    const appointment = data.appointments.find(a => a.appointmentID === appointmentID);
    appointment.status = "Cancelled";
    alert(`Appointment ${appointmentID} cancelled`);
    // Refresh the appointment table or update UI
}

// Doctor actions
function completeAppointment(appointmentID) {
    const appointment = data.appointments.find(a => a.appointmentID === appointmentID);
    appointment.status = "Completed";
    alert(`Appointment ${appointmentID} completed`);
    // Refresh the doctor appointment table or update UI
}

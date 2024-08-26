# Hospital Management System

## Overview

This is a simple Hospital Management System built with HTML, CSS, and JavaScript. The system includes three roles: Admin, Frontdesk, and Doctor. Each role has specific access and functionality within the system.

- **Admin**: Can manage users (add, edit, delete) and view all users in the system.
- **Frontdesk**: Can manage appointments (add, edit, cancel) for patients and view all appointments.
- **Doctor**: Can view and complete appointments assigned to them.

The project is designed to work as a static website hosted on GitHub Pages.

## Project Structure

```plaintext
/hospital-management-system
│
├── index.html          # Login page (home page)
├── admin.html          # Admin dashboard page
├── frontdesk.html      # Frontdesk dashboard page
├── doctor.html         # Doctor dashboard page
├── script.js           # Main JavaScript file
├── data.json           # JSON data file (embedded in script.js for GitHub Pages compatibility)
├── styles.css          # CSS file for styling (optional)
└── README.md           # Project documentation

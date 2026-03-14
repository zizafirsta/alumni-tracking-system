# Alumni Tracking System

The Alumni Tracking System is a web-based application designed to help universities track alumni information from various public sources on the internet.  
The system allows administrators to manage alumni data and simulate alumni tracking results based on predefined matching criteria.

This project was developed as part of the **Software Requirements Engineering Daily Project**.

---

## Live Demo

Website:
https://alumni-tracking-system-krtljyqcy-zizafirstas-projects.vercel.app

GitHub Repository:
https://github.com/zizafirsta/alumni-tracking-system

---

## System Overview

The Alumni Tracking System helps institutions monitor alumni career development by collecting and analyzing publicly available information.  

The system allows administrators to:

- Add alumni data
- Track alumni information
- View alumni tracking results
- Monitor alumni statistics through a dashboard

The tracking process simulates searching alumni information across public platforms such as:

- LinkedIn
- Google Scholar
- GitHub
- ResearchGate

The system evaluates the similarity between alumni data and search results to determine a **confidence score** and assign a tracking status.

---

## Features

- Manage alumni data
- Add new alumni information
- Alumni tracking simulation
- Confidence score evaluation
- Dashboard statistics
- Alumni search functionality
- Delete alumni data
- Data visualization using charts

---

## Technology Used

Frontend:
- HTML
- CSS
- JavaScript
- Bootstrap

Backend:
- Node.js
- Express.js

Data Visualization:
- Chart.js

Deployment:
- Vercel

Version Control:
- GitHub

---

## System Architecture

The system follows a simple client-server architecture:

User Interface (Frontend)
⬇  
Express Server (Backend API)
⬇  
Temporary Data Storage (Server Memory)

The backend processes alumni tracking logic and sends the results back to the frontend dashboard.

---

## Installation and Setup

To run the project locally:

### 1. Clone the repository
git clone https://github.com/zizafirsta/alumni-tracking-system.git


### 2. Open the project folder
cd alumni-tracking-system

### 3. Install dependencies
npm install

### 4. Run the server
node server.js

### 5. Open the application
Open the browser and go to:
http://localhost:3000


---

## System Testing

Functional testing was performed to verify that each feature of the system works according to the requirements defined in the design stage.

| No | Feature | Test Steps | Expected Result | Result |
|----|--------|------------|----------------|--------|
| 1 | Add Alumni | Input alumni name, program study, and graduation year then click **Add** | Alumni data is successfully added and displayed in the table | Success |
| 2 | View Alumni | Open the dashboard page | Alumni data list appears in the table | Success |
| 3 | Track Alumni | Click the **Track** button on a selected alumni | Alumni status changes to Identified / Need Verification / Not Relevant | Success |
| 4 | Dashboard Statistics | After adding or tracking alumni | Dashboard statistics update based on the current data | Success |
| 5 | Search Alumni | Type alumni name in the search field | System filters and displays matching alumni data | Success |
| 6 | Delete Alumni | Click the **Delete** button on an alumni record | Selected alumni data is removed from the table | Success |

---

## Project Structure
alumni-tracking-system
│
├── public
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── server.js
├── package.json
└── README.md


---

## Author

Ziza Firsta Mahadewi  
Informatics Engineering  
Universitas Muhammadiyah Malang

---

## License

This project is developed for educational purposes as part of a university coursework project.
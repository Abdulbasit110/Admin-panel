# Real-Time Data Dashboard

## Overview

This project demonstrates a real-time data dashboard that visualizes data from a device using ApexCharts. The application consists of a backend server written in Node.js and TypeScript, a MySQL database, and a frontend built with Vite and React.js that updates charts in real-time using Socket.io.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Servers](#running-the-servers)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Development Notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
.
├── server
│   ├── app.js
└── package.json         // Node.js server for real-time data collection      // SQL script for setting up MySQL database
├── client
│   ├── src
│   │   ├── App.jsx       // Main React component
│   │   ├── index.jsx     // Entry point for React
│   │   ├── components    // Directory for React components
│   │   └── styles.css    // CSS for styling the dashboard
│   ├── public
│   │   └── index.html    // Main HTML file
│   ├── vite.config.js    // Vite configuration file
│   ├── package.json      // Project configuration and dependencies
├── servertypescript
│   ├── app.ts         // TypeScript server for API endpoints
│   ├── app.js
│   ├── tsconfig.json     // TypeScript configuration file
├── README.md             // Project README file
└── package.json          // Project configuration and dependencies
```

## Setup Instructions

### Prerequisites

- Node.js 
- MySQL 

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Abdulbasit110/Dashboard.git
    cd Dashboard
    ```

2. Install dependencies for backend, frontend, and typescript-server:
    ```bash
    cd server
    npm install
    cd ../client
    npm install
    cd ../servertypescript
    npm install
    ```

### Database Setup

1. Update the database configuration in your `typescript-server/server.ts` file:
    ```typescript
    const dbConfig = {
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'your_database'
    };
    ```

### Running the Servers

1. Start the backend server:
    ```bash
    cd server
    node app.js
    ```

2. Start the TypeScript server:
    ```bash
    cd servertypescript
    npm run dev
    ```

3. Start the frontend server:
    ```bash
    cd client
    npm run dev
    ```

4. Ensure all servers are running on their respective ports (3001 for backend, 8080 for TypeScript server, and 5173 for frontend).

## Usage

- Open your browser and navigate to `http://localhost:5173` to view the real-time data dashboard.
- The charts will update automatically as data is received from the backend server.

## API Endpoints

- **GET /api/data** - Fetches data from the MySQL database.

## Socket Events

- **receivedData** - Event emitted by the backend server when new data is received from the device. The frontend listens to this event to update the charts in real-time.

## Development Notes

- The backend server collects real-time data from the device and emits it via Socket.io.
- The TypeScript server handles API requests to fetch data from the MySQL database.
- The frontend visualizes data using ApexCharts and updates in real-time using Socket.io.

## Learnings

During this project, I learned the following:

1. **Node.js and Express**: I learned how to set up a Node.js server and use Express to handle real-time data collection from a device.
2. **TypeScript**: I gained experience in writing TypeScript code for server-side applications, including setting up API endpoints and connecting to a MySQL database.
3. **MySQL**: I learned how to set up and interact with a MySQL database, including creating tables and writing queries to fetch data.
4. **React.js with Vite**: I learned how to build a frontend using React.js and Vite, including setting up components and managing state.
5. **Socket.io**: I learned how to use Socket.io for real-time communication between the backend server and the frontend, enabling live data updates.
6. **ApexCharts**: I gained experience in integrating ApexCharts into a React application to visualize data dynamically.
7. **Project Structure**: I learned how to structure a full-stack project, separating concerns between backend, frontend, and TypeScript API server.
8. **Deployment and Development Workflow**: I gained insights into deploying and managing multiple servers, ensuring they work together seamlessly.

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss any changes.

##Thank you

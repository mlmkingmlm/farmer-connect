🌾 FarmerConnect

FarmerConnect is a web-based application designed to help farmers manage their farming activities and provide admins with tools to monitor farmers.
The project is built with React (Vite) for frontend and JSON Server for a dummy backend.

🚀 Features
👨‍🌾 Farmer Portal

Register and Login system

Dashboard with:

Farming Categories

Subcategories (crop details, required resources, insurance)

Farming Cost Calculator

Profit & Loss tracking

Insurance options

🛡️ Admin Panel

View all registered farmers with their details

Filter farmers by location

Track login & registration activity (who logged in / registered and when)

🛠 Tech Stack

Frontend: React (Vite), Bootstrap

Backend (Dummy API): JSON Server

Routing: React Router DOM

State Management: React Hooks (useState, useEffect)

📂 Project Structure
farmer-connect/
│── connectfarmer/    # Frontend (Vite + React)
│── server/           # Dummy backend (JSON Server with data.json)

⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/mlmkingmlm/farmer-connect.git
cd farmer-connect

2. Install Dependencies (Frontend)
cd connectfarmer
npm install

3. Install JSON Server (if not installed globally)
npm install -g json-server

4. Run Project

From the connectfarmer folder, run:

npm run dev


This will:

Start frontend on 👉 http://localhost:5173

Start backend (JSON Server) on 👉 http://localhost:5000

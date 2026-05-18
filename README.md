# AI-Based Employee Performance Analytics & Recommendation System

This is a full-stack MERN application that analyzes employee performance data and provides AI-powered recommendations using the OpenRouter AI API.

## Features

- **Authentication**: JWT-based secure authentication for HR/Admin users.
- **Employee Management**: Add, view, search, filter, and delete employee records.
- **AI Integration**: AI-driven insights for promotion, training, and feedback based on employee data.
- **Modern UI**: A responsive, clean, and premium glassmorphic UI.

## Tech Stack

- **Frontend**: React (Vite), Context API, Axios, vanilla CSS (modern UI)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt
- **AI**: OpenRouter API integration (Google Gemini / OpenAI compatible)

## How to Run Locally

### 1. Backend Setup
1. Navigate to the \`backend\` directory: \`cd backend\`
2. Install dependencies: \`npm install\`
3. Set up environment variables in \`.env\`:
   - \`PORT=5000\`
   - \`MONGO_URI=mongodb://127.0.0.1:27017/employee-analytics\`
   - \`JWT_SECRET=your_jwt_secret\`
   - \`OPENROUTER_API_KEY=your_openrouter_api_key\`
4. Start the backend server: \`npm run dev\` or \`node server.js\`

### 2. Frontend Setup
1. Navigate to the \`frontend\` directory: \`cd frontend\`
2. Install dependencies: \`npm install\`
3. Start the Vite development server: \`npm run dev\`

### 3. Usage
- Go to \`http://localhost:5173\`
- Register a new account
- Login and add employees
- Go to the "AI Insights" page to generate recommendations based on the stored employee data!

## Deployment (Render)
To deploy this project to Render:
1. Push this repository to GitHub.
2. In Render, create a new "Web Service" for the Backend. Connect your GitHub repo, set the Root Directory to \`backend\`, build command to \`npm install\`, and start command to \`node server.js\`. Add your Environment Variables.
3. Create a new "Static Site" for the Frontend. Connect your GitHub repo, set the Root Directory to \`frontend\`, build command to \`npm run build\`, and publish directory to \`dist\`.

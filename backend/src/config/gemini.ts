import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateGeminiRoadmap = async (
  prompt: string,
  history: { role: "user" | "model"; text: string }[]
): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `You are a senior website product manager and project architect. 
Your job is to generate a **detailed, phase-based roadmap** for building any website or web app described by the user. 
Every response must be step-by-step and structured by logical stages (such as Planning, Design, Setup, Development, Testing, Deployment, Maintenance). 
For each phase, break down actionable sub-steps, list relevant technologies, and give best practices, but **NEVER provide code or technical implementation details**.

Your answer should:
- Use bullet points, numbered lists, and clear phase headings
- Suggest professional tools, stacks, and service/hosting options where relevant
- Prioritize thorough planning, research, testing, and deployment instructions
- Avoid all code snippets, detailed syntax, or programming logic explanations
- End with a checklist or “Final Touches” phase for polish, analytics, and feedback

**Example request:** “Build portfolio website”  
**Example output:** 
"
✅ PHASE 1: Planning & Design
1.1 Define Objectives
Showcase your skills, projects, resume, and contact information.
Optionally include a blog, testimonials, or downloadable resume.
1.2 Identify Core Pages/Sections
Home
About
Skills/Tech Stack
Projects (individual pages for each project optional)
Resume/CV
Contact (with form + email integration)
(Optional) Blog
1.3 Design UI/UX (Figma / Pen & Paper / Whimsical)
Layout wireframes for desktop and mobile.
Choose color scheme, typography, icons, animations.
Pick a UI library: Tailwind CSS, Material UI, or Chakra UI.

🏗️ PHASE 2: Setup the Development Environment
2.1 Backend Setup (Node + Express)
Initialize with npm init, configure nodemon, dotenv.
Setup basic folder structure:
arduino
CopyEdit
backend/
├── controllers/
├── models/
├── routes/
├── config/
├── middleware/
└── server.js

2.2 Frontend Setup (React)
Use Vite or Create React App to scaffold the app.
Set up routing with React Router DOM.
Folder structure example:
CopyEdit
frontend/
├── components/
├── pages/
├── assets/
├── utils/
└── App.jsx


🧠 PHASE 3: Build Frontend (React + UI Library)
3.1 Navigation & Routing
Create a responsive navbar.
Implement route-based navigation using React Router.
3.2 Sections Development
Home: Hero section with your name, title, call to action.
About: Bio, image, short intro.
Skills: Icons or badges representing tech stack.
Projects: Cards/grid with images, descriptions, tech used, links to GitHub/live demo.
Resume: Link to download, or display as a section.
Contact: Form with name, email, message fields.

🛠️ PHASE 4: Backend Development (Node.js + Express + MongoDB)
4.1 Setup Express Server
Create a basic Express server with environment configuration.
4.2 Connect MongoDB
Use Mongoose to connect to MongoDB Atlas or local DB.
4.3 Build REST APIs
GET /api/projects – fetch all projects.
GET /api/profile – fetch your profile details.
POST /api/contact – send form submissions (can integrate with email service).
4.4 Schema Design (Mongoose)
Project Model: title, description, techStack, liveLink, gitHubLink, image.
Contact Model: name, email, message.

🔗 PHASE 5: Connect Frontend and Backend
5.1 Axios Integration
Use Axios or fetch to consume your Express API from the frontend.
5.2 Display Dynamic Data
Load project data, about info, and handle contact form submission.
5.3 Error Handling
Display loading states, handle errors gracefully (toast/snackbar).

✨ PHASE 6: Add Enhancements
6.1 Animations
Use Framer Motion, AOS, or GSAP for scroll animations, transitions.
6.2 SEO & Performance
Add meta tags (title, description).
Use React Helmet for dynamic metadata.
Optimize images (WebP), lazy-load components.
6.3 Authentication (Optional)
If you want to add admin login to manage content:
Use JWT Auth with login route.
Admin dashboard to CRUD projects.

🚀 PHASE 7: Deployment
7.1 Frontend Deployment
Use Vercel, Netlify, or GitHub Pages for React frontend.
7.2 Backend Deployment
Deploy Express API using Render, Railway, VPS, or Heroku (deprecated).
Host MongoDB on MongoDB Atlas.
7.3 Connect Domains (Optional)
Use a custom domain via GoDaddy, Namecheap, or Cloudflare.
Update DNS records to point to frontend and backend.

🔒 PHASE 8: Final Touches
8.1 Contact Form Email Integration
Use services like EmailJS, Nodemailer, or Formspree.
8.2 Analytics
Add Google Analytics or Vercel Analytics.
8.3 Feedback & Testing
Test responsiveness, cross-browser compatibility.
Ask peers for review and feedback.
"
      `,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Understood, I'll generate a roadmap with checklists based on your prompt.",
          },
        ],
      },
      ...history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    ],
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
};

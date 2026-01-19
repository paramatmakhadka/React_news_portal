A modern, dynamic news portal built with the MERN stack. This project features a robust backend for managing news articles and categories, 
and a sleek frontend for readers to browse news by category, view individual stories, and subscribe to newsletters.
 <img width="969" height="633" alt="image" src="https://github.com/user-attachments/assets/3bfa22b8-ca5f-411f-8646-04e0db239a22" />

Shutterstock
🚀 Features
•	Dynamic Categorization: Filter news by categories (Kathmandu, National, Politics, etc.).
•	Article Management: Full CRUD (Create, Read, Update, Delete) functionality for administrators.
•	Image Uploads: Handled via Multer with local storage and automated cleanup of old images.
•	Authentication: JWT-based protection for administrative routes.
•	Responsive Design: Fully mobile-friendly layout built with Bootstrap 5.
•	Real-time Updates: Integrated React-Toastify for user feedback.
________________________________________
🛠️ Tech Stack
Frontend:
•	React.js
•	React Router DOM (Dynamic Routing)
•	Bootstrap 5
•	React-Toastify
Backend:
•	Node.js & Express.js
•	MongoDB & Mongoose (ODM)
•	Multer (File Uploads)
•	JSON Web Tokens (JWT)
________________________________________
📂 Project Structure
Plaintext
himalayan_times/
├── backend/
│   ├── controllers/      # Logic for posts, categories, and auth
│   ├── models/           # Mongoose schemas (Post, Category, User)
│   ├── routes/           # Express API endpoints
│   ├── middlewares/      # Auth and error handling
│   └── uploads/          # Physical image storage
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI elements
    │   ├── layouts/      # Frontend/Admin wrappers
    │   └── pages/        # Homepage, Post details, Category views
________________________________________
⚙️ Installation & Setup
1. Prerequisites
•	Node.js installed
•	MongoDB Atlas account or local MongoDB instance
2. Backend Setup
1.	Navigate to the backend folder: cd backend
2.	Install dependencies: npm install
3.	Create a .env file and add:
Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4.	Start the server: npm run dev (using nodemon)
3. Frontend Setup
1.	Navigate to the frontend folder: cd frontend
2.	Install dependencies: npm install
3.	Start the React app: npm start
________________________________________
🔌 API Endpoints
Method	Endpoint	Description
GET	/api/posts	Fetch all posts (supports ?category=ID filter)
GET	/api/posts/:id	Fetch a single post by ID
POST	/api/posts	Create a new post (Admin Protected)
PUT	/api/posts/:id	Update a post & replace image (Admin Protected)
DELETE	/api/posts/:id	Delete post & remove image (Admin Protected)
________________________________________
📸 Screenshots
<img width="1419" height="735" alt="image" src="https://github.com/user-attachments/assets/f32d0dd4-7e71-4a9f-97e3-cf702cb91a75" />
<img width="652" height="446" alt="image" src="https://github.com/user-attachments/assets/dc943b53-67c3-4562-99d5-4d12d837d2e4" />
<img width="1409" height="607" alt="image" src="https://github.com/user-attachments/assets/e16608bf-366c-4bde-a220-b664c88b5c95" />
<img width="1428" height="552" alt="image" src="https://github.com/user-attachments/assets/b5608d5f-5db5-48d8-9175-7906f94eba0f" />
<img width="1404" height="722" alt="image" src="https://github.com/user-attachments/assets/ba1642b8-ed8a-4a6f-8d78-eee9ed9f4dd8" />

________________________________________
🤝 Contributing
1.	Fork the project
2.	Create your Feature Branch (git checkout -b feature/AmazingFeature)
3.	Commit your changes (git commit -m 'Add some AmazingFeature')
4.	Push to the Branch (git push origin feature/AmazingFeature)
5.	Open a Pull Request


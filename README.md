# NeuraFlow AI - Interview Preparation Platform

NeuraFlow is an AI-powered interview preparation platform that analyzes your resume against job descriptions, identifies skill gaps, and provides interactive mock interview practice.

## 📸 Screenshots

### Home Page
![Home Page](screenshots/Screenshot%202026-01-13%20191830.png)

### Resume Analysis
![Resume Analysis](screenshots/Screenshot%202026-01-13%20191856.png)

### AI-Powered Insights
![AI Insights](screenshots/Screenshot%202026-01-13%20191937.png)

### Interactive Chat
![Interactive Chat](screenshots/Screenshot%202026-01-13%20192014.png)

### Dashboard
![Dashboard](screenshots/Screenshot%202026-01-13%20192313.png)

## Features

- **AI Resume Analysis**: Upload your resume (PDF/DOCX) or paste text for deep analysis
- **Job Matching**: Compare your profile against specific job descriptions
- **Skill Gap Detection**: Identify missing skills and get actionable improvement tips
- **Interactive Mock Interviews**: Practice with AI-powered follow-up questions
- **Chat History**: Save and revisit your analysis sessions (authenticated users)
- **Secure Authentication**: JWT-based auth with httpOnly cookies
- **Guest Access**: Try the platform without registration

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cookie-based sessions
- Multer (file uploads)
- PDF/DOCX parsing

### AI Service
- Python FastAPI
- Google Gemini AI

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Python 3.8+
- Google Gemini API Key

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd NeuraFlow
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install
```

### 4. Install AI Service Dependencies
```bash
cd ../ai-service
pip install -r requirements.txt
```

### 5. Environment Configuration

#### Server (.env)
Create `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
AI_SERVICE_URL=http://localhost:8000
JWT_SECRET=your_jwt_secret_key
ORIGIN=http://localhost:5173
NODE_ENV=development
```

#### AI Service (secret.py)
Create `ai-service/secret.py`:
```python
GEMINI_API_KEY = "your_gemini_api_key"
```

## Running the Application

### Start MongoDB
Ensure MongoDB is running locally or use MongoDB Atlas.

### Start AI Service
```bash
cd ai-service
python main.py
```
Runs on: http://localhost:8000

### Start Backend Server
```bash
cd server
npm run dev
```
Runs on: http://localhost:5000

### Start Frontend Client
```bash
cd client
npm run dev
```
Runs on: http://localhost:5173

## Project Structure

```
NeuraFlow/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── config/       # Database config
│   │   ├── middleware/   # Auth middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── index.js      # Entry point
│   └── package.json
├── ai-service/           # Python AI service
│   ├── main.py          # FastAPI app
│   └── secret.py        # API keys (gitignored)
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Chat/Analysis
- `POST /api/chat/analyze` - Analyze resume (public)
- `POST /api/chat/save` - Save chat session (protected)
- `GET /api/chat/history` - Get user's chat history (protected)
- `GET /api/chat/:id` - Get specific chat (protected)

### AI Service
- `POST /ai/query` - Process AI analysis request

## Security Features

- **httpOnly Cookies**: JWT tokens stored securely
- **CORS Protection**: Configured for specific origins
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Server-side validation
- **XSS Protection**: React's built-in escaping

## Usage

1. **Guest Mode**: Visit `/analyze` to try without registration
2. **Register**: Create account to save chat history
3. **Upload Resume**: PDF, DOCX, or paste text
4. **Add Job Description**: Paste the target job posting
5. **Analyze**: Get AI-powered insights
6. **Follow-up**: Ask questions for deeper preparation
7. **Dashboard**: View saved analysis sessions

## Development

### Client Development
```bash
cd client
npm run dev
```

### Server Development
```bash
cd server
npm run dev
```

### Build for Production
```bash
cd client
npm run build
```

## Environment Variables

### Server
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `AI_SERVICE_URL` - AI service endpoint
- `JWT_SECRET` - Secret for JWT signing
- `ORIGIN` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

### AI Service
- `GEMINI_API_KEY` - Google Gemini API key (in secret.py)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue on GitHub.

## Acknowledgments

- Google Gemini AI for powering the analysis
- React and Express communities
- All contributors and testers

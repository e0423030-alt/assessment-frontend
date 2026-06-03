app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://assessment-frontend-naae1edzg-e0423030-alts-projects.vercel.app'
  ],
  credentials: true
}));
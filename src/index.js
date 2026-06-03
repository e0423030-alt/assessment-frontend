app.use(cors({
  origin: function(origin, callback) {
    if (!origin || origin.includes('e0423030-alts-projects.vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
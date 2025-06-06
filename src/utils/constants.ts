const ENVIRONMENT = (process.env.ENVIRONMENT || "dev") as "dev" | "production"
const isProd = ENVIRONMENT === "production"
export const SERVER_URL = isProd ? 'https://tictactoemo-deploy.onrender.com' : 'http://localhost:3000'
export const CLIENT_URL = isProd ? 'https://tictactoemo-deploy-krodmd3cb-ajroberts0417s-projects.vercel.app' : 'http://localhost:5173'

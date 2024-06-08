const ENVS = {
  FRONTEND_URL: process.env.FRONTEND_URL || '',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || '',
  ADMIN_ROLE: process.env.ADMIN_ROLE || '',
  USER_ROLE: process.env.USER_ROLE || '',
}
export { ENVS }

const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || "ecommerce",
  },
};

export default config;

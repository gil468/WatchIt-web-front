module.exports = {
  apps: [
    {
      name: "WatchIt frontend",
      script: "vite preview --port 443 --host --config vite.prod.config.ts",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

module.exports = {
  apps : [
    {
      name: "prod_server",
      script: 'npm run start:prod',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'prod'
      },
    },
    {
      name: "dev_server",
      script: 'npm run start:dev',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: true,
      env: {
     	PORT: 3001,
        NODE_ENV: 'dev'
      }
    }],
};

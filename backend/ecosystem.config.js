module.exports = {
  apps: [
    {
      name: "node-app",
      script: "server.js",
      cwd: "/app",
      watch: true,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        SOCKET_PORT: 3000,  // Socket.IO on same port
        DATABASE_URL: "postgres://procguser:procgpassword@postgres:5432/procgdb",
        REDIS_URL: "redis://valkey:6379"
      }
    },
    {
      name: "flask-app",
      script: "python",
      args: "app.py",
      cwd: "/app",
      watch: true,
      env: {
        FLASK_ENV: "production",
        FLASK_APP: "app.py",
        FLASK_RUN_PORT: 5000
      }
    }
  ]
}
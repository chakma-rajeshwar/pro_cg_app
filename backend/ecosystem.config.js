module.exports = {
    apps: [
      {
        name: "node-app",
        cwd: "/app/node",
        script: "node",
        args: "server.js",
        watch: true,
        env: {
          NODE_ENV: "production",
          PORT: 3000
        }
      },
      {
        name: "flask-app",
        cwd: "/app",
        script: "python",
        args: "app.py",
        watch: true,
        env: {
          FLASK_ENV: "production",
          FLASK_RUN_PORT: 5000
        }
      }
    ]
  }
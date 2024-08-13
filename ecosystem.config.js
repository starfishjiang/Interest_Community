module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'npm', 
        args: 'run dev',
        cwd: './frontend',
        watch: true,
        // env: {
        //   NODE_ENV: 'production',
        // },
      },
      {
        name: 'backend',
        script: './backend/bootstrap.js', 
        cwd: './backend',
        watch: true,
        // env: {
        //   NODE_ENV: 'production',
        // },
      },
    ],
  };
module.exports = {
  apps: [
    {
      name: 'kado-ai',
      script: './start.sh',
      cwd: '/root/Mayar/kado-ai',
      watch: ['src'],
      watch_delay: 2000,
      ignore_watch: ['node_modules', 'dist', '.git'],
      exec_interpreter: 'bash',
      exec_mode: 'fork',
      autorestart: true,
    },
  ],
}

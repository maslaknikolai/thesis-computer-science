module.exports = {
  apps: [
    {
      name: 'NuxtApp',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start --port 80 --hostname 0.0.0.0'
    }
  ]
}

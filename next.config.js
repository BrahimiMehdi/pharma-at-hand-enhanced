/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
  })
const nextConfig = {
    ...withPWA({
        dest:"public",
        register:true,
        skipWaiting:true,
    }),
    images:{
        domains:["media.graphassets.com"]
    },
    experimental: {
        workerThreads: false,
        cpus: 1
    },
}

module.exports = nextConfig

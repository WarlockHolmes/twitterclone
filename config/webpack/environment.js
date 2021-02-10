const { environment } = require('@rails/webpacker')

// enable split chunk with default settings with following line
environment.splitChunks()

module.exports = environment

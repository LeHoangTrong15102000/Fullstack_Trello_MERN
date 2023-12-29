// Chứa các constants
let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-qlap.onrender.com'
}
// console.log('🚀 ~ file: constants.js:3 ~ apiRoot:', apiRoot)

export const API_ROOT = apiRoot
// export const API_ROOT = 'https://trello-api-qlap.onrender.com'

const { cleanSocialNetworkUsername } = require('../utils')

module.exports = () => ({
  type: 'input',
  message: '👤  Medium Profile  (use empty value to skip)',
  name: 'mediumProfileUserName',
  filter: cleanSocialNetworkUsername
})

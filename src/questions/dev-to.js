const { cleanSocialNetworkUsername } = require('../utils')

module.exports = () => ({
  type: 'input',
  message: '👤  dev.to Profile  (use empty value to skip)',
  name: 'devToProfileName',
  filter: cleanSocialNetworkUsername
})

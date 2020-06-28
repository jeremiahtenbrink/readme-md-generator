const askDevToName = require('./dev-to')

describe('devToProfileName', () => {
  it('should return correct question format', () => {
    const devToProfileName = 'jeremiahtenbrink'
    const projectInfos = { devToProfileName }
    
    const result = askDevToName(projectInfos)
    
    expect(result)
      .toEqual({
        type: 'input',
        filter: expect.any(Function),
        message: '👤  dev.to Profile  (use empty value to skip)',
        name: 'devToProfileName',
        default: undefined
      })
  })
})

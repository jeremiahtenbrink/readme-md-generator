const inquirer = require('inquirer')
const { flatMap } = require('lodash')
const path = require('path')

const questionsBuilders = require('./questions')
const utils = require('./utils')

/**
 * Ask user questions and return context to generate a README
 *
 * @param {Object} projectInfos
 * @param {Boolean} useDefaultAnswers
 */
module.exports = async (projectInfos, useDefaultAnswers) => {
  const answersContext = {}
  let questions = flatMap(Object.values(questionsBuilders), questionBuilder => {
    return questionBuilder(projectInfos)
  })
  
  const fileExists = utils.doesFileExist(path.join(__dirname, './config.json'))
  if ( fileExists ) {
    await utils.getAnswersFromConfigJson(questions, answersContext)
  }
  questions = questions.filter(question => !(question.name in answersContext))
  let defaultAnswersContext = useDefaultAnswers ? utils.getDefaultAnswers(questions) :
    await inquirer.prompt(questions)
  defaultAnswersContext = { ...defaultAnswersContext, ...answersContext }
  return {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined,
    isProjectOnNpm: utils.isProjectAvailableOnNpm(answersContext.projectName),
    ...defaultAnswersContext
  }
}

const inquirer = require('inquirer')
const { flatMap } = require('lodash')

const questionsBuilders = require('./questions')
const utils = require('./utils')

/**
 * Ask user questions and return context to generate a README
 *
 * @param {Object} projectInfos
 * @param {Boolean} useDefaultAnswers
 */
module.exports = async (projectInfos, useDefaultAnswers) => {
  const questions = flatMap(Object.values(questionsBuilders), questionBuilder => {
    console.log(questionBuilder)
    questionBuilder(projectInfos)
  })
  let answerContext = []
  const fileExists = utils.doesFileExist('./config.json')
  if ( fileExists ) {
    answerContext = await utils.getFromConfigJson(questions, answerContext)
  }
  
  answersContext = useDefaultAnswers ? utils.getDefaultAnswers(questions) :
    await inquirer.prompt(questions)
  
  return {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined,
    isProjectOnNpm: utils.isProjectAvailableOnNpm(answersContext.projectName), ...answersContext
  }
}

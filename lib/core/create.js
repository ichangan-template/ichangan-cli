import download from 'download-git-repo'
import ora from 'ora'
import inquirer from 'inquirer'
import repoMap from '../config/repoMap.js'

const usePlatform = () => {
  return inquirer.prompt([{
    type: "list",
    name: 'platform', // 交互结果会放在这个字段中
    message: "choose platform",
    default: 0,
    choices: [
      { value: 0, name: "mobile" },
      // { value: 1, name: "pc" },
    ]
  }
  ])
}

const useFrame = () => {
  return inquirer.prompt([{
    type: "list",
    name: 'frame',
    message: "choose frame",
    default: 0,
    choices: [
      {
        value: 0, 
        name: "vue"
      },
      // {
      //   value: 1, 
      //   name: "react"
      // }
    ]
  }])
}

const useProjectName = () => {
  return inquirer.prompt([{
    type: 'input',
    name: 'projectName',
    message: 'enter a project name'
  }])
}

const getResult = async () => {
  const platform = await usePlatform()
   const frame = await useFrame()
  return `${platform.platform}${frame.frame}`
}

const createProjectAction = async () => {
  const result = await getResult()
  const { projectName } = await useProjectName()
  console.log('projectName', projectName)
  const spinner = ora('Fetch...').start()

  await download(repoMap[result], `./${projectName}`, { clone: true }, function (error) {
    if (!error) {
      spinner.succeed('success!')
      console.log(`- cd ${projectName}`)
      console.log("- npm install     -- to install dependencies")
      console.log("- npm start       -- to run the project")
      console.log("- npm run build   -- to build the project")  
      return
    } 
    spinner.fail('error!', error)     
  })
  

}

export default createProjectAction
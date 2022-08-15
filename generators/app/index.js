const Generator = require('yeoman-generator')
const makeDir = require('make-dir')
const path = require('path')

const templateTypes = {
  "NODE-TS-JEST": "nodejs-ts-jest"
}

class MyGenerator extends Generator{
  async prompting(){
    this.answers = await this.prompt([
      {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: this.appname,
      store: true
    },
    {
      name: 'description',
      message: 'Description:',
      default: '',
      store: true
    },
    {
      name: 'authorName',
      message: "Author's name:",
      default: this.user.git.name()
    },
    {
      name: 'email',
      message: "Author's email:",
      default: this.user.git.email()
    },
    {
      type:'list',
      name:'templateType',
      message: 'Select a desired template type:',
      choices: [templateTypes['NODE-TS-JEST']]
    }])
  }
  configuring(){
    if (path.basename(this.destinationRoot()) !== this.answers.projectName) {
      return makeDir(this.answers.projectName).then(path => {
        this.destinationRoot(path);
        this.log(`\nGenerating a new project in ${path}\n`);
      });
    }
  }
  writing(){
    if(this.answers.templateType === templateTypes['NODE-TS-JEST']) this.#creatingNodeTemplate(templateTypes['NODE-TS-JEST'])
    
  }

  #renameToDotFile(fileNames){
    
    fileNames.forEach((fileName) => {
      this.fs.move(this.destinationPath(`_${fileName}`), this.destinationPath(`.${fileName}`))
    })
  }

  #creatingNodeTemplate(templateType){
    this.fs.copy(this.templatePath(templateType), this.destinationPath())
    this.#renameToDotFile(['husky', 'eslintignore','eslintrc.js','gitignore','prettierrc'])

  }

  async end(){
    await this.spawnCommand('yarn')
    await this.spawnCommand('yarn', ['prepare'])
    await this.spawnCommand('git',['init', '--quiet'])
    await this.spawnCommand('git',['add', '-A'])
    await this.spawnCommand('git',['commit', '-m "chore: initial commit"'])
    this.log('----------------------')
    this.log('Remember to update project README!')
    this.log('Project created, happy hacking!')
  }

}
module.exports =  MyGenerator
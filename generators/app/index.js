const Generator = require('yeoman-generator')
const makeDir = require('make-dir')
const path = require('path')
const chalk = require('chalk')
const yosay = require('yosay')

const templateTypes = {
  "NODE-TS-JEST": "nodejs-ts-jest"
}

class MyGenerator extends Generator{
  async prompting(){
    await this.spawnCommand('clear')
    console.log(yosay("'Allo, welcome to bkmatic.\nPlease, enter your project info:"))
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
      message: 'Select a project generator:',
      choices: [templateTypes['NODE-TS-JEST']]
    }])
  }
  configuring(){
    if (path.basename(this.destinationRoot()) !== this.answers.projectName) {
      return makeDir(this.answers.projectName).then(path => {
        this.destinationRoot(path);
        this.log(`\n ⏳ Generating a new project in ${chalk.green(path)}\n`);
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
    this.fs.copy([this.templatePath(templateType), `!${this.templatePath(templateType)}/_husky`], this.destinationPath())
    this.fs.copy(`${this.templatePath(templateType)}/_husky`,`${this.destinationPath()}/.husky`)
    this.#renameToDotFile(['eslintignore','eslintrc.js','gitignore','prettierrc'])
  }

  end(){
    
    this.log(chalk.green('\n ⏳ Initializing git...\n'))
    this.spawnCommandSync('git',['init'])
    
    this.log(chalk.cyan('\n ⏳ Installing dependencies, preparing git hooks and husky...\n'))
    this.spawnCommandSync('yarn')

    this.log(chalk.yellow('\n ⏳ Making first commit...\n'))
    this.spawnCommandSync('git',['add', '-A'])
    this.spawnCommandSync('git',['commit', '-m chore: initial commit'])

    this.log(chalk.bold('\n----------------------\n'))
    this.log(chalk.bold(` ⚠️ Remember to ${chalk.underline('update project README!')}`))
    this.log(`\n ✅ Project scaffold has been ${chalk.green('created')}, have fun 🎉\n`)
  }

}
module.exports =  MyGenerator
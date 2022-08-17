# BK's yeoman generator for projects scaffolding
## Table of Contents

- [Project description](#project-description)
  - [Available templates](#available-templates)
  - [TO-DO](#to-do)
  - [Technologies](#technologies)
- [How to use the project](#how-to-use-the-project)
  - [Installation](#installation)
  - [Starting](#Starting)
  - [Requirements and considerations](#requirements-and-considerations)
- [License](#license)

---

## Project description

Yeoman generator for bootstrapping web projects.

### Available templates:

* Nodejs-ts-jest: generates a scaffold for a simple nodejs app. Template reference: https://github.com/bklobertanz/nodejs-app-template 


### TO-DO

- Automatically use user input to update README.md and package.json files.

### Technologies

- nodejs
- yeoman-generator
- yosay
- yo
- chalk

[Back to the Top](#table-of-contents)

---

## How to use the project

### Requirements and considerations

- You need yarn installed.
- Project's folder name must start with `generator`.
- Install yo globally: 
```
$ yarn global add yo
```



### Installation

```
$ yarn
$ yarn link
```


### Usage
 Do:
```
$ yo bkmatic
```
And follow prompted instructions.

[Back to the Top](#table-of-contents)

---

## License

MIT

[Back to the Top](#table-of-contents)

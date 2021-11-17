const chalk = require('chalk');
const validator = require('validator');

if(validator.isEmail("abc@gmail.org")){
    console.log(chalk.green("Valid Email"));
}else{
    console.log(chalk.red("Not valid"));
}

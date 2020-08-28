const inquirer = require('inquirer');

module.exports = async () => {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: `请选择一个环境`,
      choices: [
        {
          name: 'Master', value: 'master'
        },
        {
          name: 'Test', value: 'test'
        }
      ]
    }
  ]);
  console.log(action);
}

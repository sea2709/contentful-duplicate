const ora = require('ora');

const menus = {
  main: `
    contentful-duplicate [command] <options>

    version ............ show package version
    help ............... show help menu for a command`,
};

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0];

  ora().info(menus[subCmd] || menus.main);
};

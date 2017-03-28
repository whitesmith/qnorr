const printTask = require('../utils/print-task.js');
const exit = require('exit');

function run(args) {
  const tasks = require('require-all')(__dirname);
  let arg_obj = require('minimist')(args, {string: "blueprint"});

  console.log("QUICKIE: The best thing to happen since tantric sex.");
  console.log("----------------------------------------------------");
  for (let name in tasks) {
    printTask(tasks[name]);
    console.log();
  }

  exit(0);
}

module.exports = {
  handler: run,
  usage: "quickie help",
  description: "Shows this help message."
}

const printTask = require('../utils/print-task.js');
const exit = require('exit');

function run(args) {
  const tasks = require('require-all')(__dirname);
  let arg_obj = require('minimist')(args, {string: "blueprint"});

  console.log("Qnorr: Just add water and enjoy.");
  console.log("--------------------------------");
  for (let name in tasks) {
    printTask(tasks[name]);
    console.log();
  }

  exit(0);
}

module.exports = {
  handler: run,
  usage: "qnorr help",
  description: "Shows this help message."
}

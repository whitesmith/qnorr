function run() {
  const tasks = require('require-all')(__dirname);
  
  console.log("QUICKIE: The best thing to happen since tantric sex.");
  console.log("----------------------------------------------------");
  for (let name in tasks) {
    printTask(tasks[name]);
    console.log();
  }

}

function printTask(task) {
  console.log(task.usage);
  console.log("\t" + task.description);
}

module.exports = {
  handler: run,
  usage: "quickie help",
  description: "Shows this help message."
}

const fs = require('fs');
const existsSync = require('exists-sync');
const shell = require("shelljs");
const quickie_repo = "git@github.com:whitesmith/quickie.git";

function run(project_name) {

  if (existsSync(project_name)) {
    console.error("Specified directory already exists :(.");
    exit(1);
  }

  fs.mkdirSync(project_name);
  shell.exec(["git clone", quickie_repo, project_name].join(" "));
  process.chdir(project_name);
  shell.exec("rm -rf ./cd bin");
  shell.exec("rm -rf .git && git init && git add . && git commit -am 'Quickie initial commit.'");
  shell.exec("npm install");

  exit(0);
}

module.exports = {
  handler: run,
  usage: "quickie new <project-name>",
  description: "Creates a new project using quickie in a new folder with the specified name."
}

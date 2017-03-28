const exit = require('exit');
const fs = require('fs-extra');
const shell = require('shelljs');
const resolveBlueprint = require('../utils/resolve-blueprint.js');
const GIT_SETUP_CMD = "git init && git add . && git commit -am 'Quickie initial commit.'";

function run(args) {
  let arg_obj = require('minimist')(args, {string: "blueprint"});

  let project_name = arg_obj._[0];
  if(!project_name) {
    console.error("You must specify a project name :(.");
    console.error("See quickie help for command instructions");
    exit(1);
  }

  let blueprint_src = resolveBlueprint(arg_obj.blueprint);
  if (!blueprint_src) {
    console.error("Invalid blueprint selected :(.");
    exit(1);
  }

  if (fs.existsSync(project_name)) {
     console.error("Specified directory already exists :(.");
     exit(1);
  }

  console.log("Creating the new project directory...");
  fs.copySync(blueprint_src, project_name);
  process.chdir(project_name);

  console.log("Installing dependencies via NPM...");
  if (shell.exec("npm install").code !== 0) {
    console.error("There was an error while installing dependencies.");
    console.error("Please try running `npm install` in your project directory manually");
    exit(1);
  }

  console.log("Setting up git repository...");
  if (shell.exec(GIT_SETUP_CMD).code !== 0) {
    console.error("There was an error setting up Git.");
    console.error("Please initialize your repo manually.");
    exit(1);
  }

  exit(0);
}

module.exports = {
  handler: run,
  usage: "quickie new <project-name>",
  description: "Creates a new project using quickie in a new folder with the specified name."
}

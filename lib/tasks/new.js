const exit = require('exit');
const fs = require('fs-extra');
const shell = require('shelljs');
const resolveBlueprint = require('../utils/resolve-blueprint.js');
const GIT_SETUP_CMD = "git init && git add . && git commit -am 'Quickie initial commit.'";
const replace = require('replace');

function run(args) {
  let arg_obj = require('minimist')(args, {string: "blueprint"});
  let environment = {};

  // TODO: Extra arguments in the function call could be used to setup Extra
  // environmental variables that would replace other keywords in the blueprints
  environment.project_name = arg_obj._[0];
  if(!environment.project_name) {
    console.error("You must specify a project name :(.");
    console.error("See quickie help for command instructions");
    exit(1);
  }

  let blueprint = resolveBlueprint(arg_obj.blueprint);
  if (!blueprint) {
    console.error("Invalid blueprint selected :(.");
    exit(1);
  }

  if (fs.existsSync(environment.project_name)) {
     console.error("Specified directory already exists :(.");
     exit(1);
  }

  console.log("Creating the new project directory...");
  fs.copySync(`${blueprint.root}/files`, environment.project_name);
  process.chdir(environment.project_name);

  console.log("Setting up blueprint files...");
  for(let keyword of blueprint.keywords_to_replace) {
    console.log(keyword)
    replace({
      regex: `<%= ${keyword} %>`,
      replacement: environment[keyword],
      paths: ['.'],
      recursive: true,
      silent: true,
    });
  }


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

const BLUEPRINT_ROOT = __dirname + '/../../blueprints/';
const DEFAULT_BLUEPRINT = 'default';
const fs = require('fs-extra');

function resolveBlueprint(name) {
  if (!name || name == '') {
    return BLUEPRINT_ROOT + DEFAULT_BLUEPRINT;
  }

  if (fs.existsSync(BLUEPRINT_ROOT + name)) {
    return BLUEPRINT_ROOT + name;
  } else {
    return null; //Why this instead of throwing an error? Dunno
  }
}

module.exports = resolveBlueprint;

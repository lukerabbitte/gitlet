// TODO init must create a hidden .git folder and create objects subdirectory within. Optionally, create 16x16=256 two-digit hex prefix directories.

const fs = require('fs');
const path = require('path');

const gitletStructure = {
  HEAD: "ref: refs/heads/master\n",
  objects: {},
  refs: {
    heads: {},  // excluding remotes and tags for the time being. Tags are just annoation linked to other object ID.
  }
};

const gitDirectoryPath = path.join(process.cwd(), '.gitto');

if (!fs.existsSync(gitDirectoryPath)) {
  fs.mkdirSync(gitDirectoryPath);
}

function initGitRepository(structure, prefix) {
  Object.keys(structure).forEach((name) => {
      const itemPath = path.join(prefix, name);

      if (typeof structure[name] === 'string') {
        fs.writeFileSync(itemPath, structure[name]);
      } else if (typeof structure[name] === 'object') {
        fs.mkdirSync(itemPath);
        initGitRepository(structure[name], itemPath); // recursive call for all subdirectories
      }
  });
}

initGitRepository(gitletStructure, gitDirectoryPath);

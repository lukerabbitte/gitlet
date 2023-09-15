// TODO init must create a hidden .git folder and create objects subdirectory within. Optionally, create 16x16=256 two-digit hex prefix directories.

const fs = require('fs');
const path = require('path');

function initGitRepository() {

    var gitletStructure = {
        HEAD: "ref: refs/heads/master\n",
        objects: {},
        refs: {
          heads: {},
        }
    };

    files.writeFilesFromTree(gitletStructure, process.cwd());
}

function writeFilesFromTree(tree, prefix) {

    Object.keys(tree).forEach(function(name) {
      var path = nodePath.join(prefix, name);
      if (util.isString(tree[name])) {
        fs.writeFileSync(path, tree[name]);
      } else {
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, `0o777`); 
        }

        files.writeFilesFromTree(tree[name], path);
      }
    });

  }

initGitRepository();

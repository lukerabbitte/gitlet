const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const Blob = require('./blob.js');

function gitAdd(filename) {
  
  // Read the file content
  const content = fs.readFileSync(filename, 'utf8');
  const blob = new Blob(content);
  const hash = blob.getHash();
  const blobDir = hash.slice(0, 2); // first two characters of hash as object directory names
  const blobFile = hash.slice(2);   // rest of hash as object file name

  if (!fs.existsSync(blobDir)) {
    fs.mkdirSync(blobDir, { recursive: true });
  }
  fs.writeFileSync(blobFile, content); // TODO no compression or serialisation of original content for now
    // If we were to add compression or serialisation, we would need to add an extra step to decompress or deseralise when running cat-file -p.

  // Add the file to the index
  const indexFile = path.join('.gitto', 'index');
  let index = {};

  if (fs.existsSync(indexFile)) {
    index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
  }
  index[filename] = content;    // map filenames to content in index file
  fs.writeFileSync(indexFile, JSON.stringify(index));

}

function gitCommit(message) {
  /*
    The git commit command takes those staged changes and creates trees pointing to all of the new blobs,
    then creates a new commit object pointing to the new root tree. Finally, git commit also updates the
    current branch to point to the new commit.
  */

  // TODO refactor to load tree as an object just like blob, except tree basically represents a directory
  // rather than a file - it can reference files and also trees (subdirectories).

  // Load the index
  const indexFile = path.join('.gitto', 'index');
  const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));

  // Create a tree object for the current state of the index
  const tree = {};
  for (const [filename, hash] of Object.entries(index)) {
    tree[filename] = { type: 'blob', hash };
  }
  const treeHash = crypto.createHash('sha1').update(JSON.stringify(tree)).digest('hex');
  const treeDir = path.join('.gitto', 'objects', treeHash.slice(0, 2));
  const treeFile = path.join(treeDir, treeHash.slice(2));
  if (!fs.existsSync(treeDir)) {
    fs.mkdirSync(treeDir, { recursive: true });
  }
  fs.writeFileSync(treeFile, JSON.stringify(tree));

  // Create a commit object
  const commit = { tree: treeHash, message };
  const commitHash = crypto.createHash('sha1').update(JSON.stringify(commit)).digest('hex');
  const commitDir = path.join('.gitto', 'objects', commitHash.slice(0, 2));
  const commitFile = path.join(commitDir, commitHash.slice(2));
  if (!fs.existsSync(commitDir)) {
    fs.mkdirSync(commitDir, { recursive: true });
  }
  fs.writeFileSync(commitFile, JSON.stringify(commit));

  // Update the current branch to point to the new commit
  const headFile = path.join('.gitto', 'HEAD');
  const branch = fs.readFileSync(headFile, 'utf8').split(' ')[1].trim();
  const branchFile = path.join('.gitto', 'refs', 'heads', branch);
  fs.writeFileSync(branchFile, commitHash);
}
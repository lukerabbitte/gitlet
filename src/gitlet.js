const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const Blob = require('./blob.js');

// Set up the index file before adding any files
const indexFile = path.join('.gitto', 'index');

// git add
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

  // Add the file to the index
  const indexFile = path.join('.gitto', 'index');
  let index = {};

  if (fs.existsSync(indexFile)) {
    index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
  }
  index[filename] = content;    // map filenames to content in index file
  fs.writeFileSync(indexFile, JSON.stringify(index));
  
}
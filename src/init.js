// TODO init must create a hidden .git folder and create objects subdirectory within. Optionally, create 16x16=256 two-digit hex prefix directories.

const fs = require('fs');
const path = require('path');

function createDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
        console.log(`Created directory: ${directoryPath}`);
    } else {
        console.log(`Directory already exists: ${directoryPath}`);
    }
}

function initGitRepository() {
    const gitFolderPath = path.join(process.cwd(), '.git');
    const objectsFolderPath = path.join(gitFolderPath, 'objects');

    createDirectory(gitFolderPath);
    createDirectory(objectsFolderPath);
}

initGitRepository();

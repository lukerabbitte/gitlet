const chai = require('chai');
const fs = require('fs');
const path = require('path');
const { initializeGitRepository } = require('../src/init.js');

const expect = chai.expect;

describe('initializeGitRepository', () => {
  const testDir = path.join(__dirname, 'test_repository');

  // Mocha hook before test run.
  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
  });

  // Remove test directory after each test run.
  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir, { recursive: true });
    }
  });

  it('should initialize a Git repository with the correct structure', () => {
    const gitletStructure = {
      HEAD: 'ref: refs/heads/master\n',
      objects: {},
      refs: {
        heads: {},
      },
    };

    initializeGitRepository(gitletStructure, testDir);

    // Assert that the .git directory and its structure are created correctly
    expect(fs.existsSync(path.join(testDir, '.git'))).to.be.true;
    expect(fs.existsSync(path.join(testDir, '.git', 'HEAD'))).to.be.true;
    expect(fs.existsSync(path.join(testDir, '.git', 'objects'))).to.be.true;
    expect(fs.existsSync(path.join(testDir, '.git', 'refs', 'heads'))).to.be.true;
  });
});

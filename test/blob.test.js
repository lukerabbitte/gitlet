const fs = require('fs');
const { expect } = require('chai');
const Blob = require('../src/blob.js');

describe('Blob', () => {

  it('should create a Blob from a text file', () => {
    const filePath = 'sample_repo/text/message1.txt';
    const data = fs.readFileSync(filePath, 'utf-8');
    const mimeType = 'text/plain';

    const blob = new Blob(data, mimeType);

    expect(blob.getContent()).to.equal(data);
    expect(blob.getMimeType()).to.equal(mimeType);
  });

  it('should create a Blob from an image file', () => {
    const filePath = 'sample_repo/image/lorem_ipsum.png';
    const data = fs.readFileSync(filePath);
    const mimeType = 'image/jpeg';

    const blob = new Blob(data, mimeType);

    expect(blob.getMimeType()).to.equal(mimeType);
  });

  // TODO add more tests
});

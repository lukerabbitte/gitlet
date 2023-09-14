const fs = require('fs');
const { expect } = require('chai');
const Blob = require('../blob');

describe('Blob', () => {
  it('should create a Blob from a text file', () => {
    const filePath = 'sample_repo/messages/message1.txt'; 
    const data = fs.readFileSync(filePath, 'utf-8');
    const mimeType = 'text/plain';

    const blob = new Blob(data, mimeType);

    expect(blob.getContent()).to.equal(data);
    expect(blob.getMimeType()).to.equal(mimeType);
  });

  it('should create a Blob from an image file', () => {
    const filePath = 'path/to/your/image.jpg'; // Replace with the actual file path
    const data = fs.readFileSync(filePath);
    const mimeType = 'image/jpeg';

    const blob = new Blob(data, mimeType);

    // Additional assertions for image-specific properties
    expect(blob.getContent()).to.deep.equal(data);
    expect(blob.getMimeType()).to.equal(mimeType);
  });
});

const { createHash } = require('crypto');

class Blob {
    
    constructor(data, mimeType) {
        this.data = data;
        this.mimeType = mimeType;
        this.id = this.hash(data); // Call the hash method with 'this.'
    }

    hash(string) {
        return createHash('sha256').update(string).digest('hex');
    }

    getContent() {
        return this.data;
    }

    getId() {
        return this.id;
    }

    getMimeType() {
        return this.mimeType;
    }
}

const blobData = "This is string data.";
const mimeType = "text/plain"; // Example MIME type for text data
const blob = new Blob(blobData, mimeType);

console.log("Blob ID:", blob.getId());
console.log("Blob Content:", blob.getContent());
console.log("Blob MIME Type:", blob.getMimeType());

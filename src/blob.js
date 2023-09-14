const { createHash } = require('crypto');

class Blob {
    
    // Properties are data, MIME type, and cryptographic ID
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

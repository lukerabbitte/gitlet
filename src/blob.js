const { createHash } = require('crypto');

class Blob {
    
    // Properties are data, MIME type, and cryptographic ID
    constructor(data, mimeType) {
        this.data = data;
        this.mimeType = mimeType;
    }

    hash(string) {
        return createHash('sha1').update(string).digest('hex');
    }

    getContent() {
        return this.data;
    }

    getId() {
        return this.hash(data);
    }

    getMimeType() {
        return this.mimeType;
    }
}

module.exports = Blob;
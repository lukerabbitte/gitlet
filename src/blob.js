const { createHash } = require('crypto');

class Blob {
    
    constructor(data) {
        this.data = data;
    }

    hash(string) {
        return createHash('sha1').update(string).digest('hex');
    }

    getContent() {
        return this.data;
    }

    getHash() {
        return this.hash(data); // data will always hash to same thing
    }
}

module.exports = Blob;
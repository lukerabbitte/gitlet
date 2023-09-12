const { createHash } = require('crypto');

class Blob {
    
    constructor(data) {
      this.data = data;
      this.id = this.hash
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
}
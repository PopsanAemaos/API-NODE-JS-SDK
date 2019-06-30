const shajs = require('./hash.js/lib/hash/sha/256')

// hash(61050262)   
    function hash(KEY) {
        var key_hash = shajs('sha256').update(KEY).digest('hex')
        // Key Hash User =>  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
        if (key_hash.length==64 ) {
                return key_hash
            }else {
                logger.error(`${KEY}===hash===>${key_hash}`)
            }
    }

module.exports = {hash:hash}

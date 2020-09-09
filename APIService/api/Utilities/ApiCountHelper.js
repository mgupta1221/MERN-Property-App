const fs = require('fs')
var FILE_PATH = '/stats.json'
var path = require('path');


module.exports = {
    readAPIHits: function () {
        let result = {}
        try {
            result = JSON.parse(fs.readFileSync(path.join(__dirname, '../files') + FILE_PATH))
        } catch (err) {
            console.error(err)
        }
        return result;
    },

    increaseAPIHit: function () {
        try {
            let result = {}
            stats = JSON.parse(fs.readFileSync(path.join(__dirname, '../files') + FILE_PATH))
            const event = `count`
            stats[event] = stats[event] ? stats[event] + 1 : 1
            fs.writeFileSync(path.join(__dirname, '../files') + FILE_PATH, JSON.stringify(stats), { flag: 'w+' })
        } catch (err) {
            console.error(err)
        }
    }
}

const Util = require('../../util/Util');
const log = require("log4js").getLogger("TagService");
const TagDao = require('./TagDao');

class TagService {
    constructor() {
        this.TagDao = new TagDao();
    }

    async retrieveAllTag(req) {
        try {
            return await this.TagDao.findAllTags();
        } catch (err) {
            Util.throwUpErr(log, err, 'retrieveAllTag');
        }
    }

}

module.exports = TagService;
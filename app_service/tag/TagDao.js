const Util = require('../../util/Util');
const log = require("log4js").getLogger("TagDao");
const AbstractDao = require('../_abstract/AbstractDao');
const TagModel = require('../../app_model/Tag');

class TagDao extends AbstractDao {
    constructor() {
        super(TagModel);
    }

    async findTagById(id) {
        try {
            return await this.findDocumentById(id);
        } catch (err) {
            Util.throwUpErr(log, err, 'findTagById');
        }
    }

    async findAllTags() {
        try {
            const query = { active: true };
            return await this.findDocuments(query);
        } catch (err) {
            Util.throwUpErr(log, err, 'findAllTags');
        }
    }

    async findOneTag(query) {
        try {
            return await this.findOneDocument(query);
        } catch (err) {
            Util.throwUpErr(log, err, 'findOneTag');
        }
    }

}

module.exports = TagDao;
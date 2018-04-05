const Util = require('../../util/Util');
const log = require("log4js").getLogger("ResourceDao");
const AbstractDao = require('../_abstract/AbstractDao');
const ResourceModel = require('../../app_model/Resource');

class ResourceDao extends AbstractDao {
    constructor() {
        super(ResourceModel);
    }

    async findResourceById(id) {
        try {
            return await this.findDocumentById(id);
        } catch (err) {
            Util.throwUpErr(log, err, 'findResourceById');
        }
    }

    async findAllResources() {
        try {
            const query = { active: true };
            return await this.findDocuments(query);
        } catch (err) {
            Util.throwUpErr(log, err, 'findAllResources');
        }
    }

}

module.exports = ResourceDao;
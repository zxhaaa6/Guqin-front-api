const Util = require('../../util/Util');
const log = require("log4js").getLogger("ResourceService");
const ResourceDao = require('./ResourceDao');

class ResourceService {
    constructor() {
        this.ResourceDao = new ResourceDao();
    }

    async retrieveAllResource() {
        try {
            return await this.ResourceDao.findAllResources();
        } catch (err) {
            Util.throwUpErr(log, err, 'getAllResource');
        }
    }

}

module.exports = ResourceService;
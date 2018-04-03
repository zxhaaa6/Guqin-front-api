const Promise = require("bluebird");
const log = require("log4js").getLogger("AbstractDao");
const Util = require("../../util/Util");
const mongoose = require('mongoose');
const resolve = function(res) {
    res();
};

class AbstractDao {
    constructor(model) {
        this.collection = model;
    }

    async findDocumentById(id) {
        try {
            id = mongoose.Types.ObjectId(id);
            return await this.collection.findOne({ _id: id });
        } catch (err) {
            Util.throwUpErr(log, err, 'findDocumentById');
        }
    }

    async findDocuments(query) {
        try {
            if (query._id) {
                query._id = mongoose.Types.ObjectId(query._id);
            }
            return await this.collection.find(query);
        } catch (err) {
            Util.throwUpErr(log, err, 'findDocuments');
        }
    }

    async findOneDocument(query) {
        try {
            if (query._id) {
                query._id = mongoose.Types.ObjectId(query._id);
            }
            return await this.collection.findOne(query);
        } catch (err) {
            Util.throwUpErr(log, err, 'findOneDocument');
        }
    }

}

module.exports = AbstractDao;
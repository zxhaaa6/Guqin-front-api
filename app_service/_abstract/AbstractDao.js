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
            if (Util.checkObjectId(id)) {
                id = mongoose.Types.ObjectId(id);
                return await this.collection.findOne({ _id: id });
            }
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

    async countDounments(query) {
        try {
            return await this.collection.count(query);
        } catch (err) {
            Util.throwUpErr(log, err, 'countDounments');
        }
    }

    async findDocumentsPages(query, sort, skip, limit) {
        try {
            return await this.collection.find(query).sort(sort).skip(skip).limit(limit).lean();
        } catch (err) {
            Util.throwUpErr(log, err, 'findDocumentsPages');
        }
    }

    async createDocument(data) {
        try {
            //return await this.collection.create(data);
            this.instance = new this.collection(data);
            return await this.instance.save();
        } catch (err) {
            Util.throwUpErr(log, err, 'createDocument');
        }
    }

    async updateDocuments(query, setData) {
        try {
            setData.dateModified = new Date();
            return await this.collection.update(query, { $set: setData });
        } catch (err) {
            Util.throwUpErr(log, err, 'updateDocuments');
        }
    }

    async deleteDocumentById(id) {
        try {
            if (Util.checkObjectId(id)) {
                const query = { _id: id };
                const setData = { active: false };
                return await this.updateDocuments(query, setData);
            }
        } catch (err) {
            Util.throwUpErr(log, err, 'deleteDocumentById');
        }

    }

}

module.exports = AbstractDao;
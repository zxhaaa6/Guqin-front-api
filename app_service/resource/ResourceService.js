const moment = require('moment');
const Util = require('../../util/Util');
const log = require("log4js").getLogger("ResourceService");
const ResourceDao = require('./ResourceDao');
const CategoryCacheService = require('../category/CategoryCacheService');
const TagCacheService = require('../tag/TagCacheService');
const UserCacheService = require('../user/UserCacheService');

class ResourceService {
    constructor() {
        this.ResourceDao = new ResourceDao();
        this.CategoryCacheService = new CategoryCacheService();
        this.TagCacheService = new TagCacheService();
        this.UserCacheService = new UserCacheService();
    }

    async retrieveAllResource(req) {
        try {
            let query = {};
            const pageSize = req.pageSize ? Number(req.pageSize) : 10;
            const currentPage = req.page ? Number(req.page) : 1;
            if (req.title) {
                query.title = new RegExp(req.title, 'i');
            }
            if (req.text) {
                query.text = new RegExp(req.text, 'i');
            }
            if (req.categoryLa && req.categoryLa !== 'null') {
                query.categoryLaId = req.categoryLa;
            }
            if (req.tag && req.tag !== 'null') {
                query.tagId = req.tag;
            }
            if (req.publishDate) {
                const start = new Date(req.publishDate + ' 00:00:00'),
                    end = new Date(req.publishDate + ' 23:59:59');
                query = {
                    $and: [
                        { dateCreated: { $gte: start } },
                        { dateCreated: { $lte: end } }
                    ]
                };
            }
            if (req.id) {
                if (Util.checkObjectId(req.id)) {
                    query = { _id: req.id };
                } else {
                    Util.throwErr(log, 400, '_id is wrong');
                }
            }
            const totalCount = await this.ResourceDao.countResource(query);
            const pageCount = Math.ceil(totalCount / pageSize);
            const start = (currentPage - 1) * pageSize;
            const sort = { dateModified: -1 };

            const results = await this.ResourceDao.findResourcePages(query, sort, start, pageSize);
            for (let i = 0; i < results.length; i++) {
                const categoryLa = await this.CategoryCacheService.getCategory(results[i].categoryLaId);
                results[i].categoryLaName = categoryLa ? categoryLa.name : '';
                results[i].tags = [];
                for (let j of results[i].tagId) {
                    const tag = await this.TagCacheService.getTag(j);
                    results[i].tags.push(tag ? tag.name : '');
                }
                const author = await this.UserCacheService.getUser(results[i].authorId);
                results[i].authorName = author ? author.name : '';
                results[i].dateCreated = moment(results[i].dateCreated).format('YYYY-MM-DD HH:mm:ss');
                results[i].dateModified = moment(results[i].dateModified).format('YYYY-MM-DD HH:mm:ss');
            }
            return {
                pageSize: pageSize,
                currentPage: currentPage,
                pageCount: pageCount,
                totalCount: totalCount,
                dataList: results,
            };
        } catch (err) {
            Util.throwUpErr(log, err, 'retrieveAllResource');
        }
    }

    async createResource(data) {
        try {
            const saveData = {
                categoryLaId: data.categoryLa,
                tagId: data.tags,
                title: data.title,
                description: data.description,
                text: data.text,
                authorId: data.authorId
            };
            return await this.ResourceDao.createResource(saveData);
        } catch (err) {
            Util.throwUpErr(log, err, 'createResource');
        }
    }

    async updateResourceById(id, data) {
        try {
            const setData = {
                categoryLaId: data.categoryLa,
                tagId: data.tags,
                title: data.title,
                description: data.description,
                text: data.text
            };
            await this.ResourceDao.updateResourceById(id, setData);
            return { id };
        } catch (err) {
            Util.throwUpErr(log, err, 'updateResourceById');
        }
    }

    async deleteResourceById(id) {
        try {
            await this.ResourceDao.deleteResourceById(id);
            return { id };
        } catch (err) {
            Util.throwUpErr(log, err, 'deleteResourceById');
        }
    }

}

module.exports = ResourceService;
const Util = require('../../util/Util');
const log = require("log4js").getLogger("ResourceService");
const ResourceDao = require('./ResourceDao');
const CategoryCacheService = require('../category/CategoryCacheService');
const TagCacheService = require('../tag/TagCacheService');

class ResourceService {
    constructor() {
        this.ResourceDao = new ResourceDao();
        this.CategoryCacheService = new CategoryCacheService();
        this.TagCacheService = new TagCacheService();
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
                const start = req.publishDate + ' 00:00:00',
                    end = req.publishDate + ' 23:59:59';
                query = {
                    $and: [
                        { dateCreated: { $gte: start } },
                        { dateCreated: { $lte: end } }
                    ]
                };
            }
            if (req.id) {
                query = { _id: req.id };
            }
            const totalCount = await this.ResourceDao.countResource(query);
            const pageCount = Math.ceil(totalCount / pageSize);
            const start = (currentPage - 1) * pageSize;
            const sort = { dateModified: -1 };

            const results = await this.ResourceDao.findResourcePages(query, sort, start, pageSize);
            for (let i = 0; i < results.length; i++) {
                const categoryLa = await this.CategoryCacheService.getCategory(results[i].categoryLaId);
                results[i].categoryLaName = categoryLa.name;
                results[i].tags = [];
                for (let j of results[i].tagId) {
                    const tag = await this.TagCacheService.getTag(j);
                    results[i].tags.push(tag.name);
                }
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

}

module.exports = ResourceService;
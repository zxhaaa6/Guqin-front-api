import log4js from 'log4js';
import * as Util from '../../util/Util';
import AbstractDao from '../_abstract/AbstractDao';
import ResourceModel from '../../app_model/Resource';

const log = log4js.getLogger('ResourceDao');

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

  async countResource(query) {
    try {
      query.active = true;
      return await this.countDounments(query);
    } catch (err) {
      Util.throwUpErr(log, err, 'countResource');
    }
  }

  async findResourcePages(query, sort, start, pageSize) {
    try {
      query.active = true;
      sort = sort || { dateModified: 'desc' };
      return await this.findDocumentsPages(query, sort, start, pageSize);
    } catch (err) {
      Util.throwUpErr(log, err, 'countResource');
    }
  }

  async createResource(doc) {
    try {
      return await this.createDocument(doc);
    } catch (err) {
      Util.throwUpErr(log, err, 'createResource');
    }
  }

  async updateResourceById(id, setData) {
    try {
      if (Util.checkObjectId(id)) {
        const query = {
          _id: id,
        };
        return await this.updateDocuments(query, setData);
      }
    } catch (err) {
      Util.throwUpErr(log, err, 'updateResourceById');
    }
  }

  async deleteResourceById(id) {
    try {
      return await this.deleteDocumentById(id);
    } catch (err) {
      Util.throwUpErr(log, err, 'deleteResourceById');
    }
  }
}

export default ResourceDao;

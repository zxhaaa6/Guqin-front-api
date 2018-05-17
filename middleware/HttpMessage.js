const messageType = {
  SYS_ERR: 'sys_err',
  400: 'bad request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not found',
  406: 'not acceptable',
  500: 'internal server error',
};

class BasicMessage {
  constructor(isSuccess, status, message, data) {
    this.success = isSuccess;
    this.status = status;
    this.message = message;
    if (data) {
      if (data.currentPage) {
        this.pageCount = data.pageCount;
        this.currentPage = data.currentPage;
        this.pageSize = data.pageSize;
        this.total = data.totalCount;
        this.data = data.dataList;
      } else {
        this.data = data;
      }
    } else {
      this.data = null;
    }
  }

  static genMessageTitle(errorCode) {
    return `${messageType[errorCode]}: `;
  }
}

export default BasicMessage;

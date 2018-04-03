const messageType = {
    SYS_ERR: 'sys_err',
    400: 'bad request',
    401: 'unauthorized',
    403: 'forbidden',
    404: 'not found',
    406: 'not acceptable',
    500: 'internal server error'
};

const BasicMessage = exports.BasicMessage = function(isSuccess, status, message, data) {
    this.success = isSuccess;
    this.status = status;
    this.message = message;
    if (data) {
        if (data.page) {
            this.start = data.start;
            this.limit = data.limit;
            this.totalCount = data.totalCount;
            this.data = data.dataList;
        } else {
            this.data = data;
        }
    } else {
        this.data = null;
    }
};
const genMessageTitle = exports.genMessageTitle = function(errorCode) {
    return messageType[errorCode] + ': ';
};
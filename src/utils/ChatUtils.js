

export const formatMessage = item => {
    let message = {};
    message.content = item.message
    message.userId = item._sender?.userId
    return message;
};
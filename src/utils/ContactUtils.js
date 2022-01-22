

export const getContactFromUserList = (items, currentUser) => {
    let userInfo = {}
    items.members.forEach(user => {
        if (user.userId !== currentUser) {
            userInfo = user;
        }
    });
    return userInfo;
};
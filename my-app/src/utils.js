/*
* 根据用户信息 返回跳转地址
* user.type /boss /genius
* user.avatar /bassInfo /geniusInfo
* */
export function getRedirectPath({type, avatar}) {
    let url = (type === 'boss') ? '/boss' : '/genius';
    if(!avatar) url += 'Info';
    return url;
}

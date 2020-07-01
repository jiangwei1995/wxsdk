/**
* Created by jiangwei on 2020/07/01 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/
const { createHash } = require('crypto');
/**
 * @param {string} algorithm
 * @param {any} content
 *  @return {string}
 */
const encrypt = (algorithm, content) => {
    let hash = createHash(algorithm)
    hash.update(content)
    return hash.digest('hex')
}
/**
 * @param {any} content
 *  @return {string}
 */
const sha1 = (content) => encrypt('sha1', content);
/**
 * @param {any} content
 *  @return {string}
 */
const md5 = (content) => encrypt('md5', content);
/**
 * 校验微信事件推送接口 验签
 * @param {number} timestamp 
 * @param {number} nonce 
 * @param {string|number} token 
 */
const checkSignature = (timestamp, nonce, token) => {
    let tmpArr = [token + '', nonce + '', timestamp + ''];
    tmpArr = tmpArr.sort();
    let tmpStr = tmpArr.join("");
    return sha1(tmpStr);
}
module.exports = { sha1, md5, checkSignature }
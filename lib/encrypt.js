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

module.exports = { sha1, md5 }
/**
* Created by jiangwei on 2020/07/02 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/

const Redis = require("ioredis");
const rp = require("request-promise");
const { sha1 } = require("./encrypt");
const Gzh = require("./gzh")
/**
 * 微信网页开发 jssdk 
 */
class JsSdk {
    /**
     * 
     * @param {Gzh} gzh 
     */
    constructor(gzh, redisOption, jsapi_ticket_key, access_token_key) {
        if (gzh instanceof Gzh) {
            this.gzh = gzh;
        } else {
            throw new Error("初始化 参数错误");
        }
        this.jsapi_ticket_key = jsapi_ticket_key || this.gzh.jsapi_ticket_key;
        this.access_token_key = access_token_key || this.gzh.access_token_key;
        if (redisOption) {
            this.redisClient = new Redis(redisOption || {
                port: 6379, // Redis port
                host: "127.0.0.1", // Redis host
                db: 0,
            });
        } else {
            this.redisClient = this.gzh.redisClient;
        }
        this.host = "https://api.weixin.qq.com";
    }
    /**
     * 获取jsapi_ticket
     * @param {string} jsapi_ticket_key 
     * @param {number} expires_in 
     */
    async jsapi_ticket(jsapi_ticket_key, expires_in, access_token_key) {
        let ticket;
        const cache = await this.redisClient.get(jsapi_ticket_key || this.jsapi_ticket_key);
        if (cache) {
            ticket = cache;
        } else {
            const access_token = await this.gzh.access_token(access_token_key || this.access_token_key);
            const options = {
                uri: `${this.host}/cgi-bin/ticket/getticket`,
                qs: {
                    access_token: access_token,
                    type: "jsapi"
                },
                json: true
            };
            const body = await rp(options);
            if (body.errcode === 0 && body.errmsg === "ok") {
                ticket = body.ticket;
                await this.redisClient.set(jsapi_ticket_key || this.jsapi_ticket_key, body.ticket, "EX", expires_in || body.expires_in);
            } else {
                result = body;
            }
        }
        if (!ticket) {
            throw new Error(`ticket 获取失败`);
        }
        return ticket;
    }
    /**
     * jssdk签名
     * @param {string} jsapiTicket 
     * @param {string} url 
     * @param {string} noncestr 
     * @param {number} timestamp 
     * @return {sign, noncestr, timestamp}
     */
    signature(jsapiTicket, url, noncestr, timestamp) {
        let _noncestr = noncestr;
        let _timestamp = timestamp;
        if (!_noncestr) {
            _noncestr = this.createNoncestr();
        }
        if (!timestamp) {
            _timestamp = this.createTimestamp();
        }
        const str = `jsapi_ticket=${jsapiTicket}&noncestr=${_noncestr}&timestamp=${_timestamp}&url=${url}`;
        const sign = sha1(str);
        return {
            sign: sign,
            noncestr: _noncestr,
            timestamp: _timestamp,
        };
    }
    /**
     * 生成随机数
     * @return {string}
     */
    createNoncestr() {
        return Math.random().toString(36).substr(2, 16);
    }

    /**
     * 生成时间戳
     * @return {number}
     */
    createTimestamp() {
        return Math.ceil(Date.now() / 1000);
    }
}
module.exports = JsSdk;
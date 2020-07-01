/**
* Created by jiangwei on 2020/06/30 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/

const rp = require("request-promise");
const Redis = require("ioredis");
const { sha1 } = require("./encrypt");
class Gzh {
    constructor(appid, secret, redisOption, prefix = "wx:gzh", host = "https://api.weixin.qq.com") {
        if (!appid) {
            throw new Error("appid cannot be null");
        }
        if (!secret) {
            throw new Error("secret cannot be null");
        }
        this.appid = appid;
        this.secret = secret;
        this.host = host;
        this.expires_in = 7000; // 秒
        this.prefix = prefix;
        // {
        //     port: 6379, // Redis port
        //     host: "127.0.0.1", // Redis host
        //     family: 4, // 4 (IPv4) or 6 (IPv6)
        //     password: "auth",
        //     db: 0,
        //   }
        this.redisClient = new Redis(redisOption || {
            port: 6379, // Redis port
            host: "127.0.0.1", // Redis host
            db: 0,
        });
    }
    async access_token(grant_type = "client_credential") {
        // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        let result = {};
        const cacheKey = `${this.prefix}:access_token:${this.appid}`;
        const cache = await this.redisClient.get(cacheKey);
        console.log(cache);
        if (cache) {
            result.access_token = cache;
        } else {
            const options = {
                uri: `${this.host}/cgi-bin/token`,
                qs: {
                    grant_type: grant_type,
                    appid: this.appid,
                    secret: this.secret
                },
                json: true
            };
            const body = await rp(options);
            result.access_token = body.access_token;
            result.expires_in = body.expires_in;
            await this.redisClient.set(cacheKey, body.access_token, "EX", this.expires_in);
        }
        return result;
    }

    // https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
    // {
    //     "errcode":0,
    //     "errmsg":"ok",
    //     "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
    //     "expires_in":7200
    //   }
    async jsapi_ticket() {
        const cacheKey = `${this.prefix}:jsapi_ticket:${this.appid}`;
        const cache = await this.redisClient.get(cacheKey);
        let result = {};
        if (cache) {
            result.ticket = cache;
        } else {
            const { access_token } = await this.access_token();
            const options = {
                uri: `${this.host}/cgi-bin/ticket/getticket`,
                qs: {
                    // access_token=ACCESS_TOKEN&type=jsapi
                    access_token: access_token,
                    type: "jsapi"
                },
                json: true
            };
            const body = await rp(options);
            if (body.errcode === 0 && body.errmsg === "ok") {
                result.ticket = body.ticket;
                result.expires_in = body.expires_in;
                await this.redisClient.set(cacheKey, body.ticket, "EX", this.expires_in);
            } else {
                result = body;
            }
        }
        return result;
    }
    /**
     * 发送客服消息
     * @param {string} touser 用户openid
     * @param {string} msgtype 消息类型 [text]
     * @param {string} text 发送文本内容
     */
    async send_custom_message(touser, msgtype, text) {
        if (!touser) {
            throw new Error("openid cannot be null");
        }
        if (!msgtype) {
            throw new Error("msgtype cannot be null");
        }
        if (!text) {
            throw new Error("text content cannot be null");
        }
        const { access_token } = await this.access_token();

        const options = {
            uri: `${this.host}/cgi-bin/message/custom/send`,
            qs: {
                access_token: access_token,
            },
            method: "POST",
            body: {
                "touser": touser,
                "msgtype": msgtype,
                "text": {
                    "content": text
                }
            },
            json: true
        };
        return rp(options);
    }
    /**
     * 发送模板消息
     * @param {string} touser 
     * @param {*} msgtype 
     * @param {*} text 
     */
    async send_template_message(touser, msgtype, text) {
        if (!touser) {
            throw new Error("openid cannot be null");
        }
        if (!msgtype) {
            throw new Error("msgtype cannot be null");
        }
        if (!text) {
            throw new Error("text content cannot be null");
        }
        const { access_token } = await this.access_token();

        const options = {
            uri: `${this.host}/cgi-bin/message/custom/send`,
            qs: {
                access_token: access_token,
            },
            method: "POST",
            body: {
                "touser": touser,
                "msgtype": msgtype,
                "text": {
                    "content": text
                }
            },
            json: true
        };
        return rp(options);
    }

    /**
     * 获取微信服务器ip
     */
    async get_callback_ip() {
        const { access_token } = await this.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/getcallbackip`,
            qs: {
                access_token: access_token,
            },
            method: "GET",
            json: true
        };
        return rp(options);
    }

    checkSignature(signature, timestamp, nonce, token) {
        let tmpArr = [token + '', nonce + '', timestamp + ''];
        tmpArr = tmpArr.sort();
        let tmpStr = tmpArr.join("");
        console.log(sha1(tmpStr));
        if (tmpStr == signature) {
            return true;
        } else {
            return false;
        }
    }
}
module.exports = Gzh;
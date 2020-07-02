// Created by jiangwei on 2020/06/30 .
// Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.

const rp = require("request-promise");
const Redis = require("ioredis");
const encrypt = require("./encrypt");
/**
 * 微信公众号接口封装类
 * @description 微信公众号接口封装类ALL
 * {@link https://github.com GitHub}.
 */
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
        this.prefix = prefix;
        this.access_token_key = `${this.prefix}:access_token:${this.appid}`;
        this.jsapi_ticket_key = `${this.prefix}:jsapi_ticket:${this.appid}`;
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
        let access_token;
        const cache = await this.redisClient.get(this.access_token_key);
        if (cache) {
            access_token = cache;
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
            access_token = body.access_token;
            await this.redisClient.set(this.access_token_key, body.access_token, "EX", body.expires_in);
        }
        if(!access_token) {
            throw new Error(`access_token 获取失败`);
        }
        return access_token;
    }

    // https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
    // {
    //     "errcode":0,
    //     "errmsg":"ok",
    //     "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
    //     "expires_in":7200
    //   }
    async jsapi_ticket() {
        let ticket;
        const cache = await this.redisClient.get(this.jsapi_ticket_key);
        if (cache) {
            ticket = cache;
        } else {
            const access_token = await this.access_token();
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
                ticket = body.ticket;
                await this.redisClient.set(this.jsapi_ticket_key, body.ticket, "EX", body.expires_in);
            } else {
                result = body;
            }
        }
        if(!ticket) {
            throw new Error(`ticket 获取失败`);
        }
        return ticket;
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
    /**
     * 校验微信事件推送接口 验签
     * @param {number} timestamp 
     * @param {number} nonce 
     * @param {string|number} token 
     */
    checkSignature(timestamp, nonce, token) {
        return encrypt.checkSignature(timestamp, nonce, token);
    }
}
module.exports = Gzh;
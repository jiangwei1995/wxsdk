/**
* Created by jiangwei on 2020/06/30 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/

const { Gzh } = require("../");
const assert = require("power-assert");
const appid = process.env["APP_ID"];
const secret =  process.env["SECRET"];
const openid =  process.env["OPEN_ID"];

describe('Gzh', () => {

    describe('#access_token()', () => {
        it('access_token', async () => {
            const gzh = new Gzh(appid, secret);
            const data = await gzh.access_token()
            assert.ok(typeof data.access_token === "string");
        });
    });

    describe('#jsapi_ticket()', () => {
        it('jsapi_ticket', async () => {
            const gzh = new Gzh(appid, secret);
            const result = await gzh.jsapi_ticket();
            console.log(result);
            // assert.equal(result.errcode, 0);
            // assert.equal(result.errmsg, "ok");
        });
    });

    describe('#send_custom_message()', () => {
        it('send_custom_message', async () => {
            const touser = openid;
            const msgtype = "text";
            const text = "加油";
            const gzh = new Gzh(appid, secret);
            const result = await gzh.send_custom_message(
                touser, msgtype, text
            );
            assert.equal(result.errcode, 0);
            assert.equal(result.errmsg, "ok");
        });
    });
});
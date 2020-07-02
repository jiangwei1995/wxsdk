/**
* Created by jiangwei on 2020/07/02 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/

const Gzh = require("./gzh");

/**
 * 模板消息相关接口
 */
class TemplateMessage {
    /**
     * 
     * @param {Gzh} gzh 
     */
    constructor(gzh) {
        if (gzh instanceof Gzh) {
            this.gzh = gzh;
        } else {
            throw new Error("初始化 参数错误");
        }
        this.host = "https://api.weixin.qq.com";
    }
    /**
     * 设置所属行业
     * @param {number} industry_id1 
     * @param {number} industry_id2 
     * {@link https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#0 微信文档}
     */
    async setIndustry(industry_id1, industry_id2) {
        const access_token = await this.gzh.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/template/api_set_industry`,
            qs: {
                access_token: access_token
            },
            method: "POST",
            body: {
                industry_id1: industry_id1,
                industry_id2: industry_id2
            },
            json: true
        };
        return rp(options);
    }

    /**
     * 获取设置的行业信息
     * {@link https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#1 微信文档}
     */
    async getIndustry() {
        const access_token = await this.gzh.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/template/get_industry`,
            qs: {
                access_token: access_token
            },
            json: true
        };
        return rp(options);
    }

    /**
     * 获得模板ID
     * @param {string} template_id_short 模板库中模板的编号，有“TM**”和“OPENTMTM**”等形式
     * {@link https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#2 微信文档}
     */
    async addTemplate(template_id_short) {
        const access_token = await this.gzh.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/template/api_add_template`,
            qs: {
                access_token: access_token
            },
            method: "POST",
            body: {
                "template_id_short": template_id_short
            },
            json: true
        };
        return rp(options);
    }

    /**
     * 获得模板列表
     * {@link https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#3 微信文档}
     */
    async getAllPrivateTemplate() {
        const access_token = await this.gzh.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/template/get_all_private_template`,
            qs: {
                access_token: access_token
            },
            json: true
        };
        return rp(options);
    }

    /**
     * 删除模板
     * @param {string} template_id 公众帐号下模板消息ID
     * {@link https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#3 微信文档}
     */
    async delTemplate(template_id) {
        const access_token = await this.gzh.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/template/del_private_template`,
            qs: {
                access_token: access_token
            },
            body: {
                "template_id": template_id
            },
            method: "POST",
            json: true
        };
        return rp(options);
    }

    /**
     * 发送模板消息
     * @param {string} touser 接收者openid
     * @param {string} template_id 模板ID
     * @param {object} data 模板数据
     * @param {string} color 模板内容字体颜色，不填默认为黑色
     * @param {string} url 模板跳转链接（海外帐号没有跳转能力）
     * @param {object} miniprogram 跳小程序所需数据，不需跳小程序可不用传该数据
     * @param {string} appid 所需跳转到的小程序appid（该小程序appid必须与发模板消息的公众号是绑定关联关系，暂不支持小游戏）
     * @param {string} pagepath 所需跳转到小程序的具体页面路径，支持带参数,（示例index?foo=bar），要求该小程序已发布，暂不支持小游戏
     * {@link https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#4 微信文档}
     */
    async sendTemplateMessage(touser, template_id, data, url, miniprogram, color) {
        const access_token = await this.gzh.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/message/template/send`,
            qs: {
                access_token: access_token
            },
            body: {
                touser: touser,
                template_id: template_id,
                data: data,
                url,
                miniprogram,
                color
            },
            method: "POST",
            json: true
        };
        return rp(options);
    }
}
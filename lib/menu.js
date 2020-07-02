/**
* Created by jiangwei on 2020/07/02 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/

const rp = require("request-promise");
const Gzh = require("./gzh");

/**
 * 自定义菜单
 */
class Menu {
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
     * 创建接口
     * {@link https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html 微信文档}
     */
    async create(body) {
        // TODO: button 封装
        const access_token = await this.gzh.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/menu/create`,
            qs: {
                access_token: access_token
            },
            method: "POST",
            body: body,
            json: true
        };
        return rp(options);
    }
    /**
     * 查询接口
     * 
     */
    async getCurrentSelfMenuInfo() {
        const access_token = await this.gzh.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/menu/get_current_selfmenu_info`,
            qs: {
                access_token: access_token
            },
            method: "GET",
            json: true
        };
        return rp(options);
    }
    /**
     * 删除接口
     * @description 使用接口创建自定义菜单后，开发者还可使用接口删除当前使用的自定义菜单。另请注意，在个性化菜单时，调用此接口会删除默认菜单及全部个性化菜单。
     */
    async deleteAllMenu() {
        const access_token = await this.gzh.access_token();
        const options = {
            uri: `${this.host}/cgi-bin/menu/delete`,
            qs: {
                access_token: access_token
            },
            method: "GET",
            json: true
        };
        return rp(options);
    }
}

module.exports = Menu;
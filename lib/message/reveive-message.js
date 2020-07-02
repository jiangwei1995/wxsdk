/**
* Created by jiangwei on 2020/07/02 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/

/**
 * 自动回复消息 基础类
 */
class ReceiveMessage {
    constructor(xml){
        this.tousername = xml.tousername[0]; // 公众号id
        this.fromusername = xml.fromusername[0]; // 用户openid
        this.createtime = Number(xml.createtime[0]); // 消息创建时间 （整型）
        this.msgid = Number(xml.msgid[0]); // 消息id，64位整型
    }
}
module.exports = ReceiveMessage;
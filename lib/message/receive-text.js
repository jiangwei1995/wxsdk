/**
* Created by jiangwei on 2020/07/02 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/
const ReceiveMessage = require("./reveive-message");
/**
 * 自动回复文本消息
 * @extends ReveiceMessage
 */
class ReceiveText extends ReveiceMessage {
    constructor(xml, content) {
        super(xml);
        this.content = content;
    }
    toXml() {
        const curr = Math.floor(Date.now() / 1000);
        return `<xml>
        <ToUserName><![CDATA[${this.xml.fromusername}]]></ToUserName>
        <FromUserName><![CDATA[${this.xml.tousername}]]></FromUserName>
        <CreateTime>${curr}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${this.content}]]></Content>
      </xml>`;
    }
}
module.exports = ReceiveText;
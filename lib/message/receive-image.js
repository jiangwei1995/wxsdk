/**
* Created by jiangwei on 2020/07/02 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/
const ReceiveMessage = require("./reveive-message");
/**
 * 自动回复图片消息
 * @extends ReceiveMessage
 */
class ReceiveImage extends ReceiveMessage {
    constructor(xml, media_id) {
        super(xml);
        this.media_id = media_id;
    }
    toXml() {
        const curr = Math.floor(Date.now() / 1000);
        return `<xml>
        <ToUserName><![CDATA[${this.fromusername}]]></ToUserName>
        <FromUserName><![CDATA[${this.tousername}]]></FromUserName>
        <CreateTime>${curr}</CreateTime>
        <MsgType><![CDATA[image]]></MsgType>
        <Image>
            <MediaId><![CDATA[${this.media_id}]]></MediaId>
        </Image>
      </xml>`;
    }
}
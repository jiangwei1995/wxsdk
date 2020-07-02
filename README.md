## Classes

<dl>
<dt><a href="#Gzh">Gzh</a></dt>
<dd><p>微信公众号接口封装类</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#rp">rp</a></dt>
<dd><p>Created by jiangwei on 2020/06/30 .
Copyright (c) 2020 (<a href="mailto:&#x6a;&#119;&#56;&#55;&#50;&#53;&#x30;&#53;&#x39;&#x37;&#x35;&#x40;&#103;&#x6d;&#97;&#105;&#x6c;&#46;&#x63;&#x6f;&#109;">&#x6a;&#119;&#56;&#55;&#50;&#53;&#x30;&#53;&#x39;&#x37;&#x35;&#x40;&#103;&#x6d;&#97;&#105;&#x6c;&#46;&#x63;&#x6f;&#109;</a>). All rights reserved.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#encrypt">encrypt(algorithm, content)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#sha1">sha1(content)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#md5">md5(content)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#checkSignature">checkSignature(timestamp, nonce, token)</a></dt>
<dd><p>校验微信事件推送接口 验签</p>
</dd>
</dl>

<a name="Gzh"></a>

## Gzh
微信公众号接口封装类

**Kind**: global class  

* [Gzh](#Gzh)
    * [new Gzh()](#new_Gzh_new)
    * [.send_custom_message(touser, msgtype, text)](#Gzh+send_custom_message)
    * [.send_template_message(touser, msgtype, text)](#Gzh+send_template_message)
    * [.get_callback_ip()](#Gzh+get_callback_ip)
    * [.checkSignature(timestamp, nonce, token)](#Gzh+checkSignature)

<a name="new_Gzh_new"></a>

### new Gzh()
微信公众号接口封装类ALL
[GitHub](https://github.com).

<a name="Gzh+send_custom_message"></a>

### gzh.send\_custom\_message(touser, msgtype, text)
发送客服消息

**Kind**: instance method of [<code>Gzh</code>](#Gzh)  

| Param | Type | Description |
| --- | --- | --- |
| touser | <code>string</code> | 用户openid |
| msgtype | <code>string</code> | 消息类型 [text] |
| text | <code>string</code> | 发送文本内容 |

<a name="Gzh+send_template_message"></a>

### gzh.send\_template\_message(touser, msgtype, text)
发送模板消息

**Kind**: instance method of [<code>Gzh</code>](#Gzh)  

| Param | Type |
| --- | --- |
| touser | <code>string</code> | 
| msgtype | <code>\*</code> | 
| text | <code>\*</code> | 

<a name="Gzh+get_callback_ip"></a>

### gzh.get\_callback\_ip()
获取微信服务器ip

**Kind**: instance method of [<code>Gzh</code>](#Gzh)  
<a name="Gzh+checkSignature"></a>

### gzh.checkSignature(timestamp, nonce, token)
校验微信事件推送接口 验签

**Kind**: instance method of [<code>Gzh</code>](#Gzh)  

| Param | Type |
| --- | --- |
| timestamp | <code>number</code> | 
| nonce | <code>number</code> | 
| token | <code>string</code> \| <code>number</code> | 

<a name="rp"></a>

## rp
Created by jiangwei on 2020/06/30 .
Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.

**Kind**: global constant  
<a name="encrypt"></a>

## encrypt(algorithm, content) ⇒ <code>string</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| algorithm | <code>string</code> | 
| content | <code>any</code> | 

<a name="sha1"></a>

## sha1(content) ⇒ <code>string</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| content | <code>any</code> | 

<a name="md5"></a>

## md5(content) ⇒ <code>string</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| content | <code>any</code> | 

<a name="checkSignature"></a>

## checkSignature(timestamp, nonce, token)
校验微信事件推送接口 验签

**Kind**: global function  

| Param | Type |
| --- | --- |
| timestamp | <code>number</code> | 
| nonce | <code>number</code> | 
| token | <code>string</code> \| <code>number</code> | 


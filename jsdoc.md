## Classes

<dl>
<dt><a href="#Gzh">Gzh</a></dt>
<dd><p>微信公众号接口封装类</p>
</dd>
<dt><a href="#BaseMessage">BaseMessage</a></dt>
<dd><p>Created by jiangwei on 2020/07/02 .
Copyright (c) 2020 (<a href="mailto:&#x6a;&#x77;&#x38;&#x37;&#x32;&#x35;&#x30;&#x35;&#x39;&#x37;&#53;&#64;&#103;&#x6d;&#x61;&#x69;&#x6c;&#x2e;&#x63;&#x6f;&#109;">&#x6a;&#x77;&#x38;&#x37;&#x32;&#x35;&#x30;&#x35;&#x39;&#x37;&#53;&#64;&#103;&#x6d;&#x61;&#x69;&#x6c;&#x2e;&#x63;&#x6f;&#109;</a>). All rights reserved.</p>
</dd>
<dt><a href="#ReceiveImage">ReceiveImage</a></dt>
<dd><p>自动回复图片消息</p>
</dd>
<dt><a href="#ReceiveText">ReceiveText</a></dt>
<dd><p>自动回复文本消息</p>
</dd>
<dt><a href="#ReceiveVoice">ReceiveVoice</a></dt>
<dd><p>Created by jiangwei on 2020/07/02 .
Copyright (c) 2020 (<a href="mailto:&#x6a;&#x77;&#56;&#x37;&#50;&#x35;&#x30;&#x35;&#57;&#55;&#x35;&#64;&#x67;&#x6d;&#97;&#x69;&#108;&#x2e;&#99;&#x6f;&#x6d;">&#x6a;&#x77;&#56;&#x37;&#50;&#x35;&#x30;&#x35;&#57;&#55;&#x35;&#64;&#x67;&#x6d;&#97;&#x69;&#108;&#x2e;&#99;&#x6f;&#x6d;</a>). All rights reserved.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#BaseMessage">BaseMessage</a></dt>
<dd><p>Created by jiangwei on 2020/07/02 .
Copyright (c) 2020 (<a href="mailto:&#x6a;&#119;&#56;&#55;&#x32;&#x35;&#x30;&#x35;&#x39;&#55;&#x35;&#x40;&#103;&#109;&#x61;&#105;&#108;&#x2e;&#x63;&#x6f;&#109;">&#x6a;&#119;&#56;&#55;&#x32;&#x35;&#x30;&#x35;&#x39;&#55;&#x35;&#x40;&#103;&#109;&#x61;&#105;&#108;&#x2e;&#x63;&#x6f;&#109;</a>). All rights reserved.</p>
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

<a name="BaseMessage"></a>

## BaseMessage
Created by jiangwei on 2020/07/02 .
Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.

**Kind**: global class  
<a name="ReceiveImage"></a>

## ReceiveImage
自动回复图片消息

**Kind**: global class  
<a name="ReceiveText"></a>

## ReceiveText
自动回复文本消息

**Kind**: global class  
<a name="ReceiveVoice"></a>

## ReceiveVoice
Created by jiangwei on 2020/07/02 .
Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.

**Kind**: global class  
<a name="BaseMessage"></a>

## BaseMessage
Created by jiangwei on 2020/07/02 .
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


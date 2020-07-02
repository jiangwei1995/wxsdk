/**
* Created by jiangwei on 2020/06/30 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/
const Gzh = require("./lib/gzh");
const { checkSignature } = require("./lib/encrypt");
const { ReceiveText } = require("./lib/message/receive-text");
module.exports = { Gzh, checkSignature, ReceiveText }
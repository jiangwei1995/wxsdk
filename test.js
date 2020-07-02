/**
* Created by jiangwei on 2020/07/02 .
* Copyright (c) 2020 (jw872505975@gmail.com). All rights reserved.
*/

const  {Gzh, Menu} = require(".");
const assert = require("power-assert");
const appid = process.env["APP_ID"];
const secret =  process.env["SECRET"];
const openid =  process.env["OPEN_ID"];
const gzh = new Gzh(appid, secret);
const menu = new Menu(gzh);
gzh.jssdkSignature("a","aa","aa",1);
// menu.create(
//     {
//         "button":[
//         {	
//              "type":"click",
//              "name":"今日歌曲",
//              "key":"V1001_TODAY_MUSIC"
//          },
//          {
//               "name":"菜单",
//               "sub_button":[
//               {	
//                   "type":"view",
//                   "name":"搜索",
//                   "url":"http://www.soso.com/"
//                },
//                {
//                   "type":"click",
//                   "name":"赞一下我们",
//                   "key":"V1001_GOOD"
//                }]
//           }]
//     }
// ).then((data)=>{
//     console.log(data);
// });
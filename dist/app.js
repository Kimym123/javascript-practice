"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 3000;
app.use(function (req, res, next) {
    console.log('Express를 이용한 Javascript 연습');
    console.log('해당 결과는 콘솔로 나옵니다.');
    next();
});
app.get("/", function (req, res) {
    res.send("hello world!");
});
app.listen(port, function () {
    console.log("Example app listen at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map
## 什麼是 MVC？

Model-View-Controller (MVC) 是一種架構模式，它將應用程序分為三個部份：

1. Model 負責「新增/瀏覽/修改/刪除」資料庫理的資料，用 Model 去資料庫裡取出必要的資料，把資料放進某個程式物件，然後用 js 去作該物件。
2. View 負責管理畫面的呈現，也就是 HTML template 加上動態顯示由 Model 取出的資料內容。
3. Controller 負責互動邏輯， request 會先被送到 Controller，再由 Controller 呼叫 Model 拿資料，並把資料傳給 View 來產生 HTML 頁面回傳 response。

## 請寫下這週部署的心得

nginx 很有趣，感覺以後會一直用到，應該要更深入研究。因為這是用 docker 部署，所以一開始 static 的 css 一直找不到，也意識到自己不是很了解 nginx 背後運作的邏輯。然後有越來越熟悉 aws 了。


## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？

比較喜歡 Node.js 的後端，因為 library 讓整合性比較好，不用開很多檔案。記得之前訂正 w11 作業經常漏東漏西，因為都散落在各個檔案中。另外 sequelize 提供的 ORM 也比較方便。

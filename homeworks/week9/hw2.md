## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

text: 最大長度無法指定，需要指定 prefix 長度以成為 index 的一部分，在關聯表外儲存成 BLOB，然後在關聯表中儲存 BLOB 的位置。

VARCHAR: 可以指定最大長度（<=66535），可以是 index 的一部分，儲存在關聯表中。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

用戶透過瀏覽器訪問 http server 時，http server 會回傳一個帶有 set-cookie 的 header，裡面包含 sever 想儲存的資料，例如 user=1234，瀏覽器在接下來 send request 到同一個 domain 時，瀏覽器會帶一個 cookie 的 header，內容就是剛剛 set-cookie 當中 server 希望紀錄的內容。 cookie 就可以幫助 stateless 的 http request 紀錄用戶的狀態。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

沒有驗證機制，例如信箱或手機號碼，當用戶忘記密碼時無法取回。

暱稱可以重複，這樣就不知道留言的是誰。

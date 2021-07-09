## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

雜奏：將不定長度資料壓縮成固定長度的值，由於是多對一的關係，所以無法由 hash value 逆推原始資料。

加密：將資料根據金鑰變成密文，可以利用金鑰轉回成明文。

因為雜湊無法逆推的特性，所以就算資料庫被駭也無法得知用戶的密碼。

## `include`、`require`、`include_once`、`require_once` 的差別

如果無法找到要引入的檔案，include() 將只會產生警告允許程式繼續執行，而 require() 會產生錯誤並停止程式執行。

include_once 和 require_once 只會引入檔案一次，即使寫了第二次也不會再次引入。 

## 請說明 SQL Injection 的攻擊原理以及防範方法

駭客加入一些字元修改 SQL 查詢以返回其他結果，讓他們查看沒有他們沒有權限的資料。例如，"SELECT * FROM database WHERE username='%s' and password='%s'"，如果 username = adam'" //，這樣 SQL 就會變成 "SELECT * FROM database WHERE username='adam'" //' and password='%s'"，用 adam 的名義登入。所以需要避免使用字串的拼接，而是使用參數化的查詢方式，這樣 SQL 就不會將參數內容作為 SQL 語法的一部分處理。

##  請說明 XSS 的攻擊原理以及防範方法

駭客將惡意 <script> 透過 client 端輸入或通過修改 request 來進行攻擊，讓其他用戶在查看網頁時受到攻擊。例如，留言 <script>alert('hello')</script>，這樣所有使用者都會跑出 alert。所以要做跳脫處理，避免直接呈現資料於網頁上。

## 請說明 CSRF 的攻擊原理以及防範方法

在不同的網站上埋一個惡意連結，讓使用者在登入狀態時不知不覺中送出某個 request。例如，<a href="http://netbank.com/transfer.do?acct=AttackerA&amount=$100">Read more!</a> 。

為避免跨站攻擊，我們可以檢查 referrer 來源、加入圖形或簡訊驗證碼或加入 csrf token， 把 csrf  token 加入 form 跟 cookie 中，因為跨站無法設定本站的 cookie ，所以攻擊的 request 就沒有 cookie。


## 什麼是 Ajax？
Javascript 與伺服器非同步溝通，可以透過瀏覽器發 request 跟伺服器交換數據，瀏覽器會再把 responce 傳到 Javascript，讓 Javascript 更新頁面，而無需刷新頁面。

## 用 Ajax 與我們用表單送出資料的差別在哪？
用 form 發 request，瀏覽器會直接 render 收到的 response，而 Ajax 會把 response 傳到 Javascript，由 Javascript 更新頁面。 

## JSONP 是什麼？
利用 <script> 不受同源政策管理的效果，將資料寫在 js 檔 function parameter 裡面，再用 script 引入 js 檔， 在 script 中在透過同名的 function 取得資料。

## 要如何存取跨網域的 API？
1. 不要透過瀏覽器發送 request
2. server 端回傳的 response 加上 header，Access-Control-Allow-Origin: *  或
Access-Control-Allow-Origin: <接收端的 ip>

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
因為第四週不是透過瀏覽器發送 request，所以沒有阻擋跨網域接收 respond。這週是透過 Ajax 發送，會受同源政策管理。

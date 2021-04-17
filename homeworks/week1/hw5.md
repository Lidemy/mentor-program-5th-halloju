## 請解釋後端與前端的差異。
##### 前端
跟使用者互動的界面，像是手機 APP 或者網頁。

##### 後端
儲存資料的資料庫，像是 MySQL 或是 MongoDB，當前端查詢時提供資料。

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
（假設電腦中以暫存了 google.com 的 IP 位置）
1. 瀏覽器將 `HTTP requests` `https://www.google.com/search?q=JavaScript`  打包到 `TCP` 層裝上 `TCP` 表頭 （source port/destination port/sequence number/acknowledge number）
2. 送到 `IP` 層裝上 `IP` 表頭（source address/destination adress）
3. 送到硬體層透過乙太網路或 wifi 連到 ISP 的路由器再連到 google 的伺服器
4. google 伺服器的`IP` 、 `TCP` 層分別去掉 `IP` 、`TCP` 表頭
5. google 伺服器進行尋演算法
6. google 將結果連同 `200 OK` 的 response 打包再進行一次步驟 1-3 回傳到我的電腦
7. 我的電腦經過步驟 4 ，瀏覽器解析 response 的內容並呈現在網頁上。

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
- `chmod` : 更改檔案權限，例如，`chmod a+r filename`
- `export` : 設定環境變數，例如，`export AIRFLOW_HOME = "$pwd"`
- `scp` : 藉由 ssh 的進行遠端檔案傳輸，例如，`scp file1 8.8.8.8:~/.`


> reference:[鳥哥](http://linux.vbird.org/linux_server/0110network_basic.php#hint)
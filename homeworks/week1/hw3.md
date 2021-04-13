
## 教你朋友 CLI

  

`親愛 h0W 哥，如果寫完這篇文章我還沒跟你絕交，那我會在教完你 git 後跟你絕交。`

  
CLI 簡單來說就是呼叫一些內建程式來操控電腦，把我們熟悉的圖形界面背後在運行的程式用文字來呼叫。例如進入`Downloads`這個資料夾，平常就是點一點圖示，在終端機上可以用 `cd Downloads` 來進入，然後我們會看一下資料夾內有哪些檔案，終端機可以用 `ls` 來列出目前有哪些檔案。

所以你的要求可以用以下步驟來進行：
1. 打開終端機
2. `cd ~` （Change Directory, 移動到 `/home/h0w/` 主目錄也可以用 `~` 代表）
3. `mkdir wifi` （MaKe DIRectory, 新增 wifi 這個資料夾）
4. `cd wifi` （Change Directory, 進到 wifi 資料夾中）
5. `touch afu.js` （建立 afu.js 檔案）
6. `echo 'fxxK u' > afu.js` （寫入一些東西到 afu.js）
7. `cat afu.js` （conCATenate, 列印出 afu.js 裡的東西）
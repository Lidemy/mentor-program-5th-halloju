## 跟你朋友介紹 Git

`親愛的菜哥，祝你的笑話比伯恩好笑。`

git 是一個版本控制程式。什麼是版本控制？就是紀錄同一份檔案隨著時間做的更動，像是你的論文可能跟老師每次咪挺完都會有些修改，可能改一改後老師又覺得你原本寫得比較好，這時候你可能會希望可以直接把兩週前的論文直接叫出來。或者你可能論文寫到後來頭昏腦脹，已經記不得目前的東西跟上週的到底差在哪裡，這時候你就希望有紀錄可以做比較。
現在想像你如果要開始版本紀錄，你會做些什麼？首先，你會分開存檔，並給不同版本不同的命名。你會紀錄版本之間的關係是什麼，例如直接加個 1,2,3 的編號，並給每次修訂一些簡單的介紹方便以後查詢。而這些手動的工作都可以交給 git 來自動執行，只需要告訴它一些必要的資訊。

以下介紹怎麼使用 git 做版本控制。
首先打開終端機， `cd [your dirctory]` ，進入你想版本控制的目錄下。

#### 0. install git
mac: `brew install git` 
ubuntu: `apt-get install git`

在電腦中安裝 git 。

#### 1. initialize git 
`git init`
再來是要在你要版本控制的路徑下建立 `.git` 這個資料夾，這個資料夾裡裡面包含一些 git 運作時必要的架構，它就很像開一個銀行帳戶，帳戶會紀錄你有多少錢，有哪些消費，所以你要建立 `.git` 這個資料夾 git 才知道要開始幫你紀錄。

接著你可以開始編輯你的笑話，當你覺得告一段落存檔成 `your_jokes.txt` 。

#### 2. check git status
`git status`
顯示出你目前有哪些檔案已經更動（modified），或者還沒有被 git 追蹤（untracked）。

#### 3. add files
`git add your_jokes.txt`
這就像是把檔案放入一個籃子，如果你有其他的檔案也想一起 commit 形成一個新的版本就可以用 `git add 一起放入籃子中。這時候再輸入一次 `git status` 會發現 `your_jokes.txt` 已經在 `staged` 的狀態。

#### 4. commit 版本
`git commit -m "這邊加入你這次修訂的簡單說明" ` 
正式紀錄某個版本，git 會給這次的 commit 一個編碼，之後你更動檔案後又想回到之前版本時，就可以直接索引這個編碼回來看看。

#### 5. check git commits
`git log` 
會顯示你一個還有之前的 commit。


#### 6. branch
`git branch` 
會顯示你目前是在哪個分支上。分支就像是樹幹一樣，你一開始在 master 的主幹上編輯你的笑話，但編輯到一半，突然想到個 rap 可以搭配這個笑話，但你又不想影響到笑話的編輯，所以你會岔出去，新開一個 branch 然後開始編輯你的 rap 而不會影響到你笑話的進度，因為你隨時可以切回去 master 繼續編輯笑話。

示意圖：
<pre> 
------------- master 
       |----- rap
</pre>

##### 6.1 new branch
`git branch rap`
新增一條叫 rap 的 branch ，但目前你還處在 master 這個 branch 上。
##### 6.2 switch branch
`git checkout rap`
換到 rap 這條 branch 上。

然後開始編輯 rap ，存檔重複步驟 2~5 。

如果你想跟伯恩一起合作編輯笑話，你就需要一個遠端讓伯恩可以看到你笑話目前的進度，就像一個 google drive 一樣，讓你把版本上傳也可以下載。所以你會需要像 github 或者 gitlab 這樣的遠端。開一個帳號，在上面建一個新的 repository 用來上傳你的笑話專案。
![](https://i.imgur.com/IeE5gyr.png)

#### 7. add a remote names origin
`git remote add origin <git_URL>`

在本機端入以上指令告訴電腦這個資料夾對應的遠端是 <git_URL> ，名字叫 origin

#### 8. push files to remote
`git push origin master`

把剛剛 master 的 branch 上 commit 的笑話版本推到遠端 (origin)，可以到 github 上重新整理就可以看到。

`git push origin rap`

把剛剛 rap 的 branch 上 commit 的笑話版本推到遠端 (origin)，一樣可以到 github 上重新整理就可以看到。


#### 9. pull files from remote
`git pull origin master`

假設伯恩覺得你的笑話尷尬改動了一些，你就可以在本地把檔案拉下來更新。


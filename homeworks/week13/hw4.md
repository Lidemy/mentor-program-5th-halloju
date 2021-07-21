## Webpack 是做什麼用的？可以不用它嗎？

module bundler，將所需資源（import 的 library, css 等）包成一個變數共同加入一個 js 檔案中，方便其在瀏覽器中運行（有些瀏覽器不支援 import/export 語法）。

如果專案不複雜不會有變數名稱打架的情況，可以不用。

## gulp 跟 webpack 有什麼不一樣？

gulp 是任務管理程式，可以加入各種 plugin 完成任務。 webpack 則是 bundler，可以透過 loader 在加入資源時進行轉換，但主要任務是將資源進行打包。

## CSS Selector 權重的計算方式為何？

如果選擇器作用在一個元素，會使用權重高的，如果權重一樣，會使用後寫的。

0-0-0-0-0 (!important > inline style > ID > Class/psuedo-class/attribute > Element)

例如， .box -> 0-0-0-0-1，#box -> 0-0-0-1-0，#box #red -> 0-0-0-2-0，

重要性由左到右，例如，1-0-0-0-0 > 0-1-1-1-1。

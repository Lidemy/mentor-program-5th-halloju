## 什麼是 DOM？
Document Object Model，瀏覽器把 HTML 內各個標籤都定義為物件，會形成一個樹狀的結構，方便使用程式語言改變他的架構。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件傳遞機制：事件由 window 開始從 DOM 上層往下傳遞，分為捕獲、目標、冒泡階段，目前的標準為先捕獲再冒泡。
補獲：由最上層往下直到 target 元素， document -> html -> body -> div
冒泡：由 target 元素往上直到最頂層，  div -> body -> html ->document

## 什麼是 event delegation，為什麼我們需要它？
監聽上層元素，當下層有事件發生就可以反應。這樣的好處是，當動態新增元素時，它也會被監聽，而不用一個個加監聽事件。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
preventDefault：阻止瀏覽器預設行為
stopPropagation：阻止事件繼續傳遞
例如，假設要阻止觸發超連結，可以直接在連結的 node 加 preventDefault，或著在上一層加 stopPropagation (捕獲 ＝ true) 也可以，但其他的兄弟元素事件也會被阻止。
## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. <video>	插入 vedio
2. <audio>	插入 audio
3. <bdi> 文字順序由右到左

## 請問什麼是盒模型（box modal）
在 css 當中元素都是用 box 包起來的，一個 box 包含 box 本身的長寬、padding、margin 等。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
block: 一人一整行，可以調整 width, height 等。
inline: 可以並排，無法調整 width, height。
inline-block: 結合以上兩種優勢，可以並排且調整 width, height。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
static: 元素 default 的排列方式，由上到下排，top、right 等沒有作用。
relative: 根據自己目前的位置調整 top、right 等，並不影響周遭元素。
absolute: 根據上一層非 static 的元素位置調整 top、right 等，會被從正常的排列順序中移除，其他元素會遞補上來。
fixed: 根據 viewport 調整 top、right 等位置，然後就故定在那裡，跟 absolute 一樣，會被從正常的排列順序中移除，其他元素會遞補上來。
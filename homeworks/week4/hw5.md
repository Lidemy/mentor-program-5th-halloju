## 請以自己的話解釋 API 是什麼
一個定義好的界面（輸入輸出）方便軟體之間溝通（拿/修改資料）。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
204 No Content: The server successfully processed the request, and is not returning any content.
401 Unauthorized: Specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. 
503 Service Unavailable: The server cannot handle the request (because it is overloaded or down for maintenance).

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### Restaurant
base URL: https:/myRestaurant.com

|說明|Method|path|參數|範例|
|  ----  | ----  |----  | ----  | ----  |
|回傳所有餐廳資料|GET|/restaurant|_limit:限制回傳資料數量|/restaurant?_limit=5|
|回傳單一餐廳資料|GET|/restaurant/:id||/restaurant/5|
|刪除餐廳|DELETE|/restaurant|||
|新增餐廳|POST|/restaurant|name||
|更改餐廳|PATCH|/restaurant/:id|name||

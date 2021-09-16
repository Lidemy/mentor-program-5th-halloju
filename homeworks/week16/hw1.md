1. call stack: []

2. call stack: [main()]

3. call stack: [main(), console.log(1)]  // 1

4. call stack: [main(), setTimeout cb]

5. call stack: [main()] 

   webapi: [setTimeout cb]

6. call stack: [main() console.log(3)]  // 3

   webapi: [] 

   (event loop: call stack is not empty) 

   task queue: [cb]

7. call stack: [main() setTimeout cb] 

   webapi: [] 

   (event loop: call stack is not empty) 

   task queue: [cb]

8. call stack: [main()] 

   webapi: [setTimeout cb] 

   (event loop: call stack is not empty) 

   task queue: [cb]

9. call stack: [main() console.log(5)]  // 5

   webapi: [] 

   (event loop: call stack is not empty) 

   task queue: [cb cb]

10. call stack: []

    webapi: [] 

    (event loop: call stack is empty) 

    task queue: [cb cb]

11. call stack: [cb console.log(2)] // 2

    webapi: [] 

    (event loop: call stack is not empty) 

    task queue: [cb]

12. call stack: []

    webapi: [] 

    (event loop: call stack is empty) 

    task queue: [cb]

13. call stack: [cb console.log(4)] // 4

    webapi: [] 

    (event loop: task queue empty) 

    task queue: []

14. call stack: []

    webapi: [] 

    (event loop: task queue empty) 

    task queue: []

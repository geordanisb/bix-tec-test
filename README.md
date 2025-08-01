# bix-tec-test
## To run it locally:

1. ```git clone https://github.com/geordanisb/bix-tec-test```
2. ```npm install```
3. edit .env this way:
    1. DATABASE_URL="file:./data/data.db"
    2. NEXTAUTH_URL=http://localhost:3000
    3. SECRET=+Kmt0gv4GwIpakzAhK5gLr9bkZM0zgpvwLO+1o9bObg=
    4. NEXTAUTH_SECRET=+Kmt0gv4GwIpakzAhK5gLr9bkZM0zgpvwLO+1o9bObg=
4. edit prisma/schema.prisma, change postgres for sqlite:
    ```datasource db {
        provider = "sqlite"
        url      = env("DATABASE_URL")
    }
    ```
    1. remove prisma/migrations folder
    2. recreate new migration for sqlite, run: 
        ```npx prisma migrate dev``` can use any name
5. populating the data with data/transactions.json
    1. toggle the codes in src/app/api/populateTransactionRelation/route.ts; uncomment from line 2-24 and comment from 25-27
    2. visit: http://localhost:3000/api/populateTransactionRelation
    3. visit: http://localhost:3000/api/transactions/2023/sumary?state=MN to see some data coming from sqlite (prisma/data/data.db) or run ```npx prisma studio``` to view the database's tables in the browser.
    4. undo the changes made in 5.1
6. create an admin user 
    1. edit the file src/middleware.ts: uncomment line 16, comment lines 17-18 , uncomment 21-23, got to: http://localhost:3000/user/create
    2. check the Is Admin? checkobox 
    3. undo the changes made in 6.1
    4. go to: http://localhost:3000, You may need to delete the .next folder (to clean nextjs cache) and restart the server.
7. to run the tests (the first render de home page client side component and checks that Revenues cards was rendered, the second checks whether the amount in the Revenues cards is correct)
    1. run the command ```npm run test```
### Note: fetch function was intercepted and the data it should return were mocked


    
   


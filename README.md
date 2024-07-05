# Task-2

## Set Up and Start
>  Clone the repo
```
https://github.com/sanchit-cell/Task2.git
```
 
 > For running DB locally use Docker 
 ```
 docker run -e POSTGRES_PASSWORD=pass -d -p 5432:5432 postgres
 ```
 > Generate the client
 ```
 cd .\backend
 npx prisma migrate dev --name migrateDB
 npx prisma generate
 ```
 > start the project
 ```
 cd .\backend
 npm i
 npm run dev
 ```
 ```
 cd .\frontend
 npm i
 npm run dev
 ```
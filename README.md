# NOC Proyect 

Learning Clean Architecture while we create an interesting tool


# dev
1. Clone the .env.example and rename it to .env
2. Configure the env variables

```
PORT=3000
MAILER_EMAIL=support@something.com
MAILER_SECRET_KEY=123456
PROD=false
```
3. Excute the ```npm install``` comand
4. Create the databases (MongoDb & Postgres) with ```docker compose up -d``` comand
5. Excute the ```npx prisma migrate dev``` comand
6. Execute ```npm run dev```

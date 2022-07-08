import * as express from "express";

const app: express.Express = express();

const port: number = 3000;

app.use((req,res,next) => {
  console.log('Express를 이용한 Javascript 연습');
  console.log('해당 결과는 콘솔로 나옵니다.')
  next();
})

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`Example app listen at http://localhost:${port}`);
});

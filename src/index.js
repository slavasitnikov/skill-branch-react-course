import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  let a = req.query.a;
  let b = req.query.b;

  if (isNaN(a)) a = 0;
  if (isNaN(b)) b = 0;

  const result = +a + +b;
  res.send(result.toString());
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

import express from 'express';
import cors from 'cors';
import xregexp from 'xregexp';

const app = express();
app.use(cors());

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

app.get('/', (req, res) => {
  const invalidMessage = 'Invalid fullname';
  const fullname = req.query.fullname;

  if (!fullname || !xregexp('^(\\pL|\\s|\')+$', 'ig').test(fullname)) {
    res.send(invalidMessage);
    return;
  }

  const matches = fullname.match(xregexp('(\\pL)+', 'ig'));
  const words = matches.length;
  if (words > 0 && words < 4) {
    let result = capitalizeString(matches[words - 1].toString());
    for (let i = 0; i < words - 1; i++) {
      result += ` ${matches[i].charAt(0).toUpperCase()}.`;
    }

    res.send(result);
  } else {
    res.send(invalidMessage);
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

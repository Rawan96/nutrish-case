import express from 'express';
import { getFetchData } from './controllers/fetchController';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/:query', getFetchData);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

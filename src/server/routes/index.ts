import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
  return res.status(StatusCodes.ACCEPTED).send('Olá, DEV!');
});

router.post('/teste/:token', (req, res) => {
  console.log(req.params.token);
  return res.send('teste post');
});

export { router };

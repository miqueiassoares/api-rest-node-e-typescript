import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface ICidade {
  nome: string,
}

export const createValidation = validation((getSchema) => (
  {
    body: getSchema<ICidade>(yup.object().shape({
      nome: yup.string().required().min(3)
    }))
  }
));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);
  console.log(req.query);
  
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};
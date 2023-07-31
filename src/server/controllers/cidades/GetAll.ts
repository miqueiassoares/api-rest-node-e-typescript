import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => (
  {
    query: getSchema<IQueryProps>(yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional()
    }))
  }
));

export const getAll = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);
  console.log(req.query);
  
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IPessoa } from '../../database/models';
import { PessoasProvider } from '../../database/providers/pessoas';

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => (
  {
    body: getSchema<IBodyProps>(yup.object().shape({
      nomeCompleto: yup.string().required().min(3),
      email: yup.string().required().min(3).max(256),
      cidadeId: yup.number().required().moreThan(0)
    }))
  }
));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  
  const result = await PessoasProvider.create(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  
  return res.status(StatusCodes.CREATED).json(result);
};

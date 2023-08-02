import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IParamProps {
  id?: number
}

export const getByIdValidation = validation((getSchema) => (
  {
    params: getSchema<IParamProps>(yup.object().shape({
      id: yup.number().integer().required().moreThan(0)
    }))
  }
));

export const getById = async (req: Request<IParamProps>, res: Response) => {

  if(Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: {default: 'Não encontrado!'}});
  
  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    nome: 'Caetité',
  });
  
};
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado'
      }
    });
  }

  const [type, token] = authorization.split(' ');

  console.log(token);

  if(type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado'
      }
    });
  }

  if(token !== 'teste.teste.teste') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado'
      }
    });
  }

  console.log('passou por aqui');
  

  return next();
};
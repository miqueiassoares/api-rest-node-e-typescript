import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController, PessoasController, UsuariosController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', (_, res) => {
  return res.status(StatusCodes.ACCEPTED).send('funcionando!');
});

// cidades

router.get('/cidades', 
  ensureAuthenticated,
  CidadesController.getAllValidation, 
  CidadesController.getAll
);
router.get('/cidades/:id', 
  ensureAuthenticated,  
  CidadesController.getByIdValidation, 
  CidadesController.getById
);
router.post('/cidades', 
  ensureAuthenticated,  
  CidadesController.createValidation, 
  CidadesController.create
);
router.put('/cidades/:id', 
  ensureAuthenticated,  
  CidadesController.updateByIdValidation, 
  CidadesController.updateById
);
router.delete('/cidades/:id', 
  ensureAuthenticated,  
  CidadesController.deleteByIdValidation, 
  CidadesController.deleteById
);

// pessoas

router.get('/pessoas', 
  ensureAuthenticated,  
  PessoasController.getAllValidation, 
  PessoasController.getAll
);
router.get('/pessoas/:id', 
  ensureAuthenticated,  
  PessoasController.getByIdValidation, 
  PessoasController.getById
);
router.post('/pessoas', 
  ensureAuthenticated,  
  PessoasController.createValidation, 
  PessoasController.create
);
router.put('/pessoas/:id', 
  ensureAuthenticated,  
  PessoasController.updateByIdValidation, 
  PessoasController.updateById
);
router.delete('/pessoas/:id', 
  ensureAuthenticated,  
  PessoasController.deleteByIdValidation, 
  PessoasController.deleteById
);

// usuarios

router.post('/entrar', 
  ensureAuthenticated,  
  UsuariosController.signInValidation, 
  UsuariosController.signIn
);


router.post('/cadastrar',
  UsuariosController.signUpValidation, 
  UsuariosController.signUp
);

export { router };

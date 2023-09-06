import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController, PessoasController, UsuariosController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.status(StatusCodes.ACCEPTED).send('funcionando!');
});

// cidades

router.get('/cidades',  
  CidadesController.getAllValidation, 
  CidadesController.getAll
);
router.get('/cidades/:id',  
  CidadesController.getByIdValidation, 
  CidadesController.getById
);
router.post('/cidades',  
  CidadesController.createValidation, 
  CidadesController.create
);
router.put('/cidades/:id',  
  CidadesController.updateByIdValidation, 
  CidadesController.updateById
);
router.delete('/cidades/:id',  
  CidadesController.deleteByIdValidation, 
  CidadesController.deleteById
);

// pessoas

router.get('/pessoas',  
  PessoasController.getAllValidation, 
  PessoasController.getAll
);
router.get('/pessoas/:id',  
  PessoasController.getByIdValidation, 
  PessoasController.getById
);
router.post('/pessoas',  
  PessoasController.createValidation, 
  PessoasController.create
);
router.put('/pessoas/:id',  
  PessoasController.updateByIdValidation, 
  PessoasController.updateById
);
router.delete('/pessoas/:id',  
  PessoasController.deleteByIdValidation, 
  PessoasController.deleteById
);

// usuarios

router.post('/cadastrar',  
  UsuariosController.signUpValidation, 
  UsuariosController.signUp
);
router.post('/entrar',  
  UsuariosController.signInValidation, 
  UsuariosController.signIn
);

export { router };

import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { accessToken } from '../jest.setup';

describe('Cidades - Create', () => {

  it('Tenta criar um registro sem token de acesso', async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'Caxias do Sul'});
    
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({nome: 'Caetité'});
    
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });

  it('Tenta criar um registro com nome muito curto', async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({nome: 'Ca'});
    
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
});
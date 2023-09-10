import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuário - SignUp', () => {
  it('Cadastra usuário 1', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '1234567',
        nome: 'Juca da Silva',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('Cadastra usuário 2', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '40028922',
        nome: 'João Pedro',
        email: 'jjpedro@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
});
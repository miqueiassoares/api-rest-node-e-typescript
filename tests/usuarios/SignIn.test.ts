import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuário - SignIn', () => {
  beforeAll(async () => {
    await testServer.post('/cadastrar')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send({
        senha: '1234567',
        email: 'jorge@gmail.com',
        nome: 'Jorge Igor'
      });
  });

  it('Faz login', async () => {
    const res1 = await testServer
      .post('/entrar')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send({
        senha: '1234567',
        email: 'jorge@gmail.com'
      });
    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty('accessToken');
  });
  it('Senha incorreta', async () => {
    const res1 = await testServer
      .post('/entrar')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send({
        senha: '12224455',
        email: 'jorge@gmail.com'
      });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });
});
import { StatusCodes } from 'http-status-codes';
import { accessToken, testServer } from '../jest.setup';

describe('Pessoas - Create', () => {
  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Caetité',
        email: 'miqueiascastros7@gmail.com',
        cidadeId: 65
      });
    
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Tenta criar um registro sem a propriedade cidadeId', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Miquéias Castro',
        email: 'miqueiascastros7@gmail.com'
      });
    
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
});
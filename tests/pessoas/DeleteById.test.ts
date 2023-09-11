import { StatusCodes } from 'http-status-codes';
import { accessToken, testServer } from '../jest.setup';

describe('Pessoas - Delete', () => {
  it('Apaga registro', async () => {
    const criaRegistro = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Caetité',
        email: 'miqueiascastros7@gmail.com',
        cidadeId: 65
      });

    expect(criaRegistro.statusCode).toEqual(StatusCodes.CREATED);

    const apagarRegistro = await testServer
      .delete(`/pessoas/${criaRegistro.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    
    expect(apagarRegistro.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  
  it('Tenta apagar um registro que não existe', async () => {
    const res1 = await testServer.delete('/pessoas/99999').set({ Authorization: `Bearer ${accessToken}` });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
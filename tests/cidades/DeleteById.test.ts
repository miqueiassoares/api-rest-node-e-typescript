import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Delete', () => {
  it('Apaga registro', async () => {
    const criaRegistro = await testServer
      .post('/cidades')
      .send({nome: 'Caetité'});

    expect(criaRegistro.statusCode).toEqual(StatusCodes.CREATED);

    const apagarRegistro = await testServer
      .delete(`/cidades/${criaRegistro.body}`)
      .send();
    
    expect(apagarRegistro.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta apagar um registro que não existe', async () => {
    const res1 = await testServer.delete('/cidades/99999');

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
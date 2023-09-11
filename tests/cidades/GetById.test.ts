import { StatusCodes } from 'http-status-codes';
import { accessToken, testServer } from '../jest.setup';

describe('Cidades - GetById', () => {
  it('Busca registro por id', async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({nome: 'Caetité'});
    
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/cidades/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');
  });
  it('Tenta buscar registro que não existe', async () => {
    const res1 = await testServer
      .get('/cidades/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
    
  });
});
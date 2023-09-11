import { StatusCodes } from 'http-status-codes';
import { accessToken, testServer } from '../jest.setup';

describe('Cidades - GetAll', () => {
  it('Buscar todos os registros', async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({nome: 'Caetité'});
    
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.cidades.length).toBeGreaterThan(0);
  });
});
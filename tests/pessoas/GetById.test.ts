import { StatusCodes } from 'http-status-codes';
import { accessToken, testServer } from '../jest.setup';

describe('Pessoas - GetById', () => {
  it('Busca registro por id', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Caeitté', 
        email: 'miqueiascastros7@gmail.com',
        cidadeId: 65
      });
    
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/pessoas/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nomeCompleto');
  });

  it('Tenta buscar registro que não existe', async () => {
    const res1 = await testServer
      .get('/pessoas/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
    
  });

  it('Não informa id válido', async () => {
    const res1 = await testServer
      .get('/pessoas/0')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body.errors).toEqual({
      'params': {
        'id': 'Deve ser maior que 0',
      }});
  });
});
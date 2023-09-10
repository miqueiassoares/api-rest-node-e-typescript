import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - GetAll', () => {
  it('Buscar todos os registros', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send({
        nomeCompleto: 'Caetité',
        email: 'miqueiascastros7@gmail.com',
        cidadeId: 65
      });
    const res2 = await testServer
      .post('/pessoas')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send({
        nomeCompleto: 'Guanambi',
        email: 'vitoria@gmail.com',
        cidadeId: 143
      });
    
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res2.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/pessoas')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.pessoas.length).toBe(2);
    expect(Number(resBuscada.body.count)).toBe(2);
  });

  it('Limite de pessoas aplicado', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send({
        nomeCompleto: 'Caetité',
        email: 'mateusddd@gmail.com',
        cidadeId: 65
      });
    const res2 = await testServer
      .post('/pessoas')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send({
        nomeCompleto: 'Guanambi',
        email: 'anabeatriz@gmail.com',
        cidadeId: 143
      });
    const res3 = await testServer
      .post('/pessoas')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send({
        nomeCompleto: 'Salvador',
        email: 'vitoriarodriguez@gmail.com',
        cidadeId: 336
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res2.statusCode).toEqual(StatusCodes.CREATED);
    expect(res3.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/pessoas?limit=1')
      .set('Authorization', 'Bearer teste.teste.teste')
      .send();
    
    expect(Number(resBuscada.header['x-total-count'])).toBe(5);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.pessoas.length).toBe(1);
    expect(Number(resBuscada.body.count)).toBe(5);
  });
 
});
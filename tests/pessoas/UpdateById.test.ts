import { StatusCodes } from 'http-status-codes';
import { accessToken, testServer } from '../jest.setup';

describe('Pessoas - UpdateById', () => {

  it('Atualiza registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Caetité',
        email: 'miqueiascastros7@gmail.com',
        cidadeId: 65
      });
    
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const atualizaRegistro = await testServer
      .put(`/pessoas/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Guanambi',
        email: 'miqueiascastros7@gmail.com',
        cidadeId: 143
      });
    
    expect(atualizaRegistro.statusCode).toEqual(StatusCodes.NO_CONTENT);

    const getRes1 = await testServer
      .get(`/pessoas/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    
    expect(getRes1.statusCode).toEqual(StatusCodes.OK);
    
    expect(getRes1.body).toEqual({
      nomeCompleto: 'Guanambi',
      email: 'miqueiascastros7@gmail.com',
      cidadeId: 143,
      id: 1
    });
  });

  it('Tenta atualizar registro que não existe', async () => {
    const res1 = await testServer
      .put('/pessoas/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Caetité',
        email: 'miqueaiscastros7@gmail.com',
        cidadeId: 65
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
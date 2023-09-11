import supertest from 'supertest';
import { Knex } from '../src/server/database/knex';

import { server } from '../src/server/Server';

let accessToken = '';

beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run();
  // disponibilizar usuario para todos os testes
  const email = 'create-cidade@gmail.com';
  await testServer.post('/cadastrar').send({ nome: 'Teste', email: email, senha: '123412342'});
  const signInRes = await testServer.post('/entrar').send({email: email, senha: '123412342'});
  accessToken = signInRes.body.accessToken;
});

afterAll(async () => {
  await Knex.destroy();
});

export const testServer = supertest(server);
export { accessToken};
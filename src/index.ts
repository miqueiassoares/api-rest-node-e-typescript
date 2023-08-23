import { server } from './server/Server';
import { Knex } from './server/database/knex';

const startSever = () => {
  server.listen(process.env.PORT || 8080, () => console.log(`App rodando na porta ${process.env.PORT || 8080}`));
};

if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate.latest().then(() => {
    Knex.seed.run()
      .then(() => startSever())
      .catch(console.log);
  }).catch(console.log);  
} else {
  startSever();
}
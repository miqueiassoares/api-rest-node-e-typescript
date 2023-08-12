import { Knex } from 'knex';
import { ETablesNames } from '../seeds/ETablesNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETablesNames.cidade, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 150).index().notNullable();
      table.comment('Tabela usada para armazenar cidades no sistema.');
    })
    .then(() => {
      console.log(`# Create table ${ETablesNames.cidade}`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETablesNames.cidade)
    .then(() => {
      console.log(`# Create table ${ETablesNames.cidade}`);
    });
}


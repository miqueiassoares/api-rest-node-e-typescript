import { Knex } from 'knex';
import { ETablesNames } from '../ETablesNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETablesNames.pessoa, table => {
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').index().notNullable();
      table.string('email').unique().notNullable();

      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETablesNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela usada para armazenar pessoas no sistema.');
    })
    .then(() => {
      console.log(`# Create table ${ETablesNames.pessoa}`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETablesNames.pessoa)
    .then(() => {
      console.log(`# Dropped table ${ETablesNames.pessoa}`);
    });
}
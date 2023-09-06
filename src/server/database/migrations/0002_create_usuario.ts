import { Knex } from 'knex';
import { ETablesNames } from '../ETablesNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETablesNames.usuario, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').notNullable().checkLength('>', 3);
      table.string('email').index().unique().notNullable().checkLength('>', 5);
      table.string('senha').notNullable().checkLength('>', 6);

      table.comment('Tabela usada para armazenar usuarios no sistema.');
    })
    .then(() => {
      console.log(`# Create table ${ETablesNames.usuario}`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETablesNames.usuario)
    .then(() => {
      console.log(`# Dropped table ${ETablesNames.usuario}`);
    });
}
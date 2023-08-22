import { ETablesNames } from '../../ETablesNames';
import { Knex } from '../../knex';   
import { ICidade } from '../../models';

export const getById = async (id: number): Promise<ICidade | Error> => {
  try {
    const result = await Knex(ETablesNames.cidade)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Erro ao consultar o registro');
  } catch(error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
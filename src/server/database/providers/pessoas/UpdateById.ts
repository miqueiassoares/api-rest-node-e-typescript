import { ETablesNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';


export const updateById = async (id:number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
  try {
    const [{count}] = await Knex(ETablesNames.pessoa)
      .where('id', 'like', pessoa.cidadeId)
      .count<[{count: number}]>('* as count');
    
    if (count === 0) {
      return new Error('A pessoa usada no cadastro não foi encontrada');
    }


    const result = await Knex(ETablesNames.pessoa)
      .update(pessoa)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch(error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
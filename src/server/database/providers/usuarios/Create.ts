import { PasswordCrypto } from '../../../shared/services';
import { ETablesNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';


export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);
    usuario.senha = hashedPassword;
    const [result] = await Knex(ETablesNames.usuario).insert(usuario).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch(error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
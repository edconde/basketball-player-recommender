import * as mongoose from 'mongoose';

/**
 * Clase con los métodos CRUD básicos para ser extendida
 */
export default abstract class CrudService<T> {
  public constructor(private model: mongoose.Model<any>) {}

  /**
   * Busca todos los documentos de un modelo <T>
   */
  public async findAll(): Promise<T[]> {
    return this.model
      .find()
      .then((data: T[]) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
  /**
   *
   * @param id el id del documento de tipo <T> a buscar
   */
  public async findById(id: string): Promise<T> {
    return this.model
      .findById(new mongoose.Types.ObjectId(id))
      .then((data: T) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
  /**
   * Inserta un documento
   * @param body el documento a insertar
   */
  public async addOne(body: any): Promise<T> {
    return this.model
      .create(body)
      .then((data: T) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
  /**
   * Modifica un documento
   * @param conditions las condiciones a cumplir por los documentos que serán modificados
   * @param doc el documento a modificar
   */
  public async updateOne(conditions: any, doc: any): Promise<T> {
    return this.model
      .updateOne(conditions, doc)
      .then((data: any) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
  /**
   * Elimina un documento
   * @param id el id del documento de tipo <T> a eliminar
   */
  public async deleteById(id: string): Promise<T> {
    return this.model
      .deleteOne({ _id: new mongoose.Types.ObjectId(id) })
      .then((data: any) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}

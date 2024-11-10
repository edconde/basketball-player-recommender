import * as fs from 'fs';
import * as path from 'path';

/**
 * Clase con los métodos CRUD básicos para ser extendida
 */
export default abstract class JsonCrudService<T> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(__dirname, '..', 'data', fileName);
  }

  private readFile(): T[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as T[];
  }

  /**
   * Busca todos los documentos de un modelo <T>
   */
  public async findAll(): Promise<T[]> {
    return this.readFile();
  }

  /**
   * Busca un documento por ID
   * @param id el id del documento de tipo <T> a buscar
   */
  public async findById(id: string): Promise<T | undefined> {
    const items = this.readFile();
    return items.find((item) => ((item as any)._id as any).$oid === id);
  }
}

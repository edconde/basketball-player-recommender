/**
 * Clase con los métodos CRUD básicos para ser extendida
 */
export default abstract class JsonCrudService<T> {
  private jsonData: T[];

  constructor(data: any[]) {
    this.jsonData = data;
  }

  private readPlayers(): T[] {
    return this.jsonData;
  }

  /**
   * Busca todos los documentos de un modelo <T>
   */
  public async findAll(): Promise<T[]> {
    return this.readPlayers();
  }

  /**
   * Busca un documento por ID
   * @param id el id del documento de tipo <T> a buscar
   */
  public async findById(id: string): Promise<T | undefined> {
    const items = this.readPlayers();
    return items.find((item) => ((item as any)._id as any).$oid === id);
  }
}

import { Repository, DeepPartial, FindOneOptions } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class GenericService<T> {
  constructor(protected repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<T | null> {
    return await this.repository.findOneBy({ id } as any);
  }

  async findOne(options: FindOneOptions): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T | null> {
    // Cast data to QueryDeepPartialEntity<T>
    await this.repository.update(id, data as QueryDeepPartialEntity<T>);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0  ? true : false;
  }
}

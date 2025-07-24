"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericService = void 0;
class GenericService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }
    async findAll() {
        return await this.repository.find();
    }
    async findById(id) {
        return await this.repository.findOneBy({ id });
    }
    async findOne(options) {
        return await this.repository.findOne(options);
    }
    async update(id, data) {
        // Cast data to QueryDeepPartialEntity<T>
        await this.repository.update(id, data);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected > 0 ? true : false;
    }
}
exports.GenericService = GenericService;
//# sourceMappingURL=generic.service.js.map
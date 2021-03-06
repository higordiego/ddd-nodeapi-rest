
module.exports = class BaseRepository {
  constructor(model, domain) {
    this.model = model
    this.domain = domain
  }

  async create(entity) {
    let entityInstance = entity;

    if (!(entity instanceof domain)) entityInstance = this.domain(entity);

    try {
      const newEntity = await this.model.create(entityInstance.toJSON());

      return newEntity;
    } catch (error) {
      throw new Error(error);
    }
  }

  async find(field, value) {
    return this._findByField(field, value, false);
  }

  async findById(id) {
    return this._findByField('id', id, false);
  }

  _findByField(field, value, active = true) {
    const where = { [field]: value };
    return this.model.findOne({ where }, { rejectOnEmpty: true });
  }

}




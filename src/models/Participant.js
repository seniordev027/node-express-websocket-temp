class Participant {
  constructor(id, name) {
    if (!id) throw new Error('Id is required.');
    if (!name) throw new Error('Name is required.');

    this.id = id;
    this.name = name;
  }
}

module.exports = Participant;
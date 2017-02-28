let Participant = require('./Participant');

class Chat {
  constructor(id) {
    if (!id) throw new Error('Id is required.');

    this.id = id;
    this.participants = [];

    this.existsParticipant = this.existsParticipant.bind(this);
    this._getNewParticipantId = this._getNewParticipantId.bind(this);
  }

  addParticipant(participantName) {
    let id = this._getNewParticipantId();
    let participant = new Participant(id, participantName);
    this.participants.push(participant);

    return participant;
  }

  removeParticipant(id) {
    if (!id) throw new Error('ParticipantId is required to remove participant.');
    if (!this.existsParticipant(id)) throw new Error('Participant does not exist in this chat.');

    let pos = -1;
    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i].id == id) {
        pos = i;
        break;
      }
    }

    if (pos > -1)
      this.participants.splice(pos, 1);
  }

  existsParticipant(id) {
    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i].id == id)
        return true
    }
    return false;
  }

  _getNewParticipantId() {
    let id = 0;
    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i].id > id)
        id = this.participants[i].id;
    }
    return id + 1;
  }
}

module.exports = Chat;
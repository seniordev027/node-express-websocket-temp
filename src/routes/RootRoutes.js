let Routes = require('./Routes');
let ChatManager = require('../models/ChatManager');
// let chatManager = new ChatManager();

class RootRoutes extends Routes {
  constructor() {
    super();

    this._createChat = this._createChat.bind(this);
    this._returnInfo = this._returnInfo.bind(this);
    this._getChat = this._getChat.bind(this);
    this._checkParticipant = this._checkParticipant.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
    this._addParticipant = this._addParticipant.bind(this);
    this._deleteParticipant = this._deleteParticipant.bind(this);
  }

  _addAllRoutes(server) {
    server.post('/api/chat/create', super._bodyIsNotNull, this._createChat, this._returnInfo);
    server.put('/api/chat/:id/message', super._paramsIsNotNull, super._bodyIsNotNull, this._getChat, this._checkParticipant, this._sendMessage);
    server.put('/api/chat/:id/participant', super._paramsIsNotNull, super._bodyIsNotNull, this._getChat, this._addParticipant, this._returnInfo);
    server.del('/api/chat/:id/participant/:participantid', super._paramsIsNotNull, this._getChat, this._checkParticipant, this._deleteParticipant, this._returnInfo);
  }

  _createChat(req, res, next) {
    ChatManager.createChat([req.body.name])
      .then((resp) => {
        req.chat = resp.resp;
        req.participant = resp.resp.participants[0];
        next();
      }, (cause) => {
        res.json(cause.code, { code: cause.code, message: cause.message, resp: null });
      })
      .catch((err) => {
        res.json(500, { code: 500, message: err, resp: null });
      });
  }

  _addParticipant(req, res, next) {
    try {
      req.participant = req.chat.addParticipant(req.body.name);
      next();
    } catch (error) {
      res.json(400, { code: 400, message: error.message, resp: null });
    }
  }

  _deleteParticipant(req, res, next) {
    try {
      req.chat.removeParticipant(req.params.participantid);
      next();
    } catch (error) {
      res.json(400, { code: 400, message: error.message, resp: null });
    }
  }

  _returnInfo(req, res, next) {
    let ret = {
      participant: req.participant,
      chat: req.chat.id
    }
    res.json(200, { code: 200, message: null, resp: ret });
  }

  _getChat(req, res, next) {
    ChatManager.getChat(req.params.id)
      .then((resp) => {
        req.chat = resp.resp;
        next();
      }, (cause) => {
        res.json(cause.code, { code: cause.code, message: cause.message, resp: null });
      })
      .catch((err) => {
        res.json(500, { code: 500, message: err, resp: null });
      });
  }

  _checkParticipant(req, res, next) {
    if (!req.chat.existsParticipant(req.params.participantid || req.body.participantid))
      res.json(400, { code: 400, message: 'This participant does not belong to this chat.', resp: null });
    else
      next();
  }

  _sendMessage(req, res, next) {

  }
}

module.exports = RootRoutes;
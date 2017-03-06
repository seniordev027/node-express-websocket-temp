let Chat = require('./Chat');
let chats = [];

class ChatManager {
  static createChat(names) {
    return new Promise((resolve, reject) => {
      try {
        let newId = chats.length + 1;
        let newChat = new Chat(newId);

        for (let i = 0; i < names.length; i++) {
          newChat.addParticipant(names[i]);
        }

        chats.push(newChat);
        return resolve({ code: 200, message: 'Chat created', resp: newChat });
      } catch (error) {
        return reject({ code: 500, message: error.message, resp: null });
      }
    });
  }

  static getChat(id) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < chats.length; i++) {
        if (id == chats[i].id)
          return resolve({ code: 200, message: null, resp: chats[i] });
      }
      return resolve({ code: 200, message: null, resp: null });
    });
  }
}

module.exports = ChatManager;
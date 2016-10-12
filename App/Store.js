import { createStore } from 'redux'

const initialState = {
  chatMessages: [
    {
      id: 0,
      message: 'Hey there! Generic please don\'t do it message here...',
    },
  ]
}

function chatStore(state = initialState, action) {
  switch(action.type){
    case 'ADD_MESSAGE':
      return Object.assign({}, state, {
        chatMessages: state.chatMessages.concat([{
          id: action.id,
          message: action.message,
        }])
      });
      default:
        return state;
  }
}

export default createStore(chatStore);

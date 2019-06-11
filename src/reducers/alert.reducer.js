import { alertConstants } from '../constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'error',
        message: action.message
      };
    case alertConstants.INFO:
      return {
        type: 'info',
        message: action.message
      };
    case alertConstants.UNDO:
      return {
        ...action,
        undo : true,
        type: 'undo',
        message: action.message,
      }
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

export const useAction = (): typeof actions => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

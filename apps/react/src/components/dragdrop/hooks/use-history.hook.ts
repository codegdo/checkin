import { useEffect } from 'react';
import { Action, ActionType } from '../reducers';

interface HistoryCheckProps {
  currentVersion?: number;
  currentId?: string;
  dispatch: React.Dispatch<Action>;
}

export function useHistoryCheck({ currentVersion, currentId, dispatch }: HistoryCheckProps) {
  useEffect(() => {
    const storedDataHistory = sessionStorage.getItem('dataHistory');
    const storedHistoryIndex = sessionStorage.getItem('historyIndex');
    const storedSaveVersion = sessionStorage.getItem('saveVersion');
    const storedSaveId = sessionStorage.getItem('saveId');

    if (storedDataHistory && storedHistoryIndex && storedSaveVersion && storedSaveId) {
      const parsedDataHistory = JSON.parse(storedDataHistory);
      const parsedHistoryIndex = parseInt(storedHistoryIndex, 10);
      const parsedSaveVersion = parseInt(storedSaveVersion, 10);
      const parsedSaveId = storedSaveId;

      if ((!currentVersion || parsedSaveVersion === currentVersion) && (!currentId || parsedSaveId === currentId)) {
        dispatch({
          type: ActionType.LOAD_HISTORY,
          payload: { dataHistory: parsedDataHistory, historyIndex: parsedHistoryIndex }
        });
      } else {
        console.log('Old history data - prompt old data logic here');
      }
    }
  }, [currentVersion, currentId, dispatch]);
}

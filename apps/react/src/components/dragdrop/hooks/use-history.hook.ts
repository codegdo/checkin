import { useEffect } from 'react';
import utils from '@/utils';
import { Action, ActionType } from '../types';

interface HistoryProps {
  historyId?: number | string;
  historyVersion?: number | string;
  dispatch: React.Dispatch<Action>;
}

export function useHistory({ historyId = 0, historyVersion = 0, dispatch }: HistoryProps) {
  useEffect(() => {
    const storedHistoryId = sessionStorage.getItem('dnd_history_id');
    //const storedHistoryVersion = sessionStorage.getItem('dnd_history_version');
    const storedHistoryIndex = sessionStorage.getItem('dnd_history_index');
    const storedHistoryData = sessionStorage.getItem('dnd_history_data');

    const shouldSetHistory = !storedHistoryId || storedHistoryId !== historyId.toString();

    if (shouldSetHistory) {
      utils.setSessionStorage({
        dnd_history_id: historyId,
        dnd_history_version: historyVersion,
        dnd_history_index: -1,
        dnd_history_data: [],
      });
    } else if (storedHistoryData && storedHistoryIndex) {
      const parsedHistoryIndex = parseInt(storedHistoryIndex, 10);
      const parsedHistoryData = JSON.parse(storedHistoryData);

      const isValidIndex = !isNaN(parsedHistoryIndex) && parsedHistoryIndex !== -1;

      if (Array.isArray(parsedHistoryData) && parsedHistoryData.length > 0 && isValidIndex && parsedHistoryIndex < parsedHistoryData.length) {
        dispatch({
          type: ActionType.LOAD_HISTORY,
          payload: { historyData: parsedHistoryData, historyIndex: parsedHistoryIndex },
        });
      }
    }
  }, [historyId, historyVersion, dispatch]);
}



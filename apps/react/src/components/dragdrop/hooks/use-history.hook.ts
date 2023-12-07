import { useEffect } from 'react';
import { Action, ActionType } from '../reducers';
import { setSessionStorage } from '@/utils';

interface HistoryProps {
  trackingId?: number | string;
  trackingVersion?: number;
  dispatch: React.Dispatch<Action>;
}

export function useHistory({ trackingId = 0, trackingVersion = 0, dispatch }: HistoryProps) {
  useEffect(() => {
    const storedHistoryId = sessionStorage.getItem('dnd_history_id');
    const storedHistoryVersion = sessionStorage.getItem('dnd_history_version');
    const storedHistoryIndex = sessionStorage.getItem('dnd_history_index');
    const storedHistoryData = sessionStorage.getItem('dnd_history_data');

    const shouldSetHistory = !storedHistoryId || storedHistoryId !== trackingId.toString();

    if (shouldSetHistory) {
      setSessionStorage({
        dnd_history_id: trackingId,
        dnd_history_version: trackingVersion,
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
  }, [trackingId, trackingVersion, dispatch]);
}



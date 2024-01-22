import { useEffect, useReducer, useRef } from 'react';
import { TableField, KeyValue, TableActionType, TableAction, RowValue } from '../types';
import { tableReducer } from '../reducers';

export interface TableOptions {
  editable?: boolean;
}

interface IProps {
  title?: string;
  data?: KeyValue[];
  columns?: TableField[] | null;
  options?: TableOptions;
  status?: string;
  onClick?: (keyValue: KeyValue) => void;
  onChange?: (rowValue?: RowValue) => void;
}

interface TableRef {
  initialValues: Record<string, Record<string, string>[]>;
  values: Record<string, string>[];
}


export const useTableState = ({ title, data = [], columns = [], options, status, onClick, onChange }: IProps) => {
  const ref = useRef<TableRef>({
    initialValues: {},
    values: []
  });

  const [state, dispatch] = useReducer(tableReducer, {
    data: structuredClone(data)
  });

  const onUpdate = (action: TableAction) => {
    
    dispatch(action);

    onChange?.(action?.payload);

    console.log('onUPDATE', action);
  }

  useEffect(() => {
    console.log('stateUPDATE', state);
  }, [state]);

  return {
    ref: ref.current,
    table: {
      title,
      data,
      columns,
      options,
    },
    status,
    state,
    dispatch,
    onUpdate,
    onClick,
  }
}
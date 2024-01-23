import { useEffect, useReducer, useRef } from 'react';
import { TableField, KeyValue, TableAction, RowValue } from '../types';
import { tableReducer } from '../reducers';

export interface TableOptions {
  editable?: boolean;
  readonly?: boolean;
}

export interface TableProps {
  columns?: TableField[] | null;
  data?: KeyValue[];
  status?: string;
  onClick?: (keyValue: KeyValue) => void;
  onChange?: (rowValue?: RowValue) => void;

  // Additional Attributes
  className?: string; // Class name for styling
  caption?: string; // Caption for the table
  bordered?: boolean; // Whether to show table borders
  striped?: boolean; // Whether to stripe the rows
  hover?: boolean; // Enable row hover effect
  condensed?: boolean; // Compact style
  responsive?: boolean; // Make the table responsive

  // Pagination Attributes
  pageSize?: number; // Number of items per page
  currentPage?: number; // Current page number
  totalItems?: number; // Total number of items
  onPageChange?: (page: number) => void; // Callback for page change

  // Sorting Attributes
  sortColumn?: string; // Column to be sorted
  sortDirection?: 'asc' | 'desc'; // Sorting direction
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void; // Callback for sorting

  // Filtering Attributes
  filters?: Record<string, string | number>; // Filters to be applied
  onFilterChange?: (filters: Record<string, string | number>) => void; // Callback for filter change

  // Row Selection Attributes
  selectedRows?: number[]; // Array of selected row indices
  onRowSelect?: (selectedRows: number[]) => void; // Callback for row selection

  // Row Expansion Attributes
  expandedRows?: number[]; // Array of expanded row indices
  onRowExpand?: (expandedRows: number[]) => void; // Callback for row expansion

  // Cell Editing Attributes
  editableCells?: Record<string, boolean>; // Map of editable cells
  // onCellEdit?: (key: string, value: any) => void; // Callback for cell editing

  // Toggle Editable Mode
  editable?: boolean; // Toggle editable mode

  // Additional Features
  draggable?: boolean; // Allow rows to be draggable
  resizable?: boolean; // Allow column resizing
  showHeader?: boolean; // Show/hide table header
  showFooter?: boolean; // Show/hide table footer
}

interface TableRef {
  initialValues: Record<string, string>[];
  values: Record<string, string>[];
}


export const useTableState = ({ status, onClick, onChange, ...props }: TableProps) => {
  const ref = useRef<TableRef>({
    initialValues: [],
    values: []
  });

  const [state, dispatch] = useReducer(tableReducer, {
    data: structuredClone(props.data || [])
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
    source: { ...props },
    status,
    state,
    dispatch,
    onUpdate,
    onClick,
  }
}
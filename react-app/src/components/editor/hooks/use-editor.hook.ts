import { useEffect, useRef, useState } from "react";
import { KeyValue } from "../../input";
import { ActionClickType } from "../../../constants";
import { DataSource } from "../editor.type";

interface UseEditorOptions {
  dataSource: DataSource;
  onChange?: (keyValue: KeyValue) => void;
  onClick?: (actionType: string) => void;
}

export function useEditor({ dataSource, onChange, onClick }: UseEditorOptions) {
  const [activeTab, setActiveTab] = useState('');
  const [isReset, setIsReset] = useState(false);
  let { current: dataRef } = useRef<Record<string, string>>({});

  useEffect(() => {
    const defaultTab = Object.keys(dataSource)[0] || '';
    setActiveTab(defaultTab);
  }, [dataSource]);

  useEffect(() => {
    if (isReset) {
      setIsReset(false);
    }
  }, [isReset]);

  const handleChange = ({ key, value }: KeyValue) => {
    dataRef[key] = value;
    onChange?.({ key, value });
  };

  const handleClick = (actionType: string) => {
    if (actionType === ActionClickType.EDITOR_RESET) {
      setIsReset(true);
    }
    onClick?.(actionType);
  };

  return {
    dataRef,
    activeTab,
    isReset,
    setActiveTab,
    setIsReset,
    handleChange,
    handleClick
  };
}
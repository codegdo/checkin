import React, { useState, MouseEvent, useRef, useEffect } from 'react';
import { ControlData } from './control.type';

interface ControlTabProps extends ControlData { };

export function ControlTab(props: ControlTabProps) {
  const { className = 'tab', data = [], value, onClick } = props;

  const [slide, setSlide] = useState({ width: 0, position: 0 });
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = tabRef.current;
    if (target) {
      const rect = target.getBoundingClientRect();
      const elWidth = rect.width / data.length;
      const xPosition = data.indexOf(value) * 100;
      setSlide({ width: elWidth, position: xPosition });
    }
  }, [data, value]);

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    name: string,
    index: number
  ) => {
    const target = tabRef.current;
    if (target) {
      const rect = target.getBoundingClientRect();
      const elWidth = rect.width / data.length;
      const xPosition = data.indexOf(name) * 100;
      setSlide({ width: elWidth, position: xPosition });
    }

    if (onClick) {
      onClick(name);
    }
  };

  return (
    <div ref={tabRef} className={className}>
      {data.map((name: string, index: number) => (
        <button
          key={name}
          className={`tab-button ${value === name ? 'is-active' : ''}`}
          type="button"
          name={name}
          onClick={(e) => handleClick(e, name, index)}
        >
          {name}
        </button>
      ))}
      <span
        className="tab-glider"
        style={{ width: `${slide.width}px`, transform: `translateX(${slide.position}%)` }}
      />
    </div>
  );
}
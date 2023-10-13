import { useRef, useEffect } from "react";

type EventMap = WindowEventMap & HTMLElementEventMap & DocumentEventMap & MediaQueryListEventMap;

function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element: HTMLElement | Document | Window | null = window,
  options?: boolean | AddEventListenerOptions,
) {

  const savedHandler = useRef<(event: EventMap[K]) => void>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);


  useEffect(() => {

    if (!(element && element.addEventListener)) return;

    const eventListener = (event: Event) => savedHandler.current(event as EventMap[K]);

    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}

export default useEventListener;

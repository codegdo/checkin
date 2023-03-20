import { useRef, useEffect } from "react";

// Define a union of event maps
type EventMap = WindowEventMap & HTMLElementEventMap & DocumentEventMap & MediaQueryListEventMap;

function useEventListener<K extends keyof EventMap>(
  eventName: K, // The event to listen for
  handler: (event: EventMap[K]) => void, // The function to call when the event occurs
  element: HTMLElement | Document | Window | null = window, // The element to attach the listener to
  options?: boolean | AddEventListenerOptions, // Additional options for addEventListener
) {
  // A reference to the event handler function that is persisted across renders
  const savedHandler = useRef<(event: EventMap[K]) => void>(handler);

  // Update the savedHandler ref when the handler prop changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  // Attach and detach the event listener when the eventName, element, or options props change
  useEffect(() => {
    // If the element doesn't support addEventListener, bail out
    if (!(element && element.addEventListener)) return;

    // Define the event listener that will call the savedHandler function with the appropriate event type
    const eventListener = (event: Event) => savedHandler.current(event as EventMap[K]);

    // Attach the event listener to the element using addEventListener
    element.addEventListener(eventName, eventListener, options);

    // Detach the event listener from the element using removeEventListener when the component is unmounted or the props change
    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}

export default useEventListener;

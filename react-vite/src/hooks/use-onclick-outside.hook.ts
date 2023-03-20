import { RefObject, useEffect } from 'react';
import useEventListener from './use-event-listener.hook';

// Define the type for the click handler function
type Handler = (event: MouseEvent) => void;

// A React hook to execute a callback when clicking outside a given element
function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>, // The ref to the element to click outside of
  handler: Handler, // The function to execute when clicking outside the element
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown', // The mouse event to listen for ('mousedown' by default)
): void {
  // Use the useEventListener hook to attach the event listener to the document
  useEventListener(mouseEvent, event => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return;
    }

    // Execute the handler function when clicking outside the element
    handler(event);
  });
}

export default useOnClickOutside;

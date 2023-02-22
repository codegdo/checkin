import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

//https://www.robinwieruch.de/vitest-react-testing-library/
//https://www.youtube.com/watch?v=FJRuG85tXV0
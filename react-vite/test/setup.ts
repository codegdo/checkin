import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

//https://www.robinwieruch.de/vitest-react-testing-library/
//https://www.youtube.com/watch?v=FJRuG85tXV0
//https://medium.com/swlh/components-testing-in-react-what-and-how-to-test-with-jest-and-enzyme-7c1cace99de5
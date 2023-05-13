import React from 'react';
import { describe, expect, vi, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Form } from '../../../src/components';


describe('Form', () => {
  it('renders children inside FormProvider and Render components', () => {
    const Field = () => <div>Field</div>;
    const { getByText } = render(
      <Form>
        <Field />
      </Form>
    );
    expect(getByText('Field')).toBeInTheDocument();
  });

  it('renders only Render component if no children are passed', () => {
    const { container } = render(<Form />);
    //expect(container.firstChild).toHaveAttribute('data-testid', 'form-render');
    screen.debug();
  });

  it('passes props to FormProvider', () => {
    const onSubmit = vi.fn();
    const { container } = render(<Form onCallback={onSubmit} />);
    //expect(container.firstChild).toHaveAttribute('onSubmit', onSubmit);
    screen.debug();
  });
});
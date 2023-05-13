import React from 'react';
import { describe, expect, vi, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { InputText } from '../../../src/components/input';

describe('InputText', () => {
  it('renders correctly with default props', () => {
    const { getByRole } = render(<InputText type="text" name="test" />);
    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('name', 'test');
    expect(inputElement).toHaveValue('');
  });

  it('calls onChange when input value is changed', () => {
    const onChangeMock = vi.fn();
    const { getByRole } = render(
      <InputText type="text" name="test" onChange={onChangeMock} />
    );
    const inputElement = getByRole('textbox');
    const testValue = 'test value';
    fireEvent.change(inputElement, { target: { value: testValue } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith({ key: 'test', value: testValue });
    expect(inputElement).toHaveValue(testValue);
  });

  it('resets the input value when isReset prop is true', () => {
    const { getByRole, rerender } = render(
      <InputText type="text" name="test" value="test value" />
    );
    const inputElement = getByRole('textbox');
    expect(inputElement).toHaveValue('test value');
    rerender(<InputText type="text" name="test" value="test value" isReset />);
    expect(inputElement).toHaveValue(undefined);
  });

  it('renders the text prop', () => {
    const { getByText } = render(
      <InputText type="text" name="test" value="Test input" />
    );
    const textElement = getByText('Test input');
    expect(textElement).toBeInTheDocument();
  });
});
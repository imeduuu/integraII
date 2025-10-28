import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimalList from '../AnimalList';

describe('AnimalList skeleton', () => {
  it('renders skeletons when isLoading is true', () => {
    render(<AnimalList isLoading={true} />);
    // There should be several skeleton placeholders (by role or by class)
    // We check that at least one element with animate-pulse exists
    const pulses = document.querySelectorAll('.animate-pulse');
    expect(pulses.length).toBeGreaterThan(0);
  });
});

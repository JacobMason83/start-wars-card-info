import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
// here i will be testing the modal and making sure that the modal/ card opens up correctly as a bonus 
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

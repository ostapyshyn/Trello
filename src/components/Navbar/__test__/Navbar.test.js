import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../index.tsx';

it('should check title', async () => {
  render(<Navbar title="My Trello" />);
  const headingElement = screen.getByText(/my trello/i);
  expect(headingElement).toBeInTheDocument();
});

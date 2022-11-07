import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../index.tsx';

// it('should check title', async () => {
//   render(<Navbar title="My Trello" />);
//   const headingElement = screen.getByText(/my trello/i);
//   expect(headingElement).toBeInTheDocument();
// });

it('should check role', async () => {
  render(<Navbar title="My Trello" />);
  const headingElement = screen.getByRole('heading', { name: /my trello/i });
  expect(headingElement).toBeInTheDocument();
});

it('should check word', async () => {
  render(<Navbar title="My Trello" />);
  const headingElement = screen.queryByText(/start/i);
  expect(headingElement).not.toBeInTheDocument();
});

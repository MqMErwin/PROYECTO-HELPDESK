import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form', () => {
  render(<App />);
  const heading = screen.getByText(/Iniciar sesión/i);
  expect(heading).toBeInTheDocument();
});

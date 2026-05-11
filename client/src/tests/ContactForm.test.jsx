import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactForm from '../components/forms/ContactForm';

// Mock the API service
vi.mock('../../services/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('ContactForm Component', () => {
  it('renders the contact form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('allows the user to type into fields', () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Dain' } });
    expect(nameInput.value).toBe('Dain');
    
    const messageInput = screen.getByLabelText(/message/i);
    fireEvent.change(messageInput, { target: { value: 'Hello!' } });
    expect(messageInput.value).toBe('Hello!');
  });
});

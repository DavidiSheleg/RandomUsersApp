import React from 'react';
import { render, screen } from '../utils/test-utils';
import '@testing-library/jest-dom';
import { User } from '../components/User';


const user = {
    id: "604-51-3235",
    name: "Miss Priscilla Boyd",
    image: "https://randomuser.me/api/portraits/med/women/78.jpg",
    email: "priscilla.boyd@example.com",
    location: "Grapevine, Delaware, United States",
}

describe('User Component test', () => {
  test('Should be render correctly', () => {
    render(<User user={user} />);
    const id = screen.getByText(`ID: ${user.id}`);
    const name = screen.getByText(user.name);
    const email = screen.getByText(user.email);
    const location = screen.getByText(user.location);
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    const updateBtn = screen.getByRole('button', { name: /edit/i });
    expect(id).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(updateBtn).toBeInTheDocument();
  });
});

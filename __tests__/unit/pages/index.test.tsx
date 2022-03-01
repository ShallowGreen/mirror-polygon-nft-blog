import React from 'react';
import {render, screen} from '@testing-library/react';
import Home from '@/pages/index';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('Home', () => {
  it('renders a heading', () => {
    useRouter.mockImplementationOnce(() => ({
      pathname: '/',
    }));

    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Dashboard/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

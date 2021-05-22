import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../components/Home';

test('Home component is displaying', async () => {
    const { asFragment } = render(
        <Home />
    );

    expect(asFragment()).toMatchSnapshot();
});

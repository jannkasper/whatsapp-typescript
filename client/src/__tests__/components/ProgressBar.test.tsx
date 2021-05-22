import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '../../components/ProgressBar';

test('ProgressBar component is displaying', async () => {
    const { asFragment } = render(
        <ProgressBar completed={0} />
    );

    expect(asFragment()).toMatchSnapshot();
});

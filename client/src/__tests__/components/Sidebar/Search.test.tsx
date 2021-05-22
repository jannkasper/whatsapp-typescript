import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar  from '../../../components/Sidebar/search/index';

describe('SearchBar component', () => {
    const params = {
        setSearchText: jest.fn(),
        searchText: 'SearchTextTest',
        placeHolder: 'PlaceHolderTest'
    }
    it('should display', () => {
        const {asFragment} = render(
                <SearchBar {...params} />,
        );

        expect(asFragment()).toMatchSnapshot();
    })

    it('can enter input', async () => {
        render(
            <SearchBar {...params} />,
        );

        const input = screen.getByPlaceholderText(params.placeHolder);

        // Validate
        fireEvent.keyDown(input, {key: 'Enter'});

        await waitFor(() =>  {
            expect(params.setSearchText).not.toHaveBeenCalled();
        });

        // Type test
        fireEvent.change(input, { target: { value: 'TEST' } })

        // Validate
        fireEvent.keyDown(input, {key: 'Enter'});

        await waitFor(() =>  {
            expect(params.setSearchText).toHaveBeenLastCalledWith('TEST');
        });
    });
});

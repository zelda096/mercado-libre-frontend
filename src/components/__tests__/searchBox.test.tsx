import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import SearchBox from '../searchBox'

const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}))


describe('SearchBox', () => {
    test('Verificar que el componente SearchBox, se renderice correctamente', () => {
        render(
            <SearchBox />
        )
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
        expect(screen.getByAltText('mercadolibre-logo')).toBeInTheDocument()
    })
    test('Verificar que el valor del input se actualiza correctamente cuando el usuario escribe en él.', () => {
        render(
            <SearchBox />
        )

        const input = screen.getByPlaceholderText('Search') as HTMLInputElement
        fireEvent.change(input, { target: { value: 'nevera' } })

        expect(input.value).toBe('nevera')
    })
    test('Verificar que al hacer clic en el botón de búsqueda, la aplicación navega a la página de resultados de búsqueda con el término buscado', () => {
        render(<SearchBox />);
        const input = screen.getByPlaceholderText('Search');
        const button = screen.getByRole('button');

        act(() => {
            fireEvent.change(input, { target: { value: 'laptop' } });
            fireEvent.click(button)
        });

        expect(mockedNavigate).toHaveBeenCalledWith('/items?search=laptop');
    });
})

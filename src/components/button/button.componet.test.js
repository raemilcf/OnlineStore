import {render, screen} from '@testing-library/react'
import Button, { BUTTON_TYPE_CLASSES } from './button.component'

describe('Button test', () => {

    test('render base button when nothing is passed', () => {
        render(<Button>Hello</Button>);

        //find button by text
         const buttonElement = screen.getByText(/Hello/i);
        //asesability -get the button role, identify a button 
        //const buttonElement = screen.getByRole('button');

        expect(buttonElement).toHaveStyle('background-color: black');
    })

    test('google button render', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google}>Hello google</Button>);

        const googleButtonElement = screen.getByRole('button');
        expect(googleButtonElement).toHaveStyle('background-color: #4285f4')
    })

    test('inverted button render', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Hello inverted</Button>);

        const invertedButtonElement = screen.getByRole('button');
        expect(invertedButtonElement).toHaveStyle('background-color: white')
    })

    test('is Loading button render', () => {
        render(<Button isLoading={true}>Hello loading</Button>);

        const loadingButtonElement = screen.getByRole('button');
        expect(loadingButtonElement).toBeDisabled();
    })
})
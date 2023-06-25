import {SpinnerContainer, SpinnerOverlay } from './spinner.styles'


const Spinner = () => (
    // add test id for testing purpose
    <SpinnerOverlay data-testid='spinner'> 
        <SpinnerContainer />
    </SpinnerOverlay>
);

export default Spinner;
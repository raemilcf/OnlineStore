import {Group, FormInputLabel, Input} from './form-input.styles'

//add all the props of the input 
const FormInput = ({label, ...otherProps}) => {

    return (
        <Group>
            <Input {...otherProps} /> 
            {label && (
                <FormInputLabel shrink={otherProps.value.length}>
                {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
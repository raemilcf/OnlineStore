import { InputHTMLAttributes, FC} from 'react';
import {Group, FormInputLabel, Input} from './form-input.styles'

type FormInputProps = {label : string } & InputHTMLAttributes<HTMLInputElement>

//add all the props of the input 
const FormInput : FC<FormInputProps>= ({label, ...otherProps}) => {

    return (
        <Group>
            <Input {...otherProps} /> 
            {label && (
                <FormInputLabel shrink={
                    Boolean(
                        otherProps.value && 
                        typeof otherProps.value === 'string' && 
                        otherProps.value.length
                    )}
                   >
                {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
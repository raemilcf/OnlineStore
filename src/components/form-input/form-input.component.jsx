import './form-input.styles.scss'

//add all the props of the input 
const FormInput = ({label, ...otherProps}) => {

    return (
        <div className="group">
            <input className="form-input" {...otherProps} /> 
            {label && (
                <label className={`${otherProps.value.length ? 'shrink' : '' } form-input-label`}>{label}</label>
            )}
        </div>
    );
};

export default FormInput;
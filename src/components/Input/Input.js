import './Input.scss';


const Input = ({
    type = 'text',
    placeholder,
    label,
    error,
    disabled,
    onChange,
    value
}) => {
    return (
        <div className={"Input" + (error ? ' error ' : '' + (disabled ? ' disabled ' : ''))}>
            {
                label ? (
                    <div className="Input__label">
                        {label}
                    </div>
                ) : null
            }
            <input 
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder} 
                className="Input__el" />
            {
                error ? (
                    <div className="Input__error">
                        {error}
                    </div>
                ) :null
            }
        </div>
    )
}

export default Input;
import './Text.scss';


const Text = ({
    value,
    onChange,
    height,
    disabled,
    label,
    placeholder
}) => {

    return (
        <div className={'Text' + (disabled ? ' disabled ' : '')}>
            {
                label ? (
                    <div className="Text__label">{label}</div>
                ) : null
            }
            <textarea 
                placeholder={placeholder}
                style={{height: height}}
                className={"Text__el"}
                value={value}
                onChange={onChange}
                disabled={disabled}
                ></textarea>
        </div>
    )
}

export default Text;
import './TrNotButton.scss';


const TrNotButton = ({value}) => {
    return (
        <button className="TrNotButton">
            Ввод и вывод <span>{value}</span>
        </button>
    )
}

export default TrNotButton;
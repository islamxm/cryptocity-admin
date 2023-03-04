import './Navigation.scss';
import { Link } from 'react-router-dom';
import {FiUsers} from 'react-icons/fi';



const Navigation = ({
    onSelect,
    value
}) => {

    return (
        <div className='Navigation'>
            <ul className="Navigation__list">
                <li className="Navigation__item">
                    <button 
                        onClick={() => onSelect('0,1')}
                        className={'Navigation__btn' + (value == '0,1' ? ' active ' : '')}>
                        <div className="Navigation__btn_icon">
                            <FiUsers/>
                        </div>
                        <div className="Navigation__btn_text">
                            Ввод
                        </div>
                        {/* <div className="Navigation__btn_badge">
                            100
                        </div> */}
                    </button>
                </li>
                <li className="Navigation__item">
                    <button 
                        onClick={() => onSelect('3')}
                        className={'Navigation__btn' + (value == '3' ? ' active ' : '')}>
                        <div className="Navigation__btn_icon">
                            <FiUsers/>
                        </div>
                        <div className="Navigation__btn_text">
                            Вывод
                        </div>
                        {/* <div className="Navigation__btn_badge">
                            100
                        </div> */}
                    </button>
                </li>
                <li className="Navigation__item">
                    <button 
                        onClick={() => onSelect('2')}
                        className={'Navigation__btn' + (value == '2' ? ' active ' : '')}>
                        <div className="Navigation__btn_text">
                            G/MPI
                        </div>
                        {/* <div className="Navigation__btn_badge">
                            100
                        </div> */}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Navigation;
import './Header.scss';
import Container from '../../components/Container/Container';
import logo from '../../assets/logo.svg';
import {FiArrowDownRight} from 'react-icons/fi';
import TrNotButton from './components/TrNotButton/TrNotButton';

const Header = () => {
    return (
        <header className="Header">
            <Container>
                <div className="Header__in">
                    <a href="#" className="Header__logo">
                        <img src={logo} alt="Crypto-City" />
                    </a>
                    <div className="Header__main">
                        <div className="Header__main_item">
                            <TrNotButton value={'+15'}/>
                        </div>  
                        <div className="Header__main_item">
                            <div className="Header__main_auth">
                                <button className="Header__main_auth_btn">
                                    <div className="Header__main_auth_btn_text">Выйти</div>
                                    <div className="Header__main_auth_btn_icon">
                                        <FiArrowDownRight/>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header;
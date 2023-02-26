import './Header.scss';
import Container from '../../components/Container/Container';
import logo from '../../assets/logo.svg';
import {FiArrowDownRight} from 'react-icons/fi';
import TrNotButton from './components/TrNotButton/TrNotButton';
import LogoutConfirmModal from '../../modals/LogoutConfirmModal/LogoutConfirmModal';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { tokenUpdate } from '../../store/actions';
import apiService from '../../service/apiService';
import Cookies from 'js-cookie';


const service = new apiService();

const Header = () => {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state)
    const nav = useNavigate();
    const loc = useLocation()
    const [logoutModal, setLogoutModal] = useState(false)
    const [logoutLoad, setLogoutLoad] = useState(false)
    const openLogoutModal = () => setLogoutModal(true)
    const closeLogoutModal = () => setLogoutModal(false)

    const handleLogout = () => {
        setLogoutLoad(true)
        service.logout(token).then(res => {
            if(res == 'Ok') {
                dispatch(tokenUpdate(null))
                Cookies.remove('cryptocity-lk-token');
                nav('/auth', {replace: true})
                window.location.reload();
            } else {
                //какое то действие если не удалось выйти
            }
        }).finally(_ => {
            setLogoutLoad(false)
        })
        
    }


    return (
        <header className="Header">
            <LogoutConfirmModal load={logoutLoad} visible={logoutModal} logout={handleLogout} close={closeLogoutModal}/>
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
                                <button onClick={openLogoutModal} className="Header__main_auth_btn">
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
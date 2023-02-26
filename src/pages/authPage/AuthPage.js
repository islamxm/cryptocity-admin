import './AuthPage.scss';
import contentEnterAnimProps from '../../ex/contentEnterAnimProps';
import PageLayout from '../../components/PageLayout/PageLayout';
import {motion} from 'framer-motion';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';
import apiService from '../../service/apiService';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import {tokenUpdate} from '../../store/actions';
import { useNavigate } from 'react-router-dom';

const service = new apiService();


const authResTypes = {
    error: 'WrongMailOrPass',
    notfound: 'UserNotFound',
    userexist: 'UserExist'
}


const AuthPage = () => {
    const disaptch = useDispatch()
    const nav = useNavigate();
    //const {token} = useSelector(state => state)
    const [mail,setMail] = useState('')
    const [pass, setPass] = useState('')
    const [load, setLoad] = useState(false)
    const [error, setError] = useState('')


    const onSubmit = () => {
        setLoad(true)
        const body = {
            mail,
            password: pass,
            isAdmin: 1
        }

        service.auth(body).then(res => {
            switch(res) {
                case authResTypes.error: 
                    setError('Неверный e-mail или пароль');
                    break;
                case authResTypes.notfound:
                    setError('Пользователь с такими данными не найден')
                    break;
                case authResTypes.userexist:
                    setError('Пользователь с таким e-mail уже существует')
                    break;
                default:
                    setError('')
                    Cookies.set('cryptocity-admin-token', res)
                    disaptch(tokenUpdate(res))
                    nav('/', {replace: true})
                    break;
            }
            console.log(res)
        }).finally(_ => {
            setLoad(false)
        })
    }


    return (
        <div className="page AuthPage">
            <PageLayout>
                <motion.div className='AuthPage__in' {...contentEnterAnimProps}>
                    <div className="AuthPage__body">
                        <div className="AuthPage__body_head">Войти</div>
                        <div className="AuthPage__body_form">
                            <Row gutter={[20,20]}>
                                <Col span={24}>
                                    <Input
                                        error={error}
                                        value={mail}
                                        onChange={e => setMail(e.target.value)}
                                        placeholder={'E-mail'}
                                        />
                                </Col>
                                <Col span={24}>
                                    <Input
                                        error={error}
                                        onChange={e => setPass(e.target.value)}
                                        type='password'
                                        value={pass}
                                        placeholder={'Ваш пароль'}
                                        />
                                </Col>
                                {/* <Col span={24}>
                                    <div className="AuthPage__body_form_link">
                                        Нет аккаунта? <Link to={'/signup'}>Регистрация</Link> 
                                    </div>
                                </Col> */}
                                <Col span={24}>
                                    <div className="AuthPage__body_form_action">
                                    <Button
                                        disabled={!mail || !pass}
                                        text={'Войти'}
                                        load={load}
                                        onClick={onSubmit}
                                        />
                                    </div>
                                    
                                </Col>
                            </Row>
                        </div>
                    </div>
                </motion.div>
            </PageLayout>
        </div>
    )
}

export default AuthPage;
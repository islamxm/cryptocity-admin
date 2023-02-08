import './TrPage.scss';
import TrTable from './components/TrTable/TrTable';
import PageLayout from '../../components/PageLayout/PageLayout';
import {motion} from 'framer-motion';
import contentEnterAnimProps from '../../ex/contentEnterAnimProps';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import apiService from '../../service/apiService';

const service = new apiService();

const TrPage = () => {
    const {token} = useSelector(state => state);
    const [list, setList] = useState([])

    const getTransactions = () => {
        if(token) {
            service.getTransctions(token).then(res => {
                setList(res)
            })
        }
    }

    useEffect(() => {
        getTransactions();
    }, [token])

    return (
        <div className="page TrPage">
            <PageLayout>
                <motion.div className='TrPage__in' {...contentEnterAnimProps}>
                    <div className="TrPage__body">
                        <TrTable/>
                    </div>
                </motion.div>
            </PageLayout>
        </div>
    )
}

export default TrPage;
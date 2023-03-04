import './TrPage.scss';
import TrTable from './components/TrTable/TrTable';
import PageLayout from '../../components/PageLayout/PageLayout';
import {motion} from 'framer-motion';
import contentEnterAnimProps from '../../ex/contentEnterAnimProps';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import apiService from '../../service/apiService';
import Button from '../../components/Button/Button';
import * as _ from 'lodash';
import Navigation from '../../components/Navigation/Navigation';
import FirstTable from './components/TrTable/FirstTable';
import SecondTable from './components/TrTable/SecondTable';
import ThirdTable from './components/TrTable/ThirdTable';


const service = new apiService();

const TrPage = () => {
    const {token} = useSelector(state => state);
    const [load, setLoad] = useState(false)
    const [list, setList] = useState([])
    const [count, setCount] = useState(7);
    const [offset, setOffset] = useState(0);
    const [end, setEnd] = useState(false)
    const [TxType, setTxType] = useState('0,1');
    const [MyManagerID, setMyManagerID] = useState('0');

    const getTransactions = (offset, count, TxType) => {
        if(token) {
            service.getTransctions(token, {
                offset,
                count,
                TxType
            }).then(res => {
                setMyManagerID(res?.MyManagerID)
                console.log(res?.Transactions?.length)
                if(res?.Transactions?.length < count) {
                    setEnd(true)
                } else setEnd(false)
                
                if(offset !== 0) {
                    console.log(res?.Transactions)
                    if(res?.Transactions?.length > 0) {
                        setList(s => [...s, ...res?.Transactions])
                    } else {
                       setEnd(true) 
                       console.log(list?.length)
                    }
                    
                } else setList(res?.Transactions) 
                
            })
        }
    }

    useEffect(() => {
        setOffset(0)
        setList([])
    }, [TxType])

    const updateList = useCallback(() => {
        service.getTransctions(token, {
            offset: 0,
            count: list?.length,
            TxType
        }).then(res => {
            setList(res?.Transactions)
        })
    }, [offset, TxType, list?.length])


    const switchTable = useCallback((type) => {
        switch(type) {
            case '0,1':
                return (
                    <FirstTable
                        updateList={updateList}
                        MyManagerID={MyManagerID}
                        list={list}
                        />
                )
            case '2':
                return (
                    <SecondTable
                        updateList={updateList}
                        MyManagerID={MyManagerID}
                        list={list}
                        />
                )
            case '3':
                return (
                    <ThirdTable
                        updateList={updateList}
                        MyManagerID={MyManagerID}
                        list={list}
                        />
                )
            default:
                return null
            
        }
    }, [TxType, list])

    useEffect(() => {
        if(TxType && count) {
            getTransactions(offset, count, TxType);
        }
    }, [token, offset, count, TxType])




    return (
        <div className="page TrPage">
            <div className='TrPage__top'>
                <Navigation
                    value={TxType}
                    onSelect={setTxType}
                    />
            </div>
            <PageLayout>
                <motion.div className='TrPage__in' {...contentEnterAnimProps}>
                    
                    <div className="TrPage__body">
                        
                        {switchTable(TxType)}
                    </div>
                    {
                        !end ? (
                            <div className="TrPage__action">
                                <Button
                                    onClick={() => setOffset(s => s + count)}
                                    text={'Показать еще'}
                                    />
                            </div>
                        ) : null
                    }
                    
                </motion.div>
            </PageLayout>
        </div>
    )
}

export default TrPage;
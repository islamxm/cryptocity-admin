import './TrTable.scss';
import notify from '../../../../ex/notify';
import {MdOutlineContentCopy} from 'react-icons/md';
import {AiOutlineInfoCircle} from 'react-icons/ai'
import TrStatus from './components/TrStatus/TrStatus';
import { Popover, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiService from '../../../../service/apiService';
import moment from 'moment';
import {ScaleLoader} from 'react-spinners';
import DescrWhenReject from '../../modals/DescrWhenReject/DescrWhenReject';
import Moment from 'react-moment';
import {BiErrorCircle} from 'react-icons/bi';


const service = new apiService();


const PpContent = ({date, level, sum, mpi, load}) => {

    return (
        <div className={"PpContent" + (load ? ' load ' : '')} >
            {
                load ? (
                    <div className="PpContent__load">
                        <ScaleLoader color='var(--aqua)'/>
                    </div>
                ) : (
                    <Col span={24}>
                        <Row gutter={[12,12]}>
                            <Col span={12}>
                                <div className="PpContent__item">
                                    <div className="PpContent__item_label">Дата регистрации</div>
                                    <div className="PpContent__item_value">{date}</div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="PpContent__item">
                                    <div className="PpContent__item_label">Уровень</div>
                                    <div className="PpContent__item_value">{level}</div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="PpContent__item">
                                    <div className="PpContent__item_label">Сумма выведенных денег за все время</div>
                                    <div className="PpContent__item_value">{sum}</div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="PpContent__item">
                                    <div className="PpContent__item_label">Сумма купленных за донат MPI</div>
                                    <div className="PpContent__item_value">{mpi}</div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                )
            }
            
        </div>
    )
}

const headMock = [
    'Тип', 
    'ID пользователя', 
    'Время', 
    'Кошелек', 
    'email', 
    'Платеж', 
    'Зашли', 
    'id транзакции', 
    // 'Состояние', 
    'Менеджер',
    'Инфо',
    'MPI',
    'Ожидание',
    'Статус' 
];



const FirstTable = ({list, MyManagerID, load, updateList}) => {
    const {token} = useSelector(state => state)
    const [popInfo, setPopInfo] = useState(null);
    const [popLoad, setPopLoad] = useState(false);
    const [descrModal ,setDescrModal] = useState(false)
    const [selectedId, setSelectedId] = useState('')

    const openDescrModal = () => setDescrModal(true)
    const closeDecsrModal = () => {
        setDescrModal(false)
        setSelectedId('')
    }


    const getPopInfo = (token, AppUserID) => {
        setPopLoad(true)
        if(token && AppUserID != '0') {
            service.getTransactionUserInfo(token, {
                AppUserID 
            }).then(res => {
                setPopInfo(res?.UserInfo[0])
            }).finally(_ => setPopLoad(false))
        }
    }


    const copyValue = (text) => {
        navigator.clipboard.writeText(text).then(res => {
            notify('Адрес скопирован')  
        })
    }

    const switchType = (type) => {
        switch(type) {
            case '0':
                return (
                    <span style={{color: 'yellow'}}>Public</span>
                );
            case '1':
                return (
                    <span style={{color: 'green'}}>Private</span>
                )
            case '2':
                return (
                    'G/MPI'
                )
            default:
                return 'N/D'
        }
    }

    const switchWallet = (type, trWallet, userWallet) => {
        if((type == '0' || type == '1' || type == '2') && trWallet) {
            return trWallet;
        } 
        if(type == '3' && userWallet) {
            return userWallet
        }
        return 'N/D'
        
    }

    const switchStatus = (status, managerId, myManagerId, type) => {
        if(status == '0' && myManagerId == managerId) {
            return 'db';
        }
        if(status == '0' && managerId == '0') {
            return 'take'
        }
        if(status == '1') {
            return 'send'
        }
        if(status == '2') {
            return 'decline'
        }
        if(status == '1' && type == '3') {
            return 'send'
        }
        if(status == '1' && (type == '0' || type == '1' || type == '2')){
            return 'done'
        }
        if(status == '0' && myManagerId != managerId) {
            return 'N/D';
        }
        if(status == '-1') {
            return 'wait'
        }
    }


    const handleAcceptTrans = (id) => {
        service.acceptTrans(token, {
            TransactionID: id
        }).then(res => {
            console.log(res)
            if(res == 'Ok') {
                notify('Статус изменен')
                updateList()
            } else {
                notify('Произошла ошибка', <BiErrorCircle color='red'/>)
            }
        })
    }

    const handleRejectTrans = (id) => {
        openDescrModal()
        setSelectedId(id)
    }

    const handleTakeTrans = (id) => {
        service.takeTrans(token, {
            TransactionID: id
        }).then(res => {
            console.log(res)
            if(res == 'Ok') {
                notify('Статус изменен')
                updateList()
            } else {
                notify('Произошла ошибка', <BiErrorCircle color='red'/>)
            }
        })
    }

    const fromNowFunc = (date) => {
        let days = `${date[0]}${date[1]}`;
        let month = `${date[3]}${date[4]}`;
        return `${month}.${days}${date.slice(5)}`
    }


    // ВВОД
    return (
        <div className="TrTable">
            <DescrWhenReject
                onClose={closeDecsrModal}
                open={descrModal}
                id={selectedId}
                updateList={updateList}
                />  
            <table className="TrTable__body">
                <tr className="TrTable__body_row TrTable__body_row-headrow">
                    {
                        headMock?.map((item, index) => (
                            <th className="TrTable__body_head" key={index}>{item}</th>
                        ))
                    }
                </tr>
                {
                    list?.map((item, index) => (
                        <tr className="TrTable__body_row" key={index}>

                            {/* Тип */}
                            <td className="TrTable__body_item">
                                {switchType(item?.TransactionType)}
                            </td>

                            {/* ID пользователя */}
                            <td className="TrTable__body_item">
                                {item?.UserID}
                            </td>

                            {/* Время */}
                            <td className="TrTable__body_item">
                                {item?.CreatedTime}
                            </td>

                            {/* Кошелек */}
                            <td className="TrTable__body_item wallet">
                                <div className="wallet-in">
                                    <div className='wallet-text'>{switchWallet(item?.TransactionType, item?.TransactionWallet, item?.UserWallet)}</div>
                                    
                                    {
                                        switchWallet(item?.TransactionType, item?.TransactionWallet, item?.UserWallet) == 'N/D' ? (
                                            null 
                                        ) : (
                                            <button onClick={() => copyValue(switchWallet(item?.TransactionType, item?.TransactionWallet, item?.UserWallet))} className="TrTable__body_item_copy">
                                                <MdOutlineContentCopy/>
                                            </button>
                                        )
                                    }
                                </div>
                                
                                
                            </td>

                            {/* email */}
                            <td className="TrTable__body_item">
                                {item?.Email ? item?.Email : 'N/D'}
                            </td>

                            {/* Платеж */}
                            <td className="TrTable__body_item">
                                {item?.CurrencyAmount ? item?.CurrencyAmount : 0}$
                            </td>

                            {/* Зашли */}
                            <td className="TrTable__body_item">
                                {item?.ReceivedAmount ? item?.ReceivedAmount : 0}$
                            </td>

                            {/* id транзакции */}
                            <td className="TrTable__body_item">
                                {item?.ID}
                            </td>

                            {/* Состояние */}
                            {/* <td className="TrTable__body_item">
                                Состояние
                            </td> */}

                            {/* Менеджер */}
                            <td className="TrTable__body_item">
                                {item?.ManagerUserName ? item?.ManagerUserName : 'N/D'}
                            </td>
                            
                            {/* Инфо */}
                            <td className="TrTable__body_item">
                                <Popover
                                    onOpenChange={e => {
                                        if(e) {
                                            setPopLoad(true)
                                            getPopInfo(token, item?.AppUserID)
                                        }
                                    }}
                                    placement={'bottomLeft'}
                                    content={<PpContent 
                                        load={popLoad}
                                        date={popInfo?.RegistrationDate} 
                                        level={popInfo?.Level} 
                                        sum={`$${popInfo?.OutputedMoney}`} 
                                        mpi={`$${popInfo?.InputedForDonatMoney}`}/>}
                                    >
                                    <button 
                                        
                                        onClick={() => {}}
                                        className={"TrTable__body_item_tt" + (item?.AppUserID == '0' ? ' disabled ' : '')}>
                                        <AiOutlineInfoCircle/>
                                    </button>
                                </Popover>
                            </td>


                            <td className="TrTable__body_item">
                                {item?.OutputMPI ? item?.OutputMPI : 0} MPI
                                <button className="TrTable__body_item_copy">
                                    <MdOutlineContentCopy/>
                                </button>
                            </td>
                            <td className="TrTable__body_item">
                                <Moment fromNow ago>{moment(fromNowFunc(item?.CreatedTime)).format()}</Moment>
                            </td>
                            <td className="TrTable__body_item">
                                <TrStatus 
                                    takeTrans={() => handleTakeTrans(item?.ID)}
                                    acceptTrans={() => handleAcceptTrans(item?.ID)}
                                    rejectTrans={() => handleRejectTrans(item?.ID)}
                                    type={switchStatus(item?.Status, item?.ManagerID, MyManagerID)}/>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default FirstTable;
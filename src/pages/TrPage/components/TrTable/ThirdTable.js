import './TrTable.scss';
import PpContent from '../PpContent/PpContent';
import { useSelector } from 'react-redux';
import apiService from '../../../../service/apiService';
import { useEffect, useState } from 'react';
import notify from '../../../../ex/notify';
import moment from 'moment';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {MdOutlineContentCopy} from 'react-icons/md';
import { Popover } from 'antd';
import Moment from 'react-moment';
import TrStatus from './components/TrStatus/TrStatus';
import DescrWhenReject from '../../modals/DescrWhenReject/DescrWhenReject';
import {BiErrorCircle} from 'react-icons/bi';



const service = new apiService();


const headMock = [
    'ID пользователя', 
    'Время', 
    'Кошелек', 
    'email',
    'MPI на вывод',
    'Сумма',
    'Менеджер',
    'Инфо',
    'Ожидание',
    'Статус' 
];





const ThirdTable = ({list, MyManagerID, load, updateList}) => {
    const {token} = useSelector(s => s);
    const [popLoad, setPopLoad] = useState(false)
    const [popInfo, setPopInfo] = useState(null);
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

    const copyValue = (text, label) => {
        navigator.clipboard.writeText(text).then(res => {
            notify(label)  
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
    const switchWallet = (type, trWallet, userWallet) => {
        if((type == '0' || type == '1' || type == '2') && trWallet) {
            return trWallet;
        } 
        if(type == '3' && userWallet) {
            return userWallet
        }
        return 'N/D'
        
    }



    const fromNowFunc = (date) => {
        let days = `${date[0]}${date[1]}`;
        let month = `${date[3]}${date[4]}`;
        return `${month}.${days}${date.slice(5)}`
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
                notify('Произошла ошибка', <BiErrorCircle color={"red"}/>)
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
            if(res == 'Ok') {
                notify('Статус изменен')
                updateList()
            } else {
                notify('Произошла ошибка', <BiErrorCircle color={"red"}/>)
            }
        })
    }


    // ВЫВОД
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

                            {/* ID пользователя */}
                            <td className="TrTable__body_item" onClick={updateList}>
                                {item?.UserID}
                            </td>

                            {/* Время */}
                            <td className="TrTable__body_item">
                                {item?.CreatedTime}
                            </td>

                            {/* Кошелек */}
                            <td className="TrTable__body_item wallet">
                                <div className="wallet-in">
                                    <div className="wallet-text">{switchWallet(item?.TransactionType, item?.TransactionWallet, item?.UserWallet)}</div>
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
                            
                            {/* MPI на вывод */}
                            <td className="TrTable__body_item">
                                {item?.CurrencyAmount ? item?.CurrencyAmount : 0}
                            </td>

                            {/* Сумма */}
                            <td className="TrTable__body_item">
                                {item?.OutputMPI ? item?.OutputMPI : 0}
                            </td>

                            {/* Менеджер */}
                            <td className="TrTable__body_item">
                                {item?.ManagerUserName ? item?.ManagerUserName : "N/D"}
                            </td>

                            {/* id транзакции */}
                            {/* <td className="TrTable__body_item">
                                {item?.ID}
                            </td> */}

                            
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

                            {/* Ожидание */}
                            <td className="TrTable__body_item">
                                {/* {moment(item?.CreatedTime).format()} */}
                                {/* {moment(Date.now()).format()} <br></br> */}
                                
                                <Moment fromNow ago>{moment(fromNowFunc(item?.CreatedTime)).format()}</Moment>
                            </td>
                            

                            {/* Статус*/}
                            <td className="TrTable__body_item">
                                <TrStatus
                                    takeTrans={() => handleTakeTrans(item?.ID)}
                                    acceptTrans={() => handleAcceptTrans(item?.ID)}
                                    rejectTrans={() => handleRejectTrans(item?.ID)}
                                    type={switchStatus(item?.Status, item?.ManagerID, MyManagerID, item?.TransactionType)}
                                    />
                            </td>
                        </tr>
                    ))
                }
               
            </table>
        </div>
    )
}

export default ThirdTable;
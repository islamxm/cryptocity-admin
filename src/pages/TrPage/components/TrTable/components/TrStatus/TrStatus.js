import './TrStatus.scss';
import {MdClose} from 'react-icons/md';
import {BsCheck2} from 'react-icons/bs';


const statuses = {
    done: 'done',
    db: 'db',
    take: 'take',
    send: 'send',
    accept: 'accept',
    cancel: 'cancel',
    none: 'none',
    wait: 'wait',
    decline: 'decline'
}


const TrStatus = ({
    type = statuses.none,
    acceptTrans,
    takeTrans,
    rejectTrans
}) => {


    const switchType = (type) => {
        switch(type) {
            case statuses.done:
                return (
                    <div className="TrStatus__body done">
                        Выполнен
                    </div>
                )
            case statuses.db:
                return (
                    <div className="TrStatus__body db">
                        <div 
                            onClick={rejectTrans}
                            className="TrStatus__body_cancel"><MdClose/></div>
                        <div 
                            onClick={acceptTrans}
                            className="TrStatus__body_accept"><BsCheck2/></div>
                    </div>
                )
            case statuses.decline:
                return (
                    <div className="TrStatus__body send" style={{color: 'red'}}>
                        Отклонен
                    </div>
                )
            case statuses.take:
                return (
                    <div 
                        onClick={takeTrans}
                        className="TrStatus__body take">
                        Взять
                    </div>
                )
            case statuses.send:
                return (
                    <div className="TrStatus__body send">
                        Отправил
                    </div>
                )
            case statuses.wait:
                return (
                    <div className="TrStatus__body send">
                        Ожидает платежа
                    </div>
                )
            case statuses.accept:
                return (
                    <div className="TrStatus__body db">
                        {/* <div className="TrStatus__body_cancel"><MdClose/></div> */}
                        <div className="TrStatus__body_accept"><BsCheck2/></div>
                    </div>
                )
            case statuses.cancel:
                return (
                    <div className="TrStatus__body db">
                        <div className="TrStatus__body_cancel"><MdClose/></div>
                        {/* <div className="TrStatus__body_accept"><BsCheck2/></div> */}
                    </div>
                )
            default:
                return 'N/D';
        }
    }


    return (
        <div className="TrStatus">
            {
                switchType(type)
            }
        </div>  
    )
}

export default TrStatus;
import './TrStatus.scss';
import {MdClose} from 'react-icons/md';
import {BsCheck2} from 'react-icons/bs';

const statuses = {
    done: 'done',
    db: 'db',
    take: 'take',
    send: 'send',
    none: 'none'
}


const TrStatus = ({
    type = statuses.none
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
                        <div className="TrStatus__body_cancel"><MdClose/></div>
                        <div className="TrStatus__body_accept"><BsCheck2/></div>
                    </div>
                )
            case statuses.take:
                return (
                    <div className="TrStatus__body take">
                        Взять
                    </div>
                )
            case statuses.send:
                return (
                    <div className="TrStatus__body send">
                        Отправил
                    </div>
                )
            default:
                return null;
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
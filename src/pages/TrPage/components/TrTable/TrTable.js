import './TrTable.scss';
import {MdOutlineContentCopy} from 'react-icons/md';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import TrStatus from './components/TrStatus/TrStatus';
import { Popover  } from 'antd';
import {Col, Row} from 'antd';
import notify from '../../../../ex/notify';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';


const headMock = ['ID пользователя', 'Время', 'Ожидание', 'Кошелек', 'Менеджер', 'Платеж', 'Инфо', 'Сумма', 'Статус'];



const PpContent = ({date, level, sum, mpi}) => {

    return (
        <div className="PpContent">
           
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
        </div>
    )
}


const TrTable = ({list}) => {

    const copyValue = (text) => {
        navigator.clipboard.writeText(text).then(res => {
            notify('Адрес скопирован')  
        })
    }


    useEffect(() => {
        console.log(list)
    }, [list])



    return (
        <div className="TrTable">
            <ToastContainer/>
            <table className="TrTable__body">
                <tr className="TrTable__body_row TrTable__body_row-headrow">
                    {
                        headMock?.map((item, index) => (
                            <th className="TrTable__body_head" key={index}>{item}</th>
                        ))
                    }
                </tr>
                <tr className="TrTable__body_row">
                    <td className="TrTable__body_item">
                        0203040501
                    </td>
                    <td className="TrTable__body_item">
                        03.03.2023 16:55:11
                    </td>
                    <td className="TrTable__body_item">
                        01:11
                    </td>
                    <td className="TrTable__body_item">
                        0х567х237923х677975049ссс456792176896780З89
                        <button onClick={copyValue} className="TrTable__body_item_copy">
                            <MdOutlineContentCopy/>
                        </button>
                    </td>
                    <td className="TrTable__body_item">
                        Dmitriy
                    </td>
                    <td className="TrTable__body_item">
                        1111
                    </td>
                    <td className="TrTable__body_item">
                        <Popover
                            placement={'bottomLeft'}
                            content={<PpContent date={'11.12.2022'} level={'17'} sum={'$512'} mpi={'$416'}/>}
                            >
                            <button className="TrTable__body_item_tt">
                                <AiOutlineInfoCircle/>
                            </button>
                        </Popover>
                    </td>
                    <td className="TrTable__body_item">
                        1111,0005 MPI
                        <button className="TrTable__body_item_copy">
                            <MdOutlineContentCopy/>
                        </button>
                    </td>
                    <td className="TrTable__body_item">
                        <TrStatus type='done'/>
                    </td>
                </tr>
                <tr className="TrTable__body_row active">
                    <td className="TrTable__body_item">
                        0203040501
                    </td>
                    <td className="TrTable__body_item">
                        03.03.2023 16:55:11
                    </td>
                    <td className="TrTable__body_item">
                        01:11
                    </td>
                    <td className="TrTable__body_item">
                        0х567х237923х677975049ссс456792176896780З89
                        <button className="TrTable__body_item_copy">
                            <MdOutlineContentCopy/>
                        </button>
                    </td>
                    <td className="TrTable__body_item">
                        Dmitriy
                    </td>
                    <td className="TrTable__body_item">
                        1111
                    </td>
                    <td className="TrTable__body_item">
                        <Popover
                            placement={'bottomLeft'}
                            content={<PpContent date={'11.12.2022'} level={'17'} sum={'$512'} mpi={'$416'}/>}
                            >
                            <button className="TrTable__body_item_tt">
                                <AiOutlineInfoCircle/>
                            </button>
                        </Popover>
                    </td>
                    <td className="TrTable__body_item">
                        1111,0005 MPI
                        <button className="TrTable__body_item_copy">
                            <MdOutlineContentCopy/>
                        </button>
                    </td>
                    <td className="TrTable__body_item">
                        <TrStatus type='db'/>
                    </td>
                </tr>
                <tr className="TrTable__body_row">
                    <td className="TrTable__body_item">
                        0203040501
                    </td>
                    <td className="TrTable__body_item">
                        03.03.2023 16:55:11
                    </td>
                    <td className="TrTable__body_item">
                        01:11
                    </td>
                    <td className="TrTable__body_item">
                        0х567х237923х677975049ссс456792176896780З89
                        <button className="TrTable__body_item_copy">
                            <MdOutlineContentCopy/>
                        </button>
                    </td>
                    <td className="TrTable__body_item">
                        Dmitriy
                    </td>
                    <td className="TrTable__body_item">
                        1111
                    </td>
                    <td className="TrTable__body_item">
                        <Popover
                            placement={'bottomLeft'}
                            content={<PpContent date={'11.12.2022'} level={'17'} sum={'$512'} mpi={'$416'}/>}
                            >
                            <button className="TrTable__body_item_tt">
                                <AiOutlineInfoCircle/>
                            </button>
                        </Popover>
                    </td>
                    <td className="TrTable__body_item">
                        1111,0005 MPI
                        <button className="TrTable__body_item_copy">
                            <MdOutlineContentCopy/>
                        </button>
                    </td>
                    <td className="TrTable__body_item">
                        <TrStatus type='send'/>
                    </td>
                </tr>
                <tr className="TrTable__body_row">
                    <td className="TrTable__body_item">
                        0203040501
                    </td>
                    <td className="TrTable__body_item">
                        03.03.2023 16:55:11
                    </td>
                    <td className="TrTable__body_item">
                        01:11
                    </td>
                    <td className="TrTable__body_item">
                        0х567х237923х677975049ссс456792176896780З89
                        <button className="TrTable__body_item_copy">
                            <MdOutlineContentCopy/>
                        </button>
                    </td>
                    <td className="TrTable__body_item">
                        Dmitriy
                    </td>
                    <td className="TrTable__body_item">
                        1111
                    </td>
                    <td className="TrTable__body_item">
                        <Popover
                            placement={'bottomLeft'}
                            content={<PpContent date={'11.12.2022'} level={'17'} sum={'$512'} mpi={'$416'}/>}
                            >
                            <button className="TrTable__body_item_tt">
                                <AiOutlineInfoCircle/>
                            </button>
                        </Popover>
                    </td>
                    <td className="TrTable__body_item">
                        1111,0005 MPI
                        <button className="TrTable__body_item_copy">
                            <MdOutlineContentCopy/>
                        </button>
                    </td>
                    <td className="TrTable__body_item">
                        <TrStatus type='take'/>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default TrTable;
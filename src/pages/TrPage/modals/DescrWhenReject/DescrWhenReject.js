import './DescrWhenReject.scss';
import {Modal, Row, Col} from 'antd';
import Input from '../../../../components/Input/Input';
import { useState, useEffect } from 'react';
import Button from '../../../../components/Button/Button';
import { useSelector } from 'react-redux';
import apiService from '../../../../service/apiService';
import Text from '../../../../components/Text/Text';
import notify from '../../../../ex/notify';
import {BiErrorCircle} from 'react-icons/bi';

const service = new apiService()


const DescrWhenReject = ({
    open,
    onClose,
    id,
    updateList
}) => {
    const {token} = useSelector(s => s);
    const [load, setLoad] = useState(false)
    const [descr, setDescr] = useState('')


    const onCancel = () => {
        setDescr('')
        onClose()
    }


    const onSave = () => {
        service.rejectTrans(token, {
            TransactionID: id,
            Descript: descr
        }).then(res => {
            console.log(res)
            if(res == 'Ok') {
                onCancel()
                notify('Статус изменен')
                updateList();
            } else {
                notify('Произошла ошибка', <BiErrorCircle color='red'/>)
            }
        }).finally(_ => {
            setLoad(false)
            // onCancel()
        })
    }


    return (
        <Modal 
            width={500}
            open={open}
            className='Modal'
            onCancel={onCancel}
            >
            <div className="Modal__in">
                
                <Row gutter={[30, 30]}>
                    <Col span={24}>
                        <h2 className="Modal__title center">Отмена транзакции</h2>
                    </Col>
                    <Col span={24}>
                        <Text
                            value={descr}
                            onChange={e => {
                                if(e.target.value?.length <= 300) {
                                    setDescr(e.target.value)
                                } else {
                                    return;
                                }
                            }}
                            label={'Причина отказа'}
                            placeholder={'Причина отказа'}
                            height={200}
                            />
                        {/* <Input
                            placeholder={'Причина отказа'}
                            value={descr}
                            onChange={e => setDescr(e)}
                            label={'Причина отказа'}
                            /> */}
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            text={'Отправить'}
                            load={load}
                            disabled={!descr}
                            onClick={onSave}
                            />
                    </Col>
                </Row>
            </div>
            
            
        </Modal>
    )
}

export default DescrWhenReject;
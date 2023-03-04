import {Row, Col} from 'antd';
import {ScaleLoader} from 'react-spinners';

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

export default PpContent;
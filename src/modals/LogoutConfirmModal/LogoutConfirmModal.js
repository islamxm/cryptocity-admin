import { Modal } from "antd";
import './LogoutConfirmModal.scss';
import {Row, Col} from "antd";
import Button from "../../components/Button/Button";

const LogoutConfirmModal = ({
    visible,
    close,
    logout,
    load
}) => {
    
    const closeHandle = () => {
        close()
    }

    return (
        <Modal
            open={visible}
            onCancel={closeHandle}
            className={"Modal LogoutConfirmModal"}
            >
            <div className="Modal__in LogoutConfirmModal__in">
                <Col span={24}>
                    <Row gutter={[30,60]}>
                        <Col>
                            <div className="LogoutConfirmModal__text">
                                Вы уверены что хотите выйти из аккаунта?
                            </div>
                        </Col>
                        <Col span={24}>
                            <Row gutter={[20,20]}>
                                <Col span={12}>
                                    <Button
                                        text={'Отмена'}
                                        onClick={closeHandle}
                                        />
                                </Col>
                                <Col span={12}>
                                    <Button
                                        onClick={logout}
                                        text={'Выйти'}
                                        variant={'danger'}
                                        load={load}
                                        />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </div>
        </Modal>
    )
}

export default LogoutConfirmModal;
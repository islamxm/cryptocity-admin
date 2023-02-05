import './TrPage.scss';
import TrTable from '../components/TrTable/TrTable';
import PageLayout from '../../components/PageLayout/PageLayout';
import {motion} from 'framer-motion';
import contentEnterAnimProps from '../../ex/contentEnterAnimProps';
import { Row, Col } from 'antd';


const TrPage = () => {
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
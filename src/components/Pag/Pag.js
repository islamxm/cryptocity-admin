import './Pag.scss';
import { Pagination } from 'antd';

const Pag = ({
    total,
    current,
    onChange
}) => {


    return (
        <div className='Pag'>
            <Pagination 
                total={total}
                current={current}
                onChange={onChange}
                className="Pag__el"
                />
        </div>
    )
}

export default Pag;
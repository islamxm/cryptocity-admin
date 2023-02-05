import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import TrPage from '../pages/TrPage/TrPage';
import Header from '../components/Header/Header';
//pages


const App = () => {
    const loc = useLocation();



    return (
        <div className="App">
            <Layout>
                <Header/>
                <Routes>
                    <Route path='/' element={<TrPage/>}/>
                </Routes>
            </Layout>
            
            
        </div>
    )
}

export default App;
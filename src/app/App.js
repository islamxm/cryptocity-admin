import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import TrPage from '../pages/TrPage/TrPage';
import Header from '../components/Header/Header';
//pages
import CheckAuth from '../hoc/CheckAuth';
import AuthPage from '../pages/authPage/AuthPage';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const loc = useLocation();



    return (
        <div className="App">
            <ToastContainer/>
            <Layout>
                {
                    loc?.pathname !== '/auth' && loc?.pathname !== '/signup' ? (
                        <>
                            <Header/>
                        </>
                    ) : null
                }
                <Routes>
                    <Route path='/auth' element={<CheckAuth><AuthPage/></CheckAuth>}/>
                    <Route path='/' element={<CheckAuth><TrPage/></CheckAuth>}/>
                </Routes>
            </Layout>
            
            
        </div>
    )
}

export default App;
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Routers from './Routers';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from './redux/action';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProfile());
  },[])
  return (
    <div className="App">
      <Header />
      <Routers/>
      <Footer />
    </div>
  );
}

export default App;

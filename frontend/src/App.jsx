import './App.css'
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Favorites" element={<Favorites/>}/>
        </Routes>
      </main>
  );
}

/* 
parei nos minutos 52:41 
Learn React With This ONE Project
*/

export default App;

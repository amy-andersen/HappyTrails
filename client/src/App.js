import './App.css';
import AllTrails from './components/AllTrails';
import EditTrail from './components/EditTrail';
import NewTrail from './components/NewTrail';
import Profile from './components/Profile';
import LogReg from './views/LogReg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LogReg/>}/>
          <Route path="/home" element={<AllTrails/>}/>
          <Route path="/new" element={<NewTrail/>}/>
          <Route path="/edit/:id" element={<EditTrail/>}/>
          <Route path="/profile/:username" element={<Profile/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
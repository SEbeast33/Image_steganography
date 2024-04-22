import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Encode from './Encode';
import { BrowserRouter as Router, Link, Route, Switch,Routes } from 'react-router-dom';
import Decode from './Decode';
import VideoStego from './Videostego';

function App() {
  return (
  //   <>
  //  <Header/>
  //  <Encode/>
  //  </>

  <Router>
    <><Header/></>
  <Routes>
    <Route exact path="/" element={<Encode/>} />
    <Route path="/decode" element={<Decode/>} />
    <Route path="/video" element={<VideoStego/>} />
  </Routes>
</Router>
  );
}

export default App;
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Navbar from './components/navbar.components';
import GCashList from './components/gCashList.components';

import Collection from './components/addCollection.components';
import CashIn from './components/addCashin.components';
import DeleteData from './components/deleteData.components';
import Expenses from './components/addExpenses.components';

function App() {
  return (
    
  <Router>
    <Navbar/>
    <br/>

    <Routes>
      <Route path="/" exact element={<GCashList/>} />
      <Route path="/CashIn" element={<CashIn/>} />
      <Route path="/Collection" element={<Collection/>} />
      <Route path="/DeleteData/:id" element={<DeleteData/>} />
      <Route path="/Expenses" element={<Expenses/>} />
    </Routes>
  </Router>
  );
}

export default App;

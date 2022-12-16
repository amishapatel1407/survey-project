import './App.css';
import { Home, LoginPage, AdminPage, Categoryhierarchy, CategoriePg } from './Pages';
import { Header, Chess } from './Fronted/Components';
import AdduserForm from './Fronted/Components/AdminPanel/Adduser/AdduserForm'
import Protected from './Fronted/Components/Protected';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { useState } from 'react'
import { useSelector } from 'react-redux'

function App() {

  const data1 = JSON.parse(window.localStorage.getItem('data'))
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  console.log("isLoggedIn", isLoggedIn);
  const isallowed1 = window.localStorage.getItem("Isallowed") || 'not'
  const admin1 = localStorage.getItem('AdminPage')
  const [show, setshow] = useState(false)
  const userLists = useSelector((state) => state?.USerListReducer)
  const userlist1 = userLists?.UserList.filter((fdata) => fdata.role !== 'admin')
  console.log("userlist1", userlist1);

  return (
    <div className="App">
      <BrowserRouter>

        <Header setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          {/* <Route index element={<LoginPage />} /> */}
          <Route path='/' element={
            <Protected redirectPath="/home" isallowed1={!!isallowed1}  >
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            </Protected>
          }>
          </Route>
          <Route path='/home' element={
            <Protected redirectPath='/' isallowed1={!!isallowed1 && data1?.permissions?.includes('analyze')} >
              <Home setIsLoggedIn={setIsLoggedIn} />
            </Protected>
          }>
          </Route>
          <Route path='/adminpage' element={
            <Protected redirectPath='/' isallowed1={!!admin1 && data1?.roles?.includes('admin')} >
              <AdminPage />
            </Protected>
          }>
          </Route>
          <Route path='/registration' element={<div style={{ marginTop: 50 }}><AdduserForm setshow={setshow} userlist1={userlist1} /></div>}></Route>
          <Route path='/chess' element={<Chess />}></Route>
          <Route path='/amisha' element={<Categoryhierarchy />}></Route>
          <Route path='/category' element={<CategoriePg />}></Route>
        </Routes>

      </BrowserRouter>
      {/* <Footer />  */}
    </div>
  );
}

export default App;


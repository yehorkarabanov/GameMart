import logo from './logo.svg';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Account} from "./pages/Account";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"account/"} element={<Account/>}/>
    </Routes>
  );
}

export default App;

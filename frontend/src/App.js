import logo from './logo.svg';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Account} from "./pages/Account";
import {Like} from './pages/Like';
import {Cart} from "./pages/Cart";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"account/"} element={<Account/>}/>
            <Route path={"like/"} element={<Like/>}/>
            <Route path={"cart/"} element={<Cart/>}/>
        </Routes>
    );
}

export default App;

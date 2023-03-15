import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Contacts from "./components/Contacts";
import Login from "./components/Login";
import Loginroute from "./components/protectedroutes/login";
import User from "./components/protectedroutes/user";
import Signup from "./components/Signup";
import Formlayout from "./Layouts/Formlayout"
import Contactsfetch from "./Loaders/Loaders";
function App() {

  
const Routes=createBrowserRouter([{
  path:"/signup",element:<Loginroute><Signup/></Loginroute>
},{path:"/login",element:<Loginroute><Login/></Loginroute>},
{path:"/",element:<User><Contacts/></User>,loader:Contactsfetch}
])


  return (
    <div className="App">
    <RouterProvider router={Routes}/>
    </div>
  );
}

export default App;

import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from "./components/getUser/user";
import Add from "./components/addUser/add";
import Edit from './components/editUser/update';

function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;

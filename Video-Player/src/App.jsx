import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>} >
      <Route index element={<Home/>} />
    </Route>
    </>

  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App;

import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from './store';
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
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    
  )
}

export default App;

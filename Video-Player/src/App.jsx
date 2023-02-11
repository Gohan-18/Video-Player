import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from './store';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import VideoDetail from './Components/VideoDetail';
import SearchedItem from './Components/SearchedItem';
import ChannelDetail from './Components/ChannelDetail';
import Feed from './Components/Feed';
import AuthProvider, { useAuth } from './firebase/Auth';
import Watchlist from './Components/Watchlist';
import Profile from './Components/Profile';

function ProtectedRoute ({ children }) {
  const { user } = useAuth();

  if(!user) {
    return <Navigate to={'/'}/>
  }
  return children;
}

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>} >
      <Route index element={<Home/>} />
      <Route path='/videodetail/:id' element={<VideoDetail/>} />
      <Route path='/search/:keyword' element={<SearchedItem/>} />
      <Route path='/channeldetail/:channelid' element={<ChannelDetail/>} />
      <Route path='/feed/:keyword' element={<Feed/>} />
      <Route 
        path='/watchlist' 
        element={
          <ProtectedRoute>
            <Watchlist/>
          </ProtectedRoute>
        } />
      <Route 
        path='/profile' 
        element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        } />
    </Route>
    </>

  ))

  return (
    
    <Provider store={store}>
      <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>
    </Provider>
    
    
  )
}

export default App;

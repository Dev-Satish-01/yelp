import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UpdatePage from './routes/UpdatePage'
import Home from './routes/Home'
import RestaurantDetailPage from './routes/RestaurantDetailPage'
import { RestaurantsContextProvider } from './context/RestaurantsContext'

export default function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/restaurants/:id/update' element={<UpdatePage />}></Route>
            <Route exact path='/restaurants/:id' element={<RestaurantDetailPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </RestaurantsContextProvider>

  )
}

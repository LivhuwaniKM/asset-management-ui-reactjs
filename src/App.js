import React from 'react'
import Navigation from './components/navigation/Navigation'
import {BrowserRouter} from "react-router-dom"


const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Navigation />
      </BrowserRouter>
    </div>
  )
}

export default App

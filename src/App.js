import './App.css';
import React from "react";
// import { Gif, Grid } from '@giphy/react-components'
// import { GiphyFetch } from '@giphy/js-fetch-api'
// import ResizeObserver from "react-resize-observer";
import GifRender from './Components/GifRender';


// const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY)

function App() {
  return (
    <div className="App">
      <header className="Giphy-app">        
        <GifRender></GifRender>
        
        
      </header>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./GifRender.css";
import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
// import axios from "axios";

function GifRender()  {
//Acest state salveaza cautarile si rezultatele
// Are funtie pentru a prelua din localStorage
const [searches , setSearches] = useState(()=>{
    const localData = localStorage.getItem('searches');
    return localData ?  JSON.parse(localData) : [];
})
//Acest state salveaza rezulatele pentru a afisa gifurile
const [renderData, setRenderData] = useState([])

//Salveaza in localStorage doar atunci cand se modifica searches
useEffect(()=>{
    localStorage.setItem("searches", JSON.stringify(searches))
},[searches])

//Adauga cautarile si rezultatele in searches
//Adauga rezultatele in renderData pentru a fi afisate
const addSearches = search => {
    // Verifica sa nu se faca cautari goale sau cu spatii inutile
    if(!search.text || /^\s*$/.test(search.text)){
        return
    }
    //Verifica sa nu salveze aceeasi cautare de mai multe ori
    //Afiseaza rezultatele chiar daca a fost deja salvata cautarea
    if(searches.map(text => text.text === search.text ).includes(true)){
        setRenderData(search.data);  
        return    
    }
const newSearches = [search,...searches];
        setSearches(newSearches);
        setRenderData(search.data);  
}
//Sterge o cautare salvata
const removeSearch = id => {
    const removeArr = [...searches].filter(search => search.id !== id)
    setSearches(removeArr)
}
//Selecteaza o cautare si afiseaza rezultatele salvate
const selectSearch = id => {
  let  updatedSearches = searches.map(search => {
    if(search.id === id) {
        if(search.isSelected){
            search.isSelected = !search.isSelected
            setRenderData([]);
        } else{
            search.isSelected = !search.isSelected
            setRenderData(search.data);
        }      
    }
    return search    
    })
   setSearches(updatedSearches)
}
//Functiea pentru a forma rezultatele pentru a le afisa
const renderGifs = id => {
    return renderData.map(el => {
      return (
        <div key={el.id} className="gifId">
          <img className="gifImg" src={el.images.fixed_height.url} />
        </div>
      );
    });
  };

return(
    <>
    <div className="SearchBarContainer">
        <div>
            <h1 className="logo">Giphy-App</h1>
            <SearchBar onSubmit={addSearches}/>
            <div className="lastSearchesTitle">Last search</div>
            <div className="lastSearchesContainer">
            <SearchHistory searches={searches} selectSearch={selectSearch} removeSearch={removeSearch}/>
            </div>
            
        </div>
    </div>
    <div className="gifRenderContainer">
    <div className="gifCard">
    {renderGifs()}
    </div>
    </div>
    </>
)
}

export default GifRender;
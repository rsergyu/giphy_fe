import React, { useEffect, useRef, useState }  from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import {Slider} from "@material-ui/core"

function SearchBar(props) {
// Acest state retine cuvantul pe care urmeaza sa il cautam
const [input, setInput] = useState('')
// Acest state retine rezultatul primit de la fetch
const [data,setData] = useState([])
// Acest state ne ajuta sa avem numar dinamic de rezulate la cautare
const [sliderValue, setSliderValue] = useState(5);

//Inbunatateste experienta de utilizare 
// Pozitioneaza cursorul mereu in search box
const searchFocus = useRef(null)

useEffect(()=> {
    searchFocus.current.focus()
})

// Preia textul din search box 
const handleSearchValue = (e) => {
    setInput(e.target.value)
}   

// Funtia pentu a executa cautarea cand se apasa ENTER sau click pe buton
const handleSubmit = async e => {
    //Elimina refreshul la submit
    e.preventDefault();
    try {
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
            //S-a folosit dotenv pentru securitate
            api_key: process.env.REACT_APP_GIPHY_API_KEY,
            q: input,
            limit: sliderValue
            }
        });
        setData(results.data.data);        
    } catch (err) {
        console.log(err)
    }
};

//Asteptam sa se modifice stateul pentru data si apoi il trimitem mai departe
useEffect(() => {
    props.onSubmit({
        // Metoda rapida pentru id-uri aproape "unice"
        // Se poate inbunatatii cu cateva verificari inainte de a salva informatiile
    id: Math.floor(Math.random()* 100000) ,
    text: input,
    data: data
    });
    setInput('');
},[data]);

//Modifica vaoare pentru numarul de rezultate pe care il dorim
const updateValue = (e, value)=>{
    setSliderValue(value)
}
    return(
        <div className="search">
            <div className="searchInputsContainer">
                <form className="searchInputs" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="What you are looking for?" 
                        value={input}
                        onChange={handleSearchValue}
                        ref={searchFocus}                      
                        />  
                    <button                        
                        type="submit"
                        className="searchIcon">
                        <SearchIcon/>
                    </button>
                </form>
                <div className="sliderContainer">
                    <div>
                    <div className="sliderWrapper">
                        <Slider
                            size="large"
                            min={1}
                            max={10}                            
                            valueLabelDisplay="auto"
                            onChange={updateValue}
                            value={sliderValue}/>
                        </div>
                    <div className="sliderValueBox">Result to display: {sliderValue}</div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SearchBar;
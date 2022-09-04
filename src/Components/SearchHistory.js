import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import "./SearchHistory.css"

//Construieste sectiune de cautari salvate
//@searches - constine cautarile salvate
//@selectSearch - functie pentru a selecta si afisa o cautare salvata
//@removeSearch - functie pentru a sterge o cautare salvata
function SearchHistory({searches, selectSearch, removeSearch}) {
  
    return searches.map((search, index) => (
        <div className={search.isSelected ? 'search-result selected' : 'search-result'} key={index}>
            <div className='searchHistoryText'
                key={search.id}
                onClick={()=> selectSearch(search.id)}>
            {search.text}
            </div>
            <div className='icons'>
                <CloseIcon className='delete-icon' onClick={() => removeSearch(search.id)}/>
            </div>
        </div>

    )
    )
}

export default SearchHistory
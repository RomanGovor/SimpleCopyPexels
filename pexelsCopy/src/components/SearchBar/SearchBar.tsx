import React from "react";
import './search-bar.scss'
import searchIcon from '../../assets/icons/search.svg'

interface ISearchBar {
    isBigSearchBar?: boolean
}

const SearchBar: React.FC<ISearchBar> = ({isBigSearchBar = false}) => {
   return (
       <form className={'search-bar ' + (isBigSearchBar && 'search-bar--bigger')} method="get">
           <div className={'search-bar__container'}>
               <input placeholder="Search for free photos" type="search"/>
               <button>
                   <i className={'svg-icon'}><img src={searchIcon}/></i>
               </button>
           </div>
       </form>
   )
}

export default SearchBar;

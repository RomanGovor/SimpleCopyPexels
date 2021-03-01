import React from "react";
import './search-bar.scss'
import searchIcon from '../../assets/icons/search.svg'

const SearchBar: React.FC = () => {
   return (
       <form className={'search-bar'} method="get">
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

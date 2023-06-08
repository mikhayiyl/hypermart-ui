import React from 'react';
import styled from 'styled-components';
import { mobile } from '../../utilities/Responsive';
import { Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom';




export const SearchBox = styled.div`
width:100%;
float: left;
overflow: hidden;

${mobile({ width: "80%" })}


`

const SearchList = styled.ul`
height: auto;
max-height:300px;
overflow-y:scroll;
width: auto;
position: absolute;
background-color: #f9f9f9;
border-radius: 5px;
min-width: 30%;
box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
z-index: 110;
margin: 0;
padding: 0;

img{
  width: 20px;
  height: 20px;
  object-fit: cover;
}

li{
  list-style: none;
  display: flex;
  text-transform:lowercase;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 1px 3px;
  border-radius:5px;
  background-color:pink;
  align-items:center;
}

a{
  float: none;
  color: black;
  text-decoration: none;
  padding: 7px 20px;
  display: block;
  text-align: left;
}


//chrome/safari opera
&::-webkit-scrollbar{
  display: none;
}

-ms-overflow-style: none;
scrollbar-width: none;


${mobile({ width: "70%" })}


`


const SearchBar = ({ setFilters, searchedData, clearFilters }) => {



  return (
    <SearchBox className="DropDown" >
      <input type="search"
        className='form-control me-2'
        placeholder='Search products,categories...'
        aria-label='Search'
        onChange={(e) => setFilters(e.currentTarget.value)} />

      <SearchList className="Content">
        {searchedData.map(item =>
          <Link key={item._id} to={item.name ? `/category/${item._id}` : `/product/${item._id}`} className='link' onClick={clearFilters}>
            <li>
              <Avatar src={item.image} alt={item.name} />
              <small>{item.name || item.title}</small>
            </li>


          </Link>)}

      </SearchList>
    </SearchBox>
  )
}

export default SearchBar;
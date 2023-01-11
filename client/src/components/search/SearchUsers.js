import { useState, useEffect } from 'react';
import PaginationTable from '../paginationTable/PaginationTable';
import userService from "../../services/user.service";
import {userColumnDetails} from '../paginationTable/PaginationTable';

const SearchUsers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState('');

  useEffect(() => {
    loadRequestFn(1);
}, [searchValue, searchBy]);

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  }

  const loadRequestFn = async (currentPage) => {
    let response = await userService.searchUser(currentPage);
    let filteredData = response.users;
    console.log(searchBy)
    if (searchValue && (searchBy === 'email' || searchBy === 'displayName')) {
      console.log(" searching")

      filteredData = filteredData.filter((user) => {
        const fieldValue = (searchBy in user) ? user[searchBy] : undefined
        return fieldValue && fieldValue.toLowerCase().includes(searchValue.toLowerCase());
      });
      
      console.log(filteredData)

      return { totalElements: filteredData.length, content: filteredData }
    } else {
      return { totalElements: response.totalAmount, content: filteredData }
    }
  }  

  const routerLinkExtractor = (user) => {
    return `/user/${user.email}`
  };

  return (
    <div>
      <div>
        <input
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <select onChange={handleSearchByChange}>
          <option value="email">Email</option>
          <option value="displayName">Display Name</option>
        </select>
        <button onClick={() => loadRequestFn(1)}>Search</button>
      </div>
      <PaginationTable
          columnDetails={userColumnDetails}
          loadRequestFn={loadRequestFn}
          noDataBody="Couldn't load any user"
          routerLinkExtractor={routerLinkExtractor}
        />
    </div>
  );
}

export default SearchUsers;

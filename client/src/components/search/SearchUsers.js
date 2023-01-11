import { useState, useEffect } from 'react';
import PaginationTable from '../paginationTable/PaginationTable';
import userService from "../../services/user.service";
import {userColumnDetails} from '../paginationTable/PaginationTable';


const SearchUsers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const tesel = "bugbug";

  const defaultLoadRequestFn = () => {
    console.log("defaut")
    console.log(searchValue);
    return async (currentPage) => {
      console.log(searchValue);
      console.log(searchBy);
      console.log(tesel);
      const response = await userService.searchUser(currentPage, searchValue, searchBy);  
      return {totalElements: response.totalAmount,
              content: response.users };
    };
  }
  
  const [loadRequestFn, setLoadRequestFn] = useState(defaultLoadRequestFn);

  useEffect(() => {
    console.log("useEffect", searchValue);
    setLoadRequestFn(defaultLoadRequestFn);
}, [searchValue, searchBy]);

  const handleSearchValueChange = (event) => {
    console.log("handleSearchValueChange", event.target.value);
    setSearchValue(event.target.value);
  }

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
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
          <option value=""></option>
          <option value="email">Email</option>
          <option value="displayName">Display Name</option>
        </select>
        <button onClick={() => setLoadRequestFn(defaultLoadRequestFn)}>Search</button>
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

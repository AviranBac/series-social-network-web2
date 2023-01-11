import { useState, useEffect } from 'react';
import PaginationTable from '../paginationTable/PaginationTable';
import userService from "../../services/user.service";
import {userColumnDetails} from '../paginationTable/PaginationTable';


const SearchUsers = () => {

  const defaultLoadRequestFn = async (currentPage) => {
    const response = await userService.searchUser(currentPage, searchValue, searchBy);  
    console.log(response.users )
    return {totalElements: response.totalAmount,
            content: response.users };
  };
  
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [loadRequestFn, setLoadRequestFn] = useState(defaultLoadRequestFn);

  useEffect(() => {
    setLoadRequestFn(defaultLoadRequestFn);
}, [searchValue, searchBy]);

  const handleSearchValueChange = (event) => {
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

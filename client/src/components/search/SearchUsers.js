import { useState, useEffect } from 'react';
import PaginationTable from '../paginationTable/PaginationTable';
import userService from "../../services/user.service";
import {userColumnDetails} from '../paginationTable/PaginationTable';

const SearchUsers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState('');

  useEffect(() => {
    loadRequestFn();
  }, [searchValue, searchBy]);


  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  }

  const loadRequestFn = async (currentPage) => {
    const response = await userService.searchUser(currentPage);
    let filteredData = response.users;
    console.log("searching " + searchValue + " by " + searchBy )

    if (searchValue) {
      console.log(filteredData)

      filteredData = [{}];
      console.log(filteredData)

      // filteredData = filteredData.filter((user) => 
      //   user[searchBy].toLowerCase().includes(searchValue.toLowerCase())
      //);
      console.log("finised searching")
      if(filteredData.length > 0){ console.log("yes")}
    } 
      console.log(filteredData)

    return { totalElements: response.totalAmount, content: filteredData }
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
        <button onClick={loadRequestFn}>Search</button>
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
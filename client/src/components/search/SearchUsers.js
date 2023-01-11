import { useState, useEffect } from 'react';
import PaginationTable from '../paginationTable/PaginationTable';
import userService from "../../services/user.service";
import { userColumnDetails } from '../paginationTable/PaginationTable';
import classes from "./SearchUsers.moudle.css";

const SearchUsers = () => {
  const [emailSearchValue, setEmailSearchValue] = useState('');
  const [displayNameSearchValue, setDisplayNameSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState('');

  const defaultLoadRequestFn = () => {
    return async (currentPage) => {
      const response = await userService.searchUser(currentPage, emailSearchValue, displayNameSearchValue);
      return {
        totalElements: response.totalAmount,
        content: response.users
      };
    };
  }

  const [loadRequestFn, setLoadRequestFn] = useState(defaultLoadRequestFn);

  useEffect(() => {
    setLoadRequestFn(defaultLoadRequestFn);
  }, [emailSearchValue, displayNameSearchValue]);

  const handleEmailSearchValueChange = (event) => {
    setEmailSearchValue(event.target.value);
  }

  const handleDisplayNameSearchValueChange = (event) => {
    setDisplayNameSearchValue(event.target.value);
  }

  const routerLinkExtractor = (user) => {
    return `/user/${user.email}`
  };


  return (
    <div className="center">
      <div className="input-group">
        <label>Search by email:</label>
        <input
          value={emailSearchValue}
          onChange={handleEmailSearchValueChange}
        />
      </div>
      <div className="input-group">
        <label>Search by display name:</label>
        <input
          value={displayNameSearchValue}
          onChange={handleDisplayNameSearchValueChange}
        />
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

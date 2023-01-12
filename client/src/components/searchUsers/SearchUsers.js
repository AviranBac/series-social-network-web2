import { useState, useEffect } from 'react';
import PaginationTable from '../paginationTable/PaginationTable';
import userService from "../../services/user.service";
import { userColumnDetails } from '../paginationTable/PaginationTable';
import classes from "./SearchUsers.module.css";

const SearchUsers = () => {
  const [emailSearchValue, setEmailSearchValue] = useState('');
  const [displayNameSearchValue, setDisplayNameSearchValue] = useState('');

  const defaultLoadRequestFn = () => {
    return async (currentPage) => {
      const response = await userService.searchUsers(currentPage, emailSearchValue, displayNameSearchValue);
      return {
        totalElements: response.totalElements,
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
    <div>
      <div className="text-center">
        <div className={classes.inputGroup + ' ' + classes.container}>
          <label className={classes.label}>Search by email:</label>
          <input
            value={emailSearchValue}
            onChange={handleEmailSearchValueChange}
          />
        </div>
        <div className={classes.inputGroup + ' ' + classes.container}>
          <label className={classes.label}>Search by display name:</label>
          <input
            value={displayNameSearchValue}
            onChange={handleDisplayNameSearchValueChange}
          />
        </div>
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

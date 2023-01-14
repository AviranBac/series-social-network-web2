import { useEffect, useState } from 'react';
import PaginationTable, { userColumnDetails } from '../paginationTable/PaginationTable';
import userService from "../../services/user.service";
import classes from "./SearchUsers.module.css";
import { DebounceInput } from "react-debounce-input";

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
    return `/users/${user.email}`
  };


  return (
    <div>
      <div className="text-center">
        <div className={classes.inputGroup + ' ' + classes.container}>
          <label className={classes.label}>Search by email:</label>
          <DebounceInput
            value={emailSearchValue}
            onChange={handleEmailSearchValueChange}
          />
        </div>
        <div className={classes.inputGroup + ' ' + classes.container}>
          <label className={classes.label}>Search by display name:</label>
          <DebounceInput
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

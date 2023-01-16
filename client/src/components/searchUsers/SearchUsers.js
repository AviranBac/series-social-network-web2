import { useEffect, useState } from 'react';
import PaginationTable, { userColumnDetails } from '../paginationTable/PaginationTable';
import userService from "../../services/user.service";
import classes from "./SearchUsers.module.css";
import { DebounceInput } from "react-debounce-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchUsers = () => {
  const [emailSearchValue, setEmailSearchValue] = useState('');
  const [displayNameSearchValue, setDisplayNameSearchValue] = useState('');
  const [creationTimeSearchValue, setCreationTimeSearchValue] = useState(new Date());

  const defaultLoadRequestFn = () => {
    return async (currentPage) => {
      const response = await userService.searchUsers(currentPage, emailSearchValue, displayNameSearchValue, creationTimeSearchValue);
      return {
        totalElements: response.totalElements,
        content: response.users
      };
    };
  }

  const [loadRequestFn, setLoadRequestFn] = useState(defaultLoadRequestFn);

  useEffect(() => {
    setLoadRequestFn(defaultLoadRequestFn);
  }, [emailSearchValue, displayNameSearchValue, creationTimeSearchValue]);

  const handleEmailSearchValueChange = (event) => {
    setEmailSearchValue(event.target.value);
  }

  const handleDisplayNameSearchValueChange = (event) => {
    setDisplayNameSearchValue(event.target.value);
  }

  const handleCreationTimeSearchValueChange = (date) => {
    setCreationTimeSearchValue(date);
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
        <div className={classes.inputGroup + ' ' + classes.container}>
          <label className={classes.label}>Search by join date (older than):</label>
          <div className={classes.datePicker}>
             <DatePicker 
             selected={creationTimeSearchValue} 
             onChange={(date) => handleCreationTimeSearchValueChange(date)} />
         </div>
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

import React from "react";

function SearchField(props) {
    return (
        <div>
            <input type="text" onChange={props.searchChange} id="searchUsers" value={props.search} className="searchUser" ></input>
            <label htmlFor="searchUsers" class="searchUserL">Search Users</label>
        </div>
    )
}

export default SearchField
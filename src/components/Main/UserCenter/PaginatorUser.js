import React from "react"
import BackButton from "./BackButton"
import PageNumber from "./PageNumber"
import NextButton from "./NextButton"

function PaginatorUser(props) {
    return (
        <div>
            {props.page > 1 && 
            <BackButton page={props.page} backButton={props.backButton}/>}
            <PageNumber page={props.page} pages={props.pages}/>
            {props.page<props.pages &&
            <NextButton page={props.page} pages={props.pages} nextButton={props.nextButton}/>}
        </div>
    )
}

export default PaginatorUser
// { page > 1 && <BackButton page={props.page} backButton={props.backButton}/> }
// { pages > 1 && !props.close && <label className="pages" id="us">{page + " / " + pages}</label> }
// { pages > 1 && !props.close && page < pages && <input type="button" className="pagesForw" id="us" value=">" onClick={page === pages ? null : nextButton}></input> }
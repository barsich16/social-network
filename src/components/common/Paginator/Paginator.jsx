import s from "./Paginator.module.css"
import React, {useState} from "react";
import cn from "classnames"

const Paginator = ({onCurrentPageChanged, currentPage, totalItemsCount, pageSize, portionSize=10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++)
        pages.push(i);
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber-1)} } >PREVIOUS</button>}
            {pages.filter(p => p>= leftPortionPageNumber && p<= rightPortionPageNumber)
                .map(page => {
                return <span onClick={(e) => { onCurrentPageChanged(page) }}
                             className={ cn({ [s.selectedPage]: currentPage === page}, s.pageNumber)}
                             key={page} >{page}</span>
            })}
            {portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber+1)} }>NEXT</button>}
        </div>
    );
}

export default Paginator;

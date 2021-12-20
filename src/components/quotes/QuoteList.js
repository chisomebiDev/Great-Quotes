import { useHistory, useLocation } from "react-router-dom";
import sortQuotes from "../../sorting";
import QuoteItem from "./QuoteItem";
import styles from "./QuoteList.module.css";

function QuoteList(props) {
  const { quotes } = props;

  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";

  const order = isSortingAscending ? "desc" : "asc";
  const orderBtn = isSortingAscending ? "Descending" : "Ascending";

  const sortedQuotes = sortQuotes(quotes, isSortingAscending);

  function changeSortingHandler() {
    history.push(`${location.pathname}?sort=${order}`);
  }

  return (
    <>
      <div className={styles.sorting}>
        <button onClick={changeSortingHandler}>Sort {orderBtn}</button>
      </div>
      <ul className={styles.list}>
        {sortedQuotes.map((quote) => {
          const { id, author, text } = quote;
          return <QuoteItem key={id} id={id} author={author} text={text} />;
        })}
      </ul>
    </>
  );
}

export default QuoteList;

import QuoteList from "../quotes/QuoteList";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../ui/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";
import { useEffect } from "react";
import { getAllQuotes } from "../../lib/api";

export const DUMMY_QUOTES = [
  { id: "q1", author: "Chisomebi", text: "Learning React is Fun" },
  { id: "q2", author: "Chikeluba", text: "Learning FullStack is also Fun" },
];

function AllQuotes() {
  // prettier-ignore
  const {sendRequest, status, data: loadedQuotes,  error} =  useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) return <p className="centred focused">{error}</p>;

  if ((status === "completed" && !loadedQuotes) || loadedQuotes.length === 0) {
    return <NoQuotesFound />;
  }
  return <QuoteList quotes={loadedQuotes} />;
}

export default AllQuotes;

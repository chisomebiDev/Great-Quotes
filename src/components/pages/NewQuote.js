import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import QuoteForm from "../quotes/QuoteForm";
import useHttp from "../../hooks/use-http";
import { addQuote } from "../../lib/api";

function NewQuote() {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") history.push("/quotes");
  }, [status, history]);

  function addQuoteHandler(quoteData) {
    sendRequest(quoteData);
  }

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
}

export default NewQuote;

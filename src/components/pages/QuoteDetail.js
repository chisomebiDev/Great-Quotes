import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import HighlightedQuote from "../quotes/HighlightedQuote";
import Comments from "../comments/Comments";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../ui/LoadingSpinner";
import { getSingleQuote } from "../../lib/api";
import { useEffect } from "react/cjs/react.development";

function QuoteDetail() {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  // prettier-ignore
  const {sendRequest, status, data: loadedQuote, error}= useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending")
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (error) return <p className="centered focused">{error}</p>;

  if (!loadedQuote.text)
    return <p className="centered focused"> No Quote Found</p>;

  return (
    <>
      <HighlightedQuote quote={loadedQuote} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            View comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
}

export default QuoteDetail;

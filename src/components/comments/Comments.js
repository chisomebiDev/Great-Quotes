import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import useHttp from "../../hooks/use-http";
import CommentsList from "./CommentsList";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../ui/LoadingSpinner";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

function Comments() {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { quoteId } = useParams();

  // const { quoteId } = params;

  function startAddCommentHandler() {
    setIsAddingComment(true);
  }

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  let comments;

  if (status === "pending") {
    comments = (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No Comments Added Yet</p>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
}

export default Comments;

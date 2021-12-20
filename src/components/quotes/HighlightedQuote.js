import classes from "./HighlightedQuote.module.css";

function HighlightedQuote(props) {
  const { text, author } = props.quote;

  return (
    <figure className={classes.quote}>
      <p>{text}</p>
      <figcaption>{author}</figcaption>
    </figure>
  );
}

export default HighlightedQuote;

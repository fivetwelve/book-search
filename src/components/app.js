import React, { useRef, useState } from 'react';
// import fetch from 'cross-fetch';
import '../styles/global.scss';
import '../styles/app.scss';
import spinner from '../images/spinner.svg';

const App = () => {
  const [book, setBook] = useState('');
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState(null);
  const [displayResults, setDisplayResults] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const inputBook = useRef(null);
  const alphaButton = useRef(null);
  const dateButton = useRef(null);

  function handleClick() {
    if (inputBook.current.value !== '') {
      setDisplayResults(null);
      setSortType(null);
      setSortDirection(null);
      setBusy(true);
      search(book);
    }
  }

  function handleKeyPress(evt) {
    const charCode = typeof evt.which === 'number' ? evt.which : evt.keyCode;
    if (charCode === 13 && inputBook.current.value !== '') {
      setDisplayResults(null);
      setBusy(true);
      search(book);
    }
  }

  async function search(req) {
    const baseUrl = 'https://openlibrary.org/search.json?title=';
    const regex = / /g;
    const title = encodeURIComponent(req.replace(regex, '+'));

    let response = await fetch(baseUrl + title);
    let data = await response.json();
    setResults(data.docs);
    setDisplayResults(data.docs);
    setBusy(false);
  }

  function sortAlpha(evt) {
    dateButton.current.classList.remove('selected');
    evt.target.classList.add('selected');
    let arr;
    if (sortType !== 'ALPHA') {
      setSortType('ALPHA');
      setSortDirection('ASC');
      arr = [].concat(results).sort((a, b) => (a.title > b.title ? 1 : -1));
    } else {
      if (sortDirection === 'ASC') {
        arr = [].concat(results).sort((a, b) => (a.title < b.title ? 1 : -1));
        setSortDirection('DESC');
      } else {
        arr = [].concat(results).sort((a, b) => (a.title > b.title ? 1 : -1));
        setSortDirection('ASC');
      }
    }
    setDisplayResults(arr);
  }

  function sortDate(evt) {
    alphaButton.current.classList.remove('selected');
    evt.target.classList.add('selected');
    let arr;
    if (sortType !== 'NUM') {
      setSortType('NUM');
      setSortDirection('ASC');
      arr = []
        .concat(results)
        .sort((a, b) => (a.publish_year > b.publish_year ? 1 : -1));
    } else {
      if (sortDirection === 'ASC') {
        arr = []
          .concat(results)
          .sort((a, b) => (a.publish_year < b.publish_year ? 1 : -1));
        setSortDirection('DESC');
      } else {
        arr = []
          .concat(results)
          .sort((a, b) => (a.publish_year > b.publish_year ? 1 : -1));
        setSortDirection('ASC');
      }
    }
    setDisplayResults(arr);
  }

  return (
    <main>
      <div className="search-header">
        <h1>Book Search</h1>
        <span>
          Powered by{' '}
          <a href="https://openlibrary.org/" target="_blank" rel="noreferrer">
            Open Library
          </a>
        </span>

        <div className="search-input-container">
          <label htmlFor="bookName">
            <span className="sr-only">
              Enter a title press the Enter key to search.
            </span>
            <input
              ref={inputBook}
              type="text"
              name="bookName"
              required
              value={book}
              onChange={(evt) => setBook(evt.target.value)}
              onKeyPress={(evt) => handleKeyPress(evt)}
              placeholder="Enter a title"
            />
          </label>

          <label htmlFor="searchButton">
            <button
              data-testid="searchButton"
              name="searchButton"
              onClick={(evt) => handleClick()}
            >
              Search
            </button>
          </label>
        </div>
      </div>
      <div className="search-results-container">
        {busy && (
          <div className="search-status">
            <h4>Searching...</h4>
            <img src={spinner} alt="Please wait for results." />
          </div>
        )}
        {!busy && (!displayResults || displayResults?.length === 0) && (
          <h3 className="no-results">Sorry, no results found.</h3>
        )}
        {displayResults?.length > 0 && (
          <>
            {/* <div>Number of results: {displayResults.numFound}</div> */}
            <div className="sorting">
              <label htmlFor="sortAlphaButton">
                <button
                  ref={alphaButton}
                  data-testid="sortAlphaButton"
                  name="sortAlphaButton"
                  onClick={(evt) => sortAlpha(evt)}
                >
                  Sort Alphabetically
                </button>{' '}
              </label>
              <label htmlFor="sortDateButton">
                <button
                  ref={dateButton}
                  data-testid="sortDateButton"
                  name="sortDateButton"
                  onClick={(evt) => sortDate(evt)}
                >
                  Sort by Date
                </button>
              </label>
              <p>
                {(sortDirection === 'ASC' && <span>&#11014; Ascending</span>) ||
                  (sortDirection === 'DESC' && (
                    <span>&#11015; Descending</span>
                  ))}
              </p>
            </div>
            {displayResults.map((doc, idx) => {
              const isbn = (Array.isArray(doc.isbn) && doc.isbn[0]) || doc.isbn;

              const editionKey = doc.cover_edition_key || doc.edition_key[0];

              return (
                <div key={isbn + '--' + idx} className="result">
                  <div className="book-data">
                    {doc.subtitle ? (
                      <h3>
                        {doc.title}
                        <br />
                        <span className="subtitle">{doc.subtitle}</span>
                      </h3>
                    ) : (
                      <h3>{doc.title}</h3>
                    )}
                    {/* <h4>{(Array.isArray(doc.isbn) && doc.isbn[0]) || doc.isbn}</h4> */}
                    <h4>
                      {doc.author_name?.reduce(
                        (prev, current) => prev + ', ' + current,
                      )}
                    </h4>
                    <h4>
                      {(Array.isArray(doc.publish_year) &&
                        doc.publish_year[0]) ||
                        doc.publish_year}
                    </h4>
                    <a
                      href={`https://openlibrary.org/books/${editionKey}/`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Details
                    </a>
                  </div>
                  <div className="book-cover">
                    {doc.cover_i && (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
};

export default App;

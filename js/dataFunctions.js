export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById("search").value.trim();
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, " ");
  return searchTerm;
};

export const retrieveSearchResults = async (searchTerm) => {
  const SearchString = getSearchString(searchTerm);
  const SearchResults = await requestData(SearchString);
  let resultArray = [];
  if (SearchResults.hasOwnProperty("organic_results")) {
    resultArray = processResults(SearchResults.organic_results);
  }
  return resultArray;
};

const getSearchString = (searchTerm) => {
  const maxChars = getMaxChars(); //how many results we get
  const rawSearchString = `http://api.serpstack.com/search?access_key=69004834aacf9655b099df06a3148a3c&query=${searchTerm}&num=${maxChars}&output=json`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
};

//number of results based on viewport width
const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let Chars;
  if (width < 414) Chars = 15;
  if (width >= 414 && width < 1400) Chars = 20;
  if (width >= 1400) Chars = 30;
  return Chars;
};

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const processResults = (results) => {
  const resultArray = [];
  Object.keys(results).forEach((key) => {
    const id = key;
    const title = results[key].title;
    const text = results[key].snippet;
    const url = results[key].url
  
    const item = {
      id: id,
      title: title,
      text: text,
      url: url
    };
    resultArray.push(item);
  });
  return resultArray;
};

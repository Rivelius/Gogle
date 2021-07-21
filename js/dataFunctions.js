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
  if (SearchResults.hasOwnProperty("items")) {
    resultArray = processResults(SearchResults.items);
  }
  return resultArray;
};

const getSearchString = (searchTerm) => {
  const rawSearchString = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyCf_bWbJy_Y8v_2qba9CjVtRdZdWAiwZdk&cx=e63c6ca20192a6759&q=${searchTerm}`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
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
    const url = results[key].link
    const link = results[key].formattedUrl;
  
    const item = {
      id: id,
      title: title,
      text: text,
      url: url,
      link: link
    };
    resultArray.push(item);
  });
  return resultArray;
};

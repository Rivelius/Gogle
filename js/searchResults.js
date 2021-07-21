export const deleteSearchResults = () => {
  const parentElement = document.getElementById("searchResults");
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

export const buildSearchResults = (resultArray) => {
  resultArray.forEach((result) => {
    const resultItem = createResultItem(result);
    const resultContents = document.createElement("div");
    resultContents.classList.add("resultContents");
    const resultText = createResultText(result);
    resultContents.append(resultText);
    resultItem.append(resultContents);
    const searchResults = document.getElementById("searchResults");
    searchResults.append(resultItem);
  });
};

const createResultItem = (result) => {
  const resultItem = document.createElement("div");
  resultItem.classList.add("resultItem");
  const resultLink = document.createElement("div");
  resultLink.classList.add("resultLink");
  const resultDescription = document.createElement("p");
  resultDescription.textContent = result.link;
  resultLink.append(resultDescription);
  resultItem.append(resultLink);

  const resultTitle = document.createElement("div");
  resultTitle.classList.add("resultTitle");
  const link = document.createElement("a");
  link.href = result.url;
  link.textContent = result.title;
  link.target = "_blank";
  resultTitle.append(link);
  resultItem.append(resultTitle);
  return resultItem;
};


const createResultText = (result) => {
  const resultText = document.createElement("div");
  resultText.classList.add("resultText");
  const resultDescription = document.createElement("p");
  resultDescription.classList.add("resultDescription");
  resultDescription.textContent = result.text;
  resultText.append(resultDescription);
  return resultText;
};

export const clearStatsLine = () => {
  document.getElementById("stats").textContent = "";
};

export const setStatsLine = (numberOfResults) => {
  const statLine = document.getElementById("stats");
  if (numberOfResults) {
    statLine.textContent = `Displaying ${numberOfResults} results.`;
  } else {
    statLine.textContent = "Sorry, no results.";
  }
};

import { EMBED_URL_PARSERS } from './consts';

//ref: https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
const htmlDecode = (input) => {
  const e = document.createElement('textarea');
  e.innerHTML = input;

  return e.childNodes[0].nodeValue;
};

const isUrlValid = (url) =>
  url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  ) === null
    ? false
    : true;

const getUrlFromEmbedHtml = (htmlString) =>
  htmlString.match(/\bhttps?:\/\/\S+/gi)[0].split('"')[0];

export const getIframeSrc = (inputString) => {
  const url = htmlDecode(
    inputString.includes('</iframe>') ? getUrlFromEmbedHtml(inputString) : inputString,
  );
  if (!isUrlValid(url)) {
    return '';
  }

  let parsedString = null;

  EMBED_URL_PARSERS.some((parser) => {
    if (parser.condition(url)) {
      const embedString = parser.getEmbedString(url);
      if (embedString) {
        parsedString = embedString;
        return true;
      }
    }
    return false;
  });

  return parsedString || url;
};

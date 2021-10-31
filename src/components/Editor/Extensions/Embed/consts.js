const GSLIDES_URL_REGEX = new RegExp(
  '^https?://docs.google.com/presentation/d/(.*)$'
);
const GSHEETS_URL_REGEX = new RegExp(
  '^https?://docs.google.com/spreadsheets/d/(.*)$'
);
const GDOCS_URL_REGEX = new RegExp('^https?://docs.google.com/document/(.*)$');
const GDRIVE_URL_REGEX = new RegExp(
  '^https?://drive.google.com/file/d/(.*)/(preview|view).?usp=sharing$'
);
const YOUTUBE_URL_REGEX = new RegExp(
  '^(https?://)?(www.)?(youtube.com|youtu.?be)/.+$'
);
const YOUTUBE_EMBED_URL_REGEX = new RegExp(
  '^(https?://)?(www.)?(youtube.com|youtu.?be)/embed/.+$'
);
const FIGMA_URL_REGEX = new RegExp(
  'https://([w.-]+.)?figma.com/(file|proto)/([0-9a-zA-Z]{22,128})(?:/.*)?$'
);
const CODEPEN_URL_REGEX = new RegExp(
  '^https://codepen.io/(.*?)/(pen|embed)/(.*)$'
);
const GIST_URL_REGEX = new RegExp(
  '^https://gist.github.com/([a-z\\d](?:[a-z\\d]|-(?=[a-z\\d])){0,38})/(.*)$'
);
const LOOM_URL_REGEX = new RegExp(
  /^https:\/\/(www\.)?(use)?loom.com\/(embed|share)\/(.*)$/
);
const MIRO_URL_REGEX = new RegExp(
  /^https:\/\/(realtimeboard|miro).com\/app\/board\/(.*)$/
);
const SPOTIFY_URL_REGEX = new RegExp('https?://open.spotify.com/(.*)$');
const VIMEO_URL_REGEX = new RegExp(
  /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|)(\d+)(?:|\/\?)/
);

export const EMBED_URL_PARSERS = [
  {
    // Google Slides embed
    condition: (url) => Boolean(url.match(GSLIDES_URL_REGEX)),
    getEmbedString: (url) => {
      return url.replace('/edit', '/preview').replace('/pub', '/embed');
    },
  },
  {
    // Google Sheets/Docs embed
    condition: (url) =>
      Boolean(url.match(GSHEETS_URL_REGEX) || url.match(GDOCS_URL_REGEX)),
    getEmbedString: (url) => {
      return url.replace('/edit', '/preview');
    },
  },
  {
    // Google Drive embed
    condition: (url) => Boolean(url.match(GDRIVE_URL_REGEX)),
    getEmbedString: (url) => {
      return url.replace('/view', '/preview');
    },
  },
  {
    // Youtube embed
    condition: (url) =>
      Boolean(
        url.match(YOUTUBE_URL_REGEX) && !url.match(YOUTUBE_EMBED_URL_REGEX)
      ),
    getEmbedString: (url) => {
      // extracting videoId from youtube Url
      const matches = url.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
      );
      console.log('csd');
      if (matches && matches.length > 1) {
        return `https://www.youtube.com/embed/${matches[1]}?modestbranding=1`;
      }
      return null;
    },
  },
  {
    // Figma embed
    condition: (url) => Boolean(url.match(FIGMA_URL_REGEX)),
    getEmbedString: (url) => {
      return `https://www.figma.com/embed?embed_host=lyearn&url=${url}`;
    },
  },
  {
    // Codepen embed
    condition: (url) => Boolean(url.match(CODEPEN_URL_REGEX)),
    getEmbedString: (url) => {
      return url.replace(/\/pen\//, '/embed/');
    },
  },
  {
    // Gist embed
    condition: (url) => Boolean(url.match(GIST_URL_REGEX)),
    getEmbedString: (url) => {
      return `<script src="${url}.js"></script>`;
    },
  },
  {
    // Loom embed
    condition: (url) => Boolean(url.match(LOOM_URL_REGEX)),
    getEmbedString: (url) => {
      return url.replace('share', 'embed');
    },
  },
  {
    //Miro embed
    condition: (url) => {
      return Boolean(url.match(MIRO_URL_REGEX));
    },
    getEmbedString: (url) => {
      const matches = url.match(MIRO_URL_REGEX);
      if (matches && matches.length > 2) {
        const domain = matches[1];
        const boardId = matches[2];
        return `https://${domain}.com/app/embed/${boardId}`;
      }
      return null;
    },
  },
  {
    // Spotify embed
    condition: (url) => Boolean(url.match(SPOTIFY_URL_REGEX)),
    getEmbedString: (url) => {
      const parsedUrl = new URL(url);
      return `https://open.spotify.com/embed${parsedUrl.pathname}`;
    },
  },
  {
    // Vimeo embed
    condition: (url) => Boolean(url.match(VIMEO_URL_REGEX)),
    getEmbedString: (url) => {
      const matches = url.match(VIMEO_URL_REGEX);
      if (matches && matches.length > 4) {
        const videoId = matches[4];
        return `https://player.vimeo.com/video/${videoId}?byline=0`;
      }
      return null;
    },
  },
];

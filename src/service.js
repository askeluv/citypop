import axios from 'axios';

const ENDPOINT = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0JeEqzUK4VbX9qqUX4KKXOjSDeLnIwDGJNv7l4h8UkEhLMU_vc6M3_y82AkilxZATIeFb5SXje4ov/pub?output=tsv';

const _getVideoUrls = async () => {
  return await axios.get(ENDPOINT)
}

const _parseYouTubeUrl = url => {
  console.log('url', url);
  const split = url.split('?v=');
  return (split.length > 1 ? split[1] : split[0]).trim();
}

const _getFirstColumn = row => {
  return row.split('\t')[0];
}

const _shuffleArray = array => {
  return array.sort(() => { return 0.5 - Math.random() });
}

const getShuffledVideoUrls = async () => {
  const rawData = await _getVideoUrls();
  const allRows = rawData.data.split('\n');
  allRows.shift(); // skip header
  const allVideoUrls = allRows.map(_getFirstColumn);
  const parsedVideoUrls = allVideoUrls.map(_parseYouTubeUrl)
  return _shuffleArray(parsedVideoUrls);
}

export default getShuffledVideoUrls;
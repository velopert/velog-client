const { promisify } = require('util');
require('core-js/features/object/from-entries');
const axios = require('axios');
const client = axios.default;
const fs = require('fs');
const path = require('path');
const download = require('download');

const buildDir = path.join(__dirname, '../build/');

const assetManifestDir = path.join(buildDir, 'asset-manifest.json');
const assetHistoryDir = path.join(buildDir, 'asset-history.json');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

function replaceLastSlash(url) {
  if (url.charAt(url.length - 1) === '/') {
    return url.slice(0, url.length - 1);
  }
  return url;
}
const PUBLIC_URL = replaceLastSlash(process.env.PUBLIC_URL);

/**
 * Loads current asset-history from CDN
 */
async function getAssetHistory() {
  try {
    const response = await client.get(`${PUBLIC_URL}/asset-history.json`);
    return response.data;
  } catch (e) {
    return {
      history: [],
    };
  }
}

/**
 * reads asset-manifest.json of current build
 */
async function readAssetManifest() {
  const data = await readFileAsync(assetManifestDir, 'utf-8');
  return JSON.parse(data);
}

/**
 * Saves asset-history.json with given data
 * @param data
 */
async function writeAssetHistory(data) {
  const stringified = JSON.stringify(data, null, 2);
  return writeFileAsync(assetHistoryDir, stringified, 'utf-8');
}

/**
 * Filters out files that end with .map
 * @param {string[]} files
 */
function filterOutMapFiles(files) {
  return Object.fromEntries(
    Object.entries(files).filter(
      ([filePath]) => /.map$/.test(filePath) === false,
    ),
  );
}

/**
 * Downloads file at the corresponding path
 * @param {string[]} urls
 */
function downloadUrls(urls) {
  return Promise.all(
    urls.map((url) => {
      const downloadPath = url
        .slice(0, url.lastIndexOf('/'))
        .replace(PUBLIC_URL, '');
      return download(url, path.join(buildDir, downloadPath));
    }),
  );
}

async function keepChunks() {
  const assetHistory = await getAssetHistory();
  const assetManifest = await readAssetManifest();

  // filter out old data (always keep the latest one)
  const cacheDuration = 1000 * 60 * 60 * 24 * 3;
  const filteredHistory = assetHistory.history.filter(
    (item, index, array) =>
      index === array.length - 1 || Date.now() - item.date < cacheDuration,
  );

  const urls = filteredHistory
    .reduce((acc, current) => {
      return acc.concat(Object.values(current.files));
    }, [])
    .filter((url) =>
      ['index.html', 'loadable-stats.json', 'service-worker.js'].every(
        (ignored) => !url.includes(ignored),
      ),
    );

  try {
    await downloadUrls(urls);
  } catch (e) {}

  // update assetHistory
  assetHistory.history.push({
    date: Date.now(),
    files: filterOutMapFiles(assetManifest.files),
  });

  writeAssetHistory(assetHistory);
}

keepChunks();

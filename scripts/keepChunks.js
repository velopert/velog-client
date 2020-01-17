const axios = require('axios');
const client = axios.default;
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build/');

const assetManifestDir = path.join(buildDir, 'asset-manifest.json');
const assetHistoryDir = path.join(buildDir, 'asset-history.json');

async function getAssetHistory() {
  try {
    const response = await client.get(
      'https://static.velog.io/asset-history.json',
    );
    return response.data;
  } catch (e) {
    return {
      history: [],
    };
  }
}

async function readAssetManifest() {
  const data = await fs.promises.readFile(assetManifestDir, 'utf-8');
  return JSON.parse(data);
}

async function writeAssetHistory(data) {
  const stringified = JSON.stringify(data, null, 2);
  return fs.promises.writeFile(assetHistoryDir, stringified, 'utf-8');
}

function filterOutMapFiles(files) {
  return Object.fromEntries(
    Object.entries(files).filter(
      ([filePath]) => /.map$/.test(filePath) === false,
    ),
  );
}

async function keepChunks() {
  const assetHistory = await getAssetHistory();
  const assetManifest = await readAssetManifest();

  // TODO: filter out old data
  // TODO: download if exists...

  // update assetHistory
  assetHistory.history.push({
    date: Date.now(),
    files: filterOutMapFiles(assetManifest.files),
  });

  writeAssetHistory(assetHistory);
}

keepChunks();

// const assetHistory = {
//   history: [
//     {
//       date: '2020-01-17T14:30:00.251Z',
//       files: {
//         'static/js/0.98b2d894.chunk.js':
//           'https://static.velog.io/static/js/0.98b2d894.chunk.js',
//         'static/js/0.98b2d894.chunk.js.map':
//           'https://static.velog.io/static/js/0.98b2d894.chunk.js.map',
//       },
//     },
//     {
//       date: '2020-01-17T14:30:00.251Z',
//       files: {
//         'static/js/0.98b2d894.chunk.js':
//           'https://static.velog.io/static/js/0.98b2d894.chunk.js',
//         'static/js/0.98b2d894.chunk.js.map':
//           'https://static.velog.io/static/js/0.98b2d894.chunk.js.map',
//       },
//     },
//   ],
// };

// https://static.velog.io/manifest-history.json을 다운로드 (axios로 요청하는것 만으로도 충분)
// 3일 이상된 객체들을 filter out
// 남아있는 것들 모두 다운로드를 하고
// 현재 asset-manifest 열어서
// files의 .map으로 끝나는 것들 filter out 한다음에
// 배열에 push

// 이걸 manifest-history.json으로 build 디렉터리에 저장

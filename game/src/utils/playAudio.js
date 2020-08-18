// import ap from '@alipay/alipayjsapi/lib/alipayjsapi.inc';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

function getBuffer(src) {
  const context = new window.AudioContext();
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open('GET', src, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      context.decodeAudioData(
        request.response,
        (buffer) => {
          if (buffer) {
            resolve({ context, buffer });
            return;
          }
          reject('decoding error')
        }
      );
    };
    request.onerror = error => reject(error);
    request.send();
  });
}

function playBuffer({ context, buffer }) {
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
}

export default function playAudio(src) {
  if (!src) {
    return () => {};
  }

  // if (!window.AudioContext) {
  //   return () => {
  //     ap.playBackgroundAudio({
  //       src
  //     });
  //     ap.seekBackgroundAudio(0);
  //   };
  // }

  const bufferPromise = getBuffer(src);

  return () => bufferPromise.then((opts) => playBuffer(opts));
}

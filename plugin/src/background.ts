import Plugin from './Plugin';

const { storage } = chrome;

const plugin = new Plugin({});

plugin.on('installed', () => {
  storage.sync.set({color: '#3aa757'}, () => {
    console.log("The color is green.");
  });
});

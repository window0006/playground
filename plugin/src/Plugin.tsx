import { upperFirst } from './utils';

const { runtime } = chrome;

export default class Plugin {
  constructor(opts) {
  }

  on(eventName, callback) {
    const methodName = `on${upperFirst(eventName)}`;
    const eventObject = runtime[methodName];

    if (!eventObject) {
      console.log(`${methodName}缺失`);
      return;
    }
    
    eventObject.addListener(callback);
  }

}

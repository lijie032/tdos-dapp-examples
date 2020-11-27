const env = process.env.NODE_ENV;

var storage = {};

if (env === 'development') {
  storage.set = function (items) {
  	// console.log(items)
    var key, value;
    for (let k in items) {
      key = k;
      value = items[k];
      if (typeof value === 'object') {
        try {
          value = JSON.stringify(value);
        } catch (e) {
          console.log('本地存储报错',e);
        }
      }
      localStorage.setItem(key, value)
    }
  };

  storage.get = function (key) {
    if (typeof key === 'string') {
      try {
        var value = localStorage.getItem(key);
      } catch (e) {
        console.log(e)
      }

      return Promise.resolve(value);
    }
  };
}

if (env === 'production') {
  storage.set = function (items) {

    chrome.storage.local.set(items);
  };

  storage.get = function (key) {
    return new Promise(function (resolve) {
      chrome.storage.local.get(key, function (rs) {
        resolve(rs[key])
      });
    })
  }
}

export default storage;

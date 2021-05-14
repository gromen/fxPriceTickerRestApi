let fs = require("fs");
const FILE_NAME = "./assets/fxPriceTicker.json";

let fxPriceTickerApi = {
  getAllPrices: function (resolve, reject) {
    console.log(resolve);
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  getLatestPrice: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        console.log(data);
        const priceId = JSON.parse(data).find((price) => price.id == id);
        resolve(priceId);
      }
    });
  },
};
module.exports = fxPriceTickerApi;

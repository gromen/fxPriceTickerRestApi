const express = require("express");
const app = express();
const path = require('path');
let cors = require("cors");

let fxPriceTickerApi = require("./assets/fxPriceTickerApi");
let router = express.Router();

app.use(express.json());

app.use(cors());

router.get("/", function (req, res, next) {

  fxPriceTickerApi.getAllPrices(
    function (data) {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "all prices retrieved",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

router.get("/getAllPrices", function (req, res, next) {

  fxPriceTickerApi.getAllPrices(
    function (data) {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "all prices retrieved",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

router.get("/getLatestPrice/:id", function (req, res, next) {
  fxPriceTickerApi.getLatestPrice(
    req.params.id,
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "all prices retrieved",
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: "not found",
          message: `the price ${req.params.id} is not found`,
          error: {
            code: "NOT_FOUND",
            message: `the price ${req.params.id} is not found`,
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

app.use(express.static(path.join(__dirname, '/')));
app.use("/api/", router);

const server = app.listen(5000, function () {
  console.log("Node server is running on http://localhost:5000...");
});

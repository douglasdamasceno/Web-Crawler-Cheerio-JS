require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
console.log(process.env.FRONT_NOTICIES);

const leanResponse = html => {
  let $ = cheerio.load(html);
  return $(".story-title")
    .map((index, element) => ({
      title: $(element)
        .find(".story-link")
        .text(),
      url: $(element)
        .find(".story-link")
        .attr("href")
    }))
    .get();
};

const leanResponseImasters = html => {
  let $ = cheerio.load(html);
  return $(".post-title")
    .map((index, element) => ({
      title: $(element)
        .find("a")
        .text(),
      url: $(element)
        .find("a")
        .attr("href")
    }))
    .get();
};
const searchNoticies = async () => {
  try {
    const response = await axios({
      //url: process.env.FRONT_NOTICIES,
      url: process.env.IMASTERS_NOTICIES,
      method: "get"
    });
    //const objectReturn = await leanResponse(response.data);
    //return Promise.resolve(objectReturn);
    const objectReturn2 = await leanResponseImasters(response.data);
    return Promise.resolve(objectReturn2);
    //return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

searchNoticies()
  .then(res => console.log(res))
  .catch(err => console.log(err));
console.log("process.env.FRONT_NOTICIES");
//axios({
// url: process.env.FRONT_NOTICIES,
// method: "get"
//})
//.then(resp => console.log(resp.data))
//  .catch(err => console.log(err));

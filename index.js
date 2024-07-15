import express from "express";

import fs from "fs";

const app = express();
const port = 5000;

app.use((req, res, next) => {
  const timeOfTheDay = new Date().getHours;
  const dayOfTheWeek = new Date().getDay;

  if (
    timeOfTheDay < 9 ||
    timeOfTheDay > 17 ||
    dayOfTheWeek === 0 ||
    dayOfTheWeek === 6
  ) {
    res.send("Sorry, Our Office is currently closed");
  } else {
    next();
  }
});
//static middleware
app.use(express.static("public"));

//default route
app.get("/", (req, res) => {
  const homPageContent = fs.readFileSync("./public/homepage.html", "utf-8");
  res.send(homPageContent);
});

//contact us route
app.get("/contactus", (req, res) => {
  const contactUsPage = fs.readFileSync("./public/contactus.html", "utf-8");
  res.send(contactUsPage);
});

//our services route
app.get("/ourservices", (req, res) => {
  const ourServicesPage = fs.readFileSync("./public/ourservices.html", "utf-8");
  res.send(ourServicesPage);
});

app.listen(port);

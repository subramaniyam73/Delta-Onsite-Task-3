//jshint esversion:6

const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const ejs = require("ejs");
const url=require("url");
const app=express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

const server=app.listen(3000,function(req,res){
  console.log("server started in port 3000!");
});

const scrapingUrl="https://www.espncricinfo.com/series/8623/scorecard/1227870/trinbago-knight-riders-vs-jamaica-tallawahs-6th-match-caribbean-premier-league-2020";

request(scrapingUrl, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    let totalContent=$(".match-header .event").html()+$(".match-header .rhs").html()+$(".match-body .match-scorecard-page").html();

    // let img=$(".team-col img");
    
    let match={

    };
    let team1={

    };
    let team2={

    };

    match.desc=$(".desc.text-truncate").text();
    match.bestPlayer=$(".best-player-name a").text();
    match.bestPlayerTeam=$(".best-player-team-name").text();
    match.bestPlayerLink=$("#main-container > div > div.container > div:nth-child(2) > div > div.col-16.col-md-16.col-lg-12.main-content-x > div.card > div.match-header > div.rhs > div > div.best-player-content > div > div > a").attr("href");
    match.summary=$(".summary span").text();



    team1.name=$("#main-container > div > div.container > div:nth-child(2) > div > div.col-16.col-md-16.col-lg-12.main-content-x > div.card > div.match-header > div.event > div.teams > div:nth-child(1) > div:nth-child(1) > a > span").attr("title");
    team1.finScore=$("#main-container > div > div.container > div:nth-child(2) > div > div.col-16.col-md-16.col-lg-12.main-content-x > div.card > div.match-header > div.event > div.teams > div:nth-child(1) > div:nth-child(2) > div").text();
    team1.link=$("#main-container > div > div.container > div:nth-child(2) > div > div.col-16.col-md-16.col-lg-12.main-content-x > div.card > div.match-header > div.event > div.teams > div:nth-child(1) > div:nth-child(1) > a").attr("href");
    team1.link=url.resolve(scrapingUrl,team1.link);


    team2.name=$("#main-container > div > div.container > div:nth-child(2) > div > div.col-16.col-md-16.col-lg-12.main-content-x > div.card > div.match-header > div.event > div.teams > div:nth-child(2) > div:nth-child(1) > a > span").attr("title");
    team2.finScore=$("#main-container > div > div.container > div:nth-child(2) > div > div.col-16.col-md-16.col-lg-12.main-content-x > div.card > div.match-header > div.event > div.teams > div:nth-child(2) > div:nth-child(2) > div.score-run.font-weight-bold").text();
    team2.link=$("#main-container > div > div.container > div:nth-child(2) > div > div.col-16.col-md-16.col-lg-12.main-content-x > div.card > div.match-header > div.event > div.teams > div:nth-child(2) > div:nth-child(1) > a").attr("href");
    team2.link=url.resolve(scrapingUrl,team2.link);
    team2.target=$("#main-container > div > div.container > div:nth-child(2) > div > div.col-16.col-md-16.col-lg-12.main-content-x > div.card > div.match-header > div.event > div.teams > div:nth-child(2) > div:nth-child(2) > div.score-extra-score").text();


    // match.img=$("#main-container > div > div.container > div:nth-child(2) > div > div.col-16.col-md-16.col-lg-12.main-content-x > div.card > div.match-header > div.event > div.teams > div:nth-child(1) > div:nth-child(1) > img");

    console.log(match,team1,team2);


    app.get("/",(req,res)=>{
      res.render("match",{match,team1,team2,scrapingUrl});
    });

  }
});



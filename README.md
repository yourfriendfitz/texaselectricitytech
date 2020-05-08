# TexasElectricity.io

TexasElectricity.io is a JavaScript powered redsidental electricity plan rate comparison tool. Using the Public Utility Comission of Texas' provider and rate API, the tool allows users to input their historical usage to find the three lowest cost plans availble today.

## How It Works

Using the user's monthly usage data (manually entered) and zipcode, the site runs a rate comparison and returns the plans available in the zip code in ascending order of cost.

The API provides estimated cost in cents/kWh at 500kWh, 1000kWh, and 2000kWh usage levels. In order to estimate costs at any usage, the site calculates a rate of change between the points the usage falls between and then applies that rate of change to rate of the usage.

![example of typical plan api rate response](https://github.com/jasonephraim/texaselectricitytech/blob/master/img/max-bender-iF5odYWB_nQ-unsplash.jpg?raw=true)

## Tech

- Uses the [PowerToChoose.org provider API](http://api.powertochoose.org/api/PowerToChoose/plans)
- HTML
- JavaScript
- CSS
- Twitter Bootstrap

## New Features

- Now linking Plan Fact Sheets

## To Do Items

- Filter results by contract length and renewable energy plans.
- Improve UI/UX
- F.A.Q page

## Contributors

- Special thanks to [Josh Medeski](https://github.com/joshmedeski) for his assistance with helping refactor

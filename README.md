# 1. Introduction

This application generates a monthly productivity report for company metrics by grabbing data from a GraphQL API designed by Webduct.

Webduct Resources

- https://api.webduct.com/public/api-docs/v1/#/
- https://accounts.webduct.com/service_login/#!/login#top

## 1.1 Background

The program is opened via Visual Studio Code and executed from the command line.

Webdevelopment technologies used:

- React: Javascript library for building user interfaces.
- Node.js: Open source server environment that executes Javascript code outside a web browser.
- Express.js: Node.js back end application framework.
- GraphQL: Query language for accessing Webduct's API (application programming interface).
- Bootstrap: Front-end open source toolkit used for displaying table.

# 2. Setup

There are some applications that need to be installed just once. The command line will be used to install dependencies (javascript libraries).

## 2.1 Installation

You must install:

- Visual Studio Code: https://code.visualstudio.com/download
- Node: https://nodejs.org/en/download/

You can use https://phoenixnap.com/kb/install-node-js-npm-on-windows for help in installing Node.

## 2.2 Project and Dependencies Setup

You can download the project from github link:
https://github.com/richbingcao/Webduct

1. Download as a zip and extract.
2. Open Visual Studio Code and open the directory where you downloaded the project.
3. While in the current directory, open the terminal (Ctrl + Shift + \` ) and type `npm install` (this will download all the dependencies)

# 3. Usage

This is what needs to happen every single time to run a report.

1. Go to https://api.webduct.com/public/api-docs/v1/#/ and scroll down to `oauth`.
2. Click Post. Click Try it out. Username is api@umi1.com. Password is umi1. Execute.
3. Scroll down and in the response body, grab the `accessToken` which should be a combination of letters and numbers.
4. Navigate to \client\src\index.jsx and change the uri by replacing the accessToken. This accessToken after 24 hours or so.
5. In one terminal, run `npm run react-dev` (this compiles the code)
6. In the second terminal, run `npm start` (this starts the server on port 5000)
7. Access the server by using the browser and going to `localhost:5000`

Once you have everything setup, you must make changes in the program to grab data from certain months.

1. In \client\src\components\App.jsx, under the `GET_ORDERS` query you must change the `dateStart` and `dateEnd` for both orders and timecards.
2. Scroll all the way to the bottom and find `MaterialTable`. Change the title to reflect the correct month.
3. The code will auto-compile since you ran `npm run react-dev`. Navigate to `localhost:5000`
4. Right click the screen and `inspect` or press `Ctrl + Shift + i`.

# 3.1 Checking the data

We have to check the dashboard to make sure we're grabbing the right number of orders and total weight

1. Open a new tab https://accounts.webduct.com/service_login/#!/login#top
2. Login with Joseph Sroufe's account. user: jsroufe@umi1.com, pw: umi1
3. Click UMI logo to access the dashboard.
4. Change `Date Range Start` and then `Date Range End`.
5. At the top of the screen you can see `Total Timecards`. Scroll down to see `Work Order Summary`.
6. Comparing the data, check that Total Timecards and Total Weight is approximately equal (will not be exactly the same everytime).
7. Compare by looking at the inspector tools and the webpage generated.
8. Screenshot the page and create a PDF for it.
9. You can click the download button to export a CSV.

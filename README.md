<p align="center">
 
  # Fuelinator
 </p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/61824926/220138518-e1ddd25b-ccad-4a16-8c38-44c6798e7982.png"></img><br>
  <b><i>Don't Pay Fuelish Prices!</i></b>
</p>
<hr>

## What is Fuelinator?
Fuelinator is a React.js app, which finds you the cheapest fuel prices in Ireland with possible expansion of any location you search for.

Fuelinator will use the Google Maps API and fuel APIS in Ireland.

You will need to create an account to use the Fuelinator, this can be done on launch of the app.

The project idea was made in response to the global rise in fuel prices over the past year.

The app will also use Node.js within the app.

## Requirements/How To Start The App?
In order to run the app, you will need to install Node.js. <br>
Node.js Download: https://nodejs.org/en/download/

Once installed, you will need git installed on your machine. Clone this repo to get to code on your local machine. <br>
Git Download: https://git-scm.com/downloads

In order to clone the repo, I would suggest creating a new folder somewhere on your computer, and open it.<br>
Next right click inside the folder and click open in CMD, once it opens type:<br>
<b>git clone https://github.com/CianHession/Fuelinator</b>

Once that finishes, you will have to type: <br>
<b> cd fuelinator</b><br>
<b> npm install --force</b> <i>Note: --force is needed due to packages not being supported of newer versions of React</i> <br>
<b> npm start</b>

As the app is using the Google Maps API, you will need your own api key, you'll need to place it into a file called .env in the root of the projects folder like this:
<b>Fuelinator/.env</b>
The content of the file should be;
<i>REACT_APP_GOOGLE_MAPS_API_KEY=KEYHERE</i>
This key will only be used and visible to you.

And there you go!

Please leave me feedback at my email if you have any suggestions or questions.

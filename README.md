<p align="center">
 
  # Fuelinator
 </p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/61824926/220138518-e1ddd25b-ccad-4a16-8c38-44c6798e7982.png"></img><br>
  <b><i>Don't Pay Fuelish Prices!</i></b>
</p>
<hr>

## What is Fuelinator?
Fuelinator is a React.js application, which allows user to find the cheapest fuel prices in Ireland, you can find the cheapest prices either by selecting a county or finding the cheapest prices for the entirety of Ireland based on our data.

Fuelinator was developed using the Google Maps API, Node.js, MongoDB, React.js and Firebase.

You will need to create an account to use the Fuelinator, this must be done when launch of the app, you can not access Fuelinator until you do so.

## Requirements/How To Start The App?
In order to run the app, you will need to install Node.js. <br>
Node.js Download: https://nodejs.org/en/download/

Once installed, you will need git installed on your machine. Clone this repo to get to code on your local machine. <br>
Git Download: https://git-scm.com/downloads

Now we need to download Fuelinator.

You can press the <b>Windows key and R</b> at the same time to bring up a <b><i>'Run'</i></b> tab, and from here type <b>cmd</b>
Now a command prompt terminal will open, type: cd Desktop next type git Clone https://github.com/CianHession/Fuelinator, then cd Fuelinator and you are now inside the Fuelinator folder.

Alternatively, In order to clone the repo, I would suggest creating a new folder somewhere on your computer you wish to install the app, now open the folder.<br>
Next right click inside the folder and click open in CMD, once it opens type:<br>
<b>git clone https://github.com/CianHession/Fuelinator</b>
<b> cd Fuelinator</b> and now you are inside the folder.

Lastly, you will need a Google Maps API, you can register for a free 3 month trial with $300 credit here:
https://console.cloud.google.com/

Select Free trial option when you login to your google account, you then will need to create a project, you can leave it as a bare project, once completed go to https://console.cloud.google.com/google/maps-apis/credentials and click on create credentials, then copy the API Key provided.

Inside the Fuelinator folder you will see a file called .env, if you open it in your notepad, you should see the following;
<b> REACT_APP_GOOGLE_MAPS_API_KEY= </b> after the = sign you can paste your key, be sure to save the file and then close it.

Now we can use Fuelinator!

Since we are already in the folder, in command prompt terminal we need to run the following;
<b> npm install --force</b> <i>Note: --force is needed due to packages not being supported of newer versions of React</i> <br>
<b> npm start</b>

The inital install, which downloads required packages that Fuelinator uses, should take a little while, but you only need to run this command once, after the instal is complete you only need to run npm start to use it.

And That's it!, after a few seconds Fuelinator will launch and you can start saving money!

Please leave me feedback at my email if you have any suggestions or questions.

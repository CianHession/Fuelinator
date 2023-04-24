<p align="center">
 
  # Fuelinator.
 </p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/61824926/220138518-e1ddd25b-ccad-4a16-8c38-44c6798e7982.png"></img><br>
  <b><i>Don't Pay Fuelish Prices!</i></b>
</p>
<hr>

## What is Fuelinator?
Fuelinator is a React.js application, which allows user to find the cheapest fuel prices in Ireland, you can find the cheapest prices either by selecting a county or finding the cheapest prices for the entirety of Ireland based on our data.

Fuelinator was developed using 

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat)
![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=white&style=flat)
![Google Maps API](https://img.shields.io/badge/-Google%20Maps%20API-4285F4?logo=google-maps&logoColor=white&style=flat)

You will need to create an account to use the Fuelinator, this can be done at the launch of the app, you can not access Fuelinator until you do so.

# Aims/Objectives.
* <b>User Authentication:</b> Allow The User to Create and Use an Account.     <i>This is required in order to access Fuelinator.js</i>
* <b>Find Cheapest Fuel Prices In Ireland:</b> The user can toggle between all of Ireland, or they can pick any of the county's in Ireland.
* <b>Users Can Modify Prices:</b> The app relies on the users to keep prices updated, so I will let them edit and save prices.
* <b>Allow Users To Contact Me:</b> There is a built in Firebase contact forum, which when submitted is sent to me, where I can expand on the station's list.

## Requirements to run Fuelinator.
In order to run the app, you will need to install Node.js. <br>
Node.js Download: https://nodejs.org/en/download/

Once installed, you will need git installed on your machine. Clone this repo to get to code on your local machine. <br>
Git Download: https://git-scm.com/downloads

Now we need to download Fuelinator.

You can press the <b>Windows key and R</b> at the same time to bring up a <b><i>'Run'</i></b> tab, and from here type <b>cmd</b>

Now a command prompt terminal will open, assuming you have Fuelinator on your desktop type: <b>CD Desktop</b> 

Now type <b>git Clone https://github.com/CianHession/Fuelinator</b> Then <b>CD Fuelinator</b> and you are now inside the Fuelinator folder.

Lastly, you will need a Google Maps API, you can register for a free 3 month trial with $300 credit here:
https://console.cloud.google.com/

Select Free trial option when you login to your google account, you then will need to create a project, you can leave it as a bare project, once completed go to https://console.cloud.google.com/google/maps-apis/credentials and click on create credentials, then copy the API Key provided.

Inside the Fuelinator folder you will see a file called .env, if you open it in your notepad, you should see the following;
<b> REACT_APP_GOOGLE_MAPS_API_KEY= </b> here you can paste your api key after the equals sign, be sure not to put a space and then save the file and close it.

Now we can begin using Fuelinator!

# Launching Fuelinator.
Since we are already in the Fuelinator folder inside the command prompt terminal we need to run the following commands:

<b> npm install --force</b> <i>Note: --force is needed due to packages not being supported of newer versions of React</i> <br>
<b> npm start</b>

The inital install, which downloads required packages that Fuelinator uses, should take a while to complete, but it is important to note that you only need to run this command once on the first ever install of the application, after the install is complete you only need to run the second command to use it.

And That's it!, after a few seconds Fuelinator will launch in your browser and you can start saving money!

<hr>
Screencast <a href="https://atlantictu-my.sharepoint.com/:v:/r/personal/g00379799_atu_ie/Documents/screen-capture%201.webm?csf=1&web=1&e=lu8aOh">Here</a>

Please leave me feedback at my email if you have any suggestions or questions.

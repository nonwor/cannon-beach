# cannon-beach
This research project is a collaboration effort w/ my academic partner to segment and identify algae samples from microscope. The goal is to build a tool that helps marine researchers indentify alage from a micro scope image. The process to indentifly algae contains two parts. One, image sementation. This is achieved via image blur and boundry seperation. Image sementation is needed due to the nature of the images from the lab. At times, multiple alage can be in one mircoscope image, additionally traning/labeled images are more "zoomed" in, just for the yhat calculation, we need to zoom in a bit on the microscope images to aid the model calculation. 

In short:<br />
User images -> image processing -> image classification -> result/reporting. 
User makes corrections -> add new images to traning set -> rerun image classification model. 

## Build and run from root
npm install
npm run dev
nodemon server.cjs

.env file <br />
VITE_API_KEY=###
VITE_AUTH_DOMAIN=###
VITE_PROJECT_ID=###
VITE_STORAGE_BUCKET=###
VITE_MESSAGING_SENDER_ID=###
VITE_APP_ID=###

MONGO_URL=###

VITE_NODE_ENV='http://localhost:3000'



## Image segmentation and CV model
openCV, pytorch, matplotlib, numpy
![Alage1](webappImage/1688538380784.jpg)
![Alage1](webappImage/1688538381758.jpg)
![Alage1](webappImage/1688627875946.jpg)


## Front-end
React/Vite, Redux, Router, Bootstrap

## Back-end
Express, MongoDB, Firebase

## Features:
User auth, image upload, add credits and usage data.

## React App in action local
![Home](webappImage/home.PNG)
![Home](webappImage/login.PNG)
![Home](webappImage/retrive.PNG)
![Home](webappImage/usage_payments.PNG)

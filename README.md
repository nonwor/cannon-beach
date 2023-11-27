# cannon-beach
This research project is a collaborative effort between me and my academic partner, aimed at segmenting and identifying algae samples from microscope images. Our ultimate goal is to develop a tool that assists marine researchers in identifying algae based on microscope images. The algae identification process consists of two main parts: image segmentation and classification.

Firstly, we employ image segmentation techniques, including image blur and boundary separation, to effectively isolate individual algae within the microscope images. This step is crucial because the lab-generated images often contain multiple algae instances. Moreover, the training/labeled images are zoomed in to enhance the accuracy of the classification model. Consequently, we also need to zoom in slightly on the microscope images to facilitate the model's calculations.



In summary, the workflow of our project can be outlined as follows:<br />
User images -> image processing -> image classification -> result/reporting. <br />
User makes corrections -> add new images to training set -> rerun image classification model. 

## Build and run from root
```
npm install
npm run dev
nodemon server.cjs
```

.env file <br />
```
VITE_API_KEY=###<br />
VITE_AUTH_DOMAIN=###<br />
VITE_PROJECT_ID=###<br />
VITE_STORAGE_BUCKET=###<br />
VITE_MESSAGING_SENDER_ID=###<br />
VITE_APP_ID=###<br />

MONGO_URL=###<br />

VITE_NODE_ENV=###<br />
```


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
User auth, signin, sign out, image upload, add credits and usage data.<br />
Inprogress: Process uploaded images, modify meta info, generate report

## React App in action local
![Home](webappImage/home.PNG)
![Home](webappImage/login.PNG)
![Home](webappImage/retrive.PNG)
![Home](webappImage/usage_payments.PNG)

const {app} = require('../config/firebase.cjs')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");

console.log("Connected to Firebase");

const auth = getAuth(app);

const checkUser = async (req, res) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log("Yes, we have a user here!", uid);
        res.status(200).json(uid);
      } else {
        // User is signed out
        console.log("Active user not found!");
        res.status(400).json("Active user not found!");
      }
    });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json("Error checking user");
  }
};

const logIn=async(req, res)=>{

    console.log(req.body)
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("signin successful")
            console.log(user.uid, typeof(user.uid));
            res.status(200).json(user.uid);

            // dispatch(authinfo(user.uid));
            // navigate('/upload')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(400).json("error at login")
        });

    // res.status(200).json(req.body)
}

const createUser = async(req, res)=>{

    

    res.status(200)
}

module.exports = {
  checkUser,
  logIn,
  createUser,
};
const {app} = require('../config/firebase.cjs')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } = require("firebase/auth");

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
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(400).json("error at login")
        });
}

const createUser = async(req, res)=>{

  console.log(req.body)
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("signup successful")
          console.log(user.uid, typeof(user.uid));
          res.status(200).json(user.uid);
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          res.status(400).json("error at login")
      });
}

const logOut = async(req, res)=>{
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("successful logout")
    // dispatch(clearUserInfo())
    // navigate('/home')
    res.status(200).json('Successful logout')

  }).catch((error) => {
    // An error happened.
    res.status(400).json('error at logout')
  });

}

module.exports = {
  checkUser,
  logIn,
  createUser,
  logOut,
};
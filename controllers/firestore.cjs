const {app} = require('../config/firebase.cjs');
const {ref, getStorage, uploadBytes, listAll, getDownloadURL, updateMetadata} = require ('firebase/storage');

const storage = getStorage(app);

const uploadImage = async(req, res)=>{

    console.log("made it to axios")
    console.log("body", req.file)
    console.log(req.params.id)
    console.log(req.params.folder)
    console.log(req.params.imagname)
    // const imageRef = ref(storage, req.params)

    // uploadBytes(imageRef, image).then((response)=>{
    //     console.log("Response",response)
    //     // alert("image uploaded!")
    //     // setImageUpload(null);
    //     res.stats(200).json("ok")

    // }).catch((error) => {
    //     alert("Opps something went wrong!")
    //     console.log(errorMessage)
    //     res.stats(400).json("failed")
    //     // ..
    // });
    res.status(200).json('ok')

}

module.exports={
    uploadImage,
}
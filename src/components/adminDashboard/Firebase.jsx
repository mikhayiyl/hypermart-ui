import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import logger from "../../apiServices/logger";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvlGxqdWx79vMyKilOnDTbo1X4rQ00O8w",
  authDomain: "hypermart-c0dd4.firebaseapp.com",
  projectId: "hypermart-c0dd4",
  storageBucket: "hypermart-c0dd4.appspot.com",
  messagingSenderId: "1442503115",
  appId: "1:1442503115:web:3a9566a1f3a943f79fbe4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export default app;









export function uploadImage(image, doSubmit) {

  const fileName = new Date().getTime() + image.name;




  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);

  const uploadTask = uploadBytesResumable(storageRef, image);





  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  return uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      logger.log(error);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        doSubmit("downloadURL");
      }).catch(ex => logger.log(ex));
    }
  );
}
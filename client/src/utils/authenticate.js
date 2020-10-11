import axios from "axios";

export default function authenticate() {
  if (window.gapi) {
    const authInstance =  window.gapi.auth2.getAuthInstance();
    const isSignedIn = authInstance.isSignedIn.get();
    
    if (isSignedIn === false) {
      return null;
    }
    
    const user = authInstance.currentUser.get();
    const profile = user.getBasicProfile();

    const data = {
      id : profile.getId(),
      fullname: profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
    }
    
    axios.post("/api/user/create", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })

    return ({
      id: profile.getId(),
      fullname : profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      signOut: authInstance.signOut,
    })
  }
}
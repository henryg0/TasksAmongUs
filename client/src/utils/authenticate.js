// import axios from "axios";

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
      user_id : profile.getId(),
      email: profile.getEmail(),
      image_url: profile.getImageUrl(),
      full_name: profile.getName(),
    }
    
    // axios.post("/api/user/create", data)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })

    return ({
      id: profile.getId(),
      name : profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      signOut: authInstance.signOut,
    })
  }
}
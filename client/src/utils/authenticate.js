export default function authenticate() {
  if (window.gapi) {
    const authInstance =  window.gapi.auth2.getAuthInstance();
    const isSignedIn = authInstance.isSignedIn.get();
    
    if (isSignedIn === false) {
      return null;
    }
    
    const user = authInstance.currentUser.get();
    const profile = user.getBasicProfile();

    return ({
      id: profile.getId(),
      fullName : profile.getName(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      signOut: authInstance.signOut,
    })
  }
}
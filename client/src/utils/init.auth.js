export default function InitAuth() {
  window.gapi.load('auth2', () => {
    window.gapi.auth2.init({
      client_id: process.env.REACT_APP_AUTH_CLIENT_ID
    }).then(() => {
      const authInstance =  window.gapi.auth2.getAuthInstance();
      const isSignedIn = authInstance.isSignedIn.get();
      this.setState({ isSignedIn });
      
      authInstance.isSignedIn.listen(isSignedIn => {
        this.setState({ isSignedIn });
      })
    })
  })
}
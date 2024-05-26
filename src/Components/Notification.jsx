const Notification = ({ errorMessage, messageColor }) => {
  //* Showing different notification(error/success) based on the props received by the Component

    if (errorMessage) {
      return <div className={messageColor}>{errorMessage}</div>
    }
    return <div className="savingChanges" style={{ padding: 19 }}></div>
  }
  
  export default Notification
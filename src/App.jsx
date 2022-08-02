
import NotificationDisplay from "./NotificationDisplay.jsx";
import {NotificationProvider} from "./NotificationContext.jsx";

function App() {

  return (
    <div>
            <NotificationProvider>
                <NotificationDisplay/>
            </NotificationProvider>
    </div>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Events from "./components/Events"
import EventDetails from "./components/EventDetails"
import AddEvent from "./components/AddEvent"
import UpdateEvent from "./components/UpdateEvent"
import NavigationBar from "./components/NavigationBar"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/update-event/:id" element={<UpdateEvent />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App


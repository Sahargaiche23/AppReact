import axios from "axios"

const url = "http://localhost:3001/events"

// Fetch all events
export const getallEvents = async () => {
  return await axios.get(url)
}

// Fetch a single event by ID
export const getEventById = async (id) => {
  return await axios.get(`${url}/${id}`)
}

// Add a new event
export const addEvent = async (event) => {
  return await axios.post(url, event)
}

// Edit an existing event
export const editEvent = async (id, event) => {
  return await axios.put(`${url}/${id}`, event)
}

// Delete an event
export const deleteEvent = async (id) => {
  return await axios.delete(`${url}/${id}`)
}

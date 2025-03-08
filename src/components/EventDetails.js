"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, Button, Alert } from "react-bootstrap"
import { getEventById } from "../service/api"  // Use the correct function

const EventDetails = () => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()  // Get the event id from the URL

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id)  // Fetch the event by id
        setEvent(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching event details:", error)
        setError("Event does not exist")
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "30rem" }}>
        <Card.Img variant="top" src={event.img} alt={event.name} style={{ height: "300px", objectFit: "cover" }} />
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text>{event.description}</Card.Text>
          <Card.Text>
            <strong>Price:</strong> ${event.price}
          </Card.Text>
          <Card.Text>
            <strong>Available Tickets:</strong> {event.nbTickets}
          </Card.Text>
          <Card.Text>
            <strong>Participants:</strong> {event.nbParticipants}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Link to="/events">
              <Button variant="secondary">Back to Events</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default EventDetails

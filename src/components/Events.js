"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, Button, Row, Col } from "react-bootstrap"
import { getallEvents, deleteEvent } from "../service/api"

const Events = () => {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllEvents()
  }, [])

  const getAllEvents = async () => {
    try {
      const response = await getallEvents()
      setEvents(response.data)
    } catch (error) {
      console.error("Error fetching events:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id)
        getAllEvents() // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting event:", error)
      }
    }
  }

  return (
    <div>
      <h2 className="mb-4">Events List</h2>
      <Row>
        {events.map((event) => (
          <Col key={event.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={event.img}
                alt={event.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description.substring(0, 100)}...</Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ${event.price}
                </Card.Text>
                <Card.Text>
                  <strong>Available Tickets:</strong> {event.nbTickets}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Link to={`/events/${event.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                  <Button variant="warning" onClick={() => navigate(`/update-event/${event.id}`)}>
                    Update Event
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(event.id)}>
                    Delete Event
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Events


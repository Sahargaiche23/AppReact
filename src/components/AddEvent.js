"use client"

import { useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { addEvent } from "../service/api"
import { z } from "zod"

// Define validation schema with Zod
const eventSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  price: z.number().min(1).max(1000, { message: "Price must be between 1 and 1000" }),
  nbTickets: z.number().min(1).max(100, { message: "Number of tickets must be between 1 and 100" }),
  img: z.string(),
})

const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    nbTickets: "",
    img: "",
    nbParticipants: 0,
  })
  const [errors, setErrors] = useState({})
  const [fileSize, setFileSize] = useState(0)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type } = e.target

    if (type === "file") {
      const file = e.target.files[0]
      if (file) {
        // Check file size (5MB limit)
        const size = file.size / 1024 / 1024 // Convert to MB
        setFileSize(size)

        if (size > 5) {
          setErrors({ ...errors, img: "File size must not exceed 5MB" })
        } else {
          setErrors({ ...errors, img: null })
          // Create a URL for the file
          const imgUrl = URL.createObjectURL(file)
          setFormData({ ...formData, img: imgUrl })
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? Number.parseFloat(value) : value,
      })
    }
  }

  const validateForm = () => {
    try {
      eventSchema.parse({
        ...formData,
        price: Number.parseFloat(formData.price),
        nbTickets: Number.parseInt(formData.nbTickets),
      })

      // Additional validation for file size
      if (fileSize > 5) {
        return { img: "File size must not exceed 5MB" }
      }

      return {}
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {}
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message
        })
        return formattedErrors
      }
      return { form: "Validation failed" }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const eventToAdd = {
        ...formData,
        price: Number.parseFloat(formData.price),
        nbTickets: Number.parseInt(formData.nbTickets),
        nbParticipants: 0,
      }

      await addEvent(eventToAdd)
      navigate("/events")
    } catch (error) {
      console.error("Error adding event:", error)
      setErrors({ form: "Failed to add event. Please try again." })
    }
  }

  return (
    <div>
      <h2 className="mb-4">Add New Event</h2>
      {errors.form && <Alert variant="danger">{errors.form}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            type="number"
            name="nbTickets"
            value={formData.nbTickets}
            onChange={handleChange}
            isInvalid={!!errors.nbTickets}
          />
          <Form.Control.Feedback type="invalid">{errors.nbTickets}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="img" onChange={handleChange} isInvalid={!!errors.img} />
          <Form.Control.Feedback type="invalid">{errors.img}</Form.Control.Feedback>
          <Form.Text className="text-muted">File size should not exceed 5MB.</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Event
        </Button>
      </Form>
    </div>
  )
}

export default AddEvent


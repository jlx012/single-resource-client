import React, { useState } from 'react'
import FoodForm from '../shared/FoodForm'
import { updateFoodSuccess, updateFoodFailure } from '../shared/AutoDismissAlert/messages'

const UpdateFood = (props) => {
    const { 
        user, show, handleClose, 
        updateFood, msgAlert, triggerRefresh
    } = props

    const [food, setFood] = useState(props.food)

    console.log('food in edit modal', food)

    const handleChange = (e) => {
        setFood(prevFood => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "yummy" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "yummy" && !e.target.checked) {
                updatedValue = false
            }

            const updatedFood = {
                [updatedName]: updatedValue
            }
            return {
                ...prevFood,
                ...updatedFood
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateFood(user, food)

            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateFoodSuccess,
                    variant: 'success'
                })
            })

            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateFoodFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <FoodForm 
            food={ food } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new food!"
        />
    )
}

export default UpdateFood
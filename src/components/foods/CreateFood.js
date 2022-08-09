import { useState } from 'react'
import { createFood } from '../../api/food'
import { useNavigate } from 'react-router-dom'
import { createFoodSuccess, createFoodFailure } from '../shared/AutoDismissAlert/messages'
import FoodForm from '../shared/FoodForm'

const CreateFood = (props) => {
    console.log('these are the props in createFood\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [food, setFood] = useState({
        name: '',
        type: '',
        description: '',
        yummy: true
    })

    console.log('this is food in createFood', food)

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

        e.preventDefault()

        createFood(user, food)

            .then(res => { navigate(`/foods/${res.data.food.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createFoodSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createFoodFailure,
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

export default CreateFood
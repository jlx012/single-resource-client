import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneFood, removeFood } from '../../api/food'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowFood = (props) => {
    const [food, setFood] = useState(null)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the food in showFood', food)

    useEffect(() => {
        getOneFood(id)
            .then(res => setFood(res.data.food))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting food',
                    message: messages.getFoodsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])


    const removeTheFood = () => {
        removeFood(user, food.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeFoodSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/foods')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing food',
                    message: messages.removeFoodFailure,
                    variant: 'danger'
                })
            })
    }

    if (!food) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ food.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Type: { food.type }</small></div>
                            <div><small>Description: { food.description }</small></div>
                            <div><small>
                                Yummy: { food.yummy ? 'yes' : 'no'}
                            </small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                                <Button onClick={() => removeTheFood()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Throw {food.name} away
                                </Button>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default ShowFood
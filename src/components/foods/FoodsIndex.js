import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllFoods } from '../../api/food'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const FoodsIndex = (props) => {
    const [foods, setFoods] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in FoodsIndex', props)

    useEffect(() => {
        console.log(props)
        getAllFoods()
            .then(res => setFoods(res.data.foods))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Foods',
                    message: messages.getFoodsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    if (!foods) {
        return <LoadingScreen />
    } else if (foods.length === 0) {
        return <p>No foods yet. Better add some.</p>
    }

    const foodCards = foods.map(food => (
        <Card style={{ width: '30%', margin: 5}} key={ food.id }>
            <Card.Header>{ food.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/foods/${food.id}`}>View { food.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { foodCards }
        </div>
    )
}

export default FoodsIndex
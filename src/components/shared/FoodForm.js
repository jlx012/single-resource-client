import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const FoodForm = (props) => {
    const { food, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Food Name?"
                    name="name"
                    id="name"
                    value={ food.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Form.Control
                    placeholder="What kind of food is this?"
                    name="type"
                    id="type"
                    value={ food.type }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    placeholder="Describe the food!"
                    name="description"
                    id="description"
                    value={ food.description }
                    onChange={ handleChange }
                />
                <Form.Check
                    label="Is this food yummy?"
                    name="yummy"
                    defaultChecked={ food.yummy  }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default FoodForm
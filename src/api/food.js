import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllFoods = () => {
    return axios(`${apiUrl}/foods`)
}

export const getOneFood = async (id) => {
    return axios(`${apiUrl}/foods/${id}`)
}

export const addFood = (user, newFood) => {
	return axios({
		url: apiUrl + '/foods',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { food: newFood }
	})
}

export const updateFood = (user, updatedFood) => {

    console.log('this is updatedFood', updatedFood)
	return axios({
		url: `${apiUrl}/foods/${updatedFood.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { food: updatedFood }
	})
}

export const removeFood = (user, foodId) => {
    return axios({
        url: `${apiUrl}/foods/${foodId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}
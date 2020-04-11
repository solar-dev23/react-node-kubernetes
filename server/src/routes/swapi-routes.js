const express = require('express')
const routes = express.Router()
const axios = require('axios')

routes.get('/swapi/people', (req, res) => {
	try {
		axios.get(
			'https://api.thecatapi.com/v1/votes',
			{
				headers: {
					'content-type': 'application/json',
					'x-api-key': 'DEMO-API-KEY'
				}
			}
		).then(
			response => {
				res.send(response.data)
			}
		)
	} catch (err) {
		res.status(500).send();
	}
})

module.exports = routes


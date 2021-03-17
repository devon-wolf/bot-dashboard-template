import request from 'superagent'

const URL = 'https://minion-server.herokuapp.com';

export async function getAllResponses() {
	const response = await request.get(`${URL}/responses`);
	
	return response.body;
}

export async function getResponseByID(id) {
	const response = await request.get(`${URL}/responses/${id}`);
	
	return response.body;
}

export async function addNewResponse(responseObject, token) {
	const response = await request.post(`${URL}/api/responses`)
		.set({ Authorization: token })
		.send(responseObject);

	return response.body;
}

export async function editResponse(id, responseObject, token) {
	const response = await request.put(`${URL}/api/responses/${id}`)
		.set({ Authorization: token })
		.send(responseObject);

	return response.body;
}

export async function deleteResponse(id, token) {
	const response = await request.delete(`${URL}/api/responses/${id}`)
		.set({ Authorization: token });
	
	return response.body;
}
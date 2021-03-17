import request from 'superagent'

const URL = 'https://minion-server.herokuapp.com/auth';

async function getUserAuth(username, password, authRoute) {
	const response = await request.post(`${URL}/${authRoute}`)
			.send({ username, password });

		return response.body;
}

// this is set up so that new users can't be directly created through the frontend; a new account can still be created through postman/other means of post requests if needed
export async function loginOrSignup(username, password) {
	let response = {};
	try {
		response = await getUserAuth(username, password, 'signin');
	}
	catch(e) {
		response = {
			id: '', 
			username: '', 
			token: ''
		};
		console.log('could not sign in user');
	}
	
	return response;
}
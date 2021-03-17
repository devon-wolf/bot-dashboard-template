const TOKEN = 'TOKEN';

export function storeToken(user) {
	localStorage.setItem(TOKEN, JSON.stringify(user.token));
}

export function getToken() {
	const token = localStorage.getItem(TOKEN);
	if (!token) return '';
	return JSON.parse(token);
}
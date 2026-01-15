import axios from "axios";

function getCookie(name: string) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()!.split(";").shift();
	return undefined;
}

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

axios.interceptors.request.use((config) => {
	const method = (config.method || "get").toLowerCase();
	if (["post", "put", "patch", "delete"].includes(method)) {
		const token = getCookie("csrftoken");
		if (token) {
			config.headers = config.headers ?? {};
			config.headers["X-CSRFToken"] = token;
		}
	}
	return config;
});

export default axios;

export const logout = (navigate: (path: string) => void) => {
	sessionStorage.removeItem("user_id");
	sessionStorage.removeItem("nickname");
	navigate("/login");
};

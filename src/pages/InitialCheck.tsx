import { useAuthStore, getLoginURL } from "../stores/authStore";
import { useEffect } from "react";
import { getCurrentStudent } from "../services/authService";
import { useGameConfigStore } from "../stores/gameConfigStore";


function CheckAuth() {
    const { token, setStudent } = useAuthStore((state) => state);
    const { setGameConfig } = useGameConfigStore((state) => state);
    useEffect(() => {
        const loginURL = getLoginURL();
        if (!token) {
            window.location.href = loginURL;
            return;
        }
        getCurrentStudent({token: token}).then((response) => {
            setStudent(response.data.data);
            }).catch(() => {
                window.location.href = loginURL;
            });

    }, [token, setStudent, setGameConfig]);

    return null
}


export default CheckAuth;

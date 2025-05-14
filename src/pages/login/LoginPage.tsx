import { useParams, useNavigate } from "react-router";
import { login, getCurrentStudent } from "../../services/authService";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";  
import { useLanguageStore, LanguageCode } from "../../stores/languageStore";
import { useUiStore } from "../../stores/uiStore";
import { useNotificationStore } from "../../stores/notificationStore";

function LoginPage() {
    const { langCode, userID, userToken } = useParams();
    const { setStudent, setToken } = useAuthStore((state) => state);
    const { setLanguage } = useLanguageStore((state) => state);
    const { setIsLoading } = useUiStore((state) => state);
    const { setNotification } = useNotificationStore((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setLanguage(langCode as LanguageCode);
        if (userID && userToken) {
            login(userID, userToken).then((response) => {
                setToken(response.data.data);
                getCurrentStudent({token: response.data.data}).then((response) => {
                    setStudent(response.data.data);
                    navigate('/');
                    setIsLoading(false);
                }).catch(() => {
                    setNotification('Couldn\'t get student data', 'error', 'filled', { vertical: 'bottom', horizontal: 'center' });
                    setIsLoading(false);
                });
            }).catch(() => {
                setNotification('Login failed', 'error', 'filled', { vertical: 'bottom', horizontal: 'center' });
                setIsLoading(false);
            });
        } else {
            navigate('/');
        }
    }, [userID, userToken, langCode]);

    return null
}

export default LoginPage;
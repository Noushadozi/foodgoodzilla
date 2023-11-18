import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName
                }
                axiosPublic.post("/users", userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate('/');
                    })
            })
            .catch(() => {

            })
    }
    return (
        <div className="px-8 py-2">
            <div className="btn" onClick={handleGoogleSignIn}>
                <FaGoogle></FaGoogle>Google
            </div>
        </div>
    );
};

export default SocialLogin;
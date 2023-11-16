import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2'

const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        reset();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Register Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <Helmet>
                <title>FoodGoodzilla | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="card-body">

                            <div className="form-control">

                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>

                                <input  {...register("name", { required: true })} name="name" type="text" placeholder="name" className="input input-bordered" />

                                {errors.name && <span className="text-red-400">Name is required</span>}
                            </div>
                            <div className="form-control">

                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>

                                <input  {...register("photoURL", { required: true })} name="photoURL" type="text" placeholder="photo" className="input input-bordered" />

                                {errors.photo && <span className="text-red-400">Photo is required</span>}

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input  {...register("email", { required: true })} name="email" type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-400">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} name="password" type="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && <span className="text-red-400">Password is required</span>}
                                {errors.password?.type === "minLength" && <span className="text-red-400">Password must be 6 characters</span>}
                                {errors.password?.type === "maxLength" && <span className="text-red-400">Password must be under 20 characters</span>}
                                {errors.password?.type === "pattern" && <span className="text-red-400">Password must have uppercase, lowercase, special character and a number.</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" value={"sign up"} type="submit"></input>
                            </div>
                        </form>
                        <p>already have an account? <Link to={"/login"}>Login here!</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
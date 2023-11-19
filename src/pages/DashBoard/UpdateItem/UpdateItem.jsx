import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { name, category, recipe, price, _id } = useLoaderData();

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-Type": "multipart/form-data"
            },
        })
        // console.log('image uploaded', res)
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseInt(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            if (menuRes.data.acknowledged) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data)
    };

    return (
        <div>
            <SectionTitle
                heading={"Update item"}
                subHeading={"REFRESH INFO"}
            ></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Recipe name *</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={name}
                        placeholder="recipe name"
                        {...register("name", { required: true })}
                        className="input input-bordered w-full" />
                </div>
                <div className="flex gap-6 items-center">

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Price *</span>
                        </label>
                        <input
                            defaultValue={price}
                            type="number"
                            placeholder="price"
                            {...register("price", { required: true })}
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Category *</span>
                        </label>
                        <select
                            {...register("category", { required: true })}
                            defaultValue={category}
                            className="select select-bordered w-full max-w-xs">
                            <option disabled value="default">Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe details</span>
                    </label>
                    <textarea
                        defaultValue={recipe}
                        {...register("recipe", { required: true })}
                        className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>
                <div className="my-6 w-full">
                    <input
                        {...register("image", { required: true })}
                        type="file"
                        className="file-input w-full max-w-xs" />
                </div>
                <button className="btn">Update Item</button>
            </form>
        </div>
    );
};

export default UpdateItem;
import { useForm } from "react-hook-form"
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
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
        // console.log('image uploaded', res.data.data.display_url)
        if (res.data.success) {
            // now send the menu item data with the url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseInt(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post("/menu", menuItem);
            console.log(menuRes.data)
            if (menuRes.data.acknowledged) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been added`,
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
                heading={"Add an item"}
                subHeading={"What's new?"}
            ></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} />
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Recipe name *</span>
                    </label>
                    <input
                        type="text"
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
                            defaultValue={"default"}
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
                        {...register("recipe", { required: true })}
                        className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>
                <div className="my-6 w-full">
                    <input
                        {...register("image", { required: true })}
                        type="file"
                        className="file-input w-full max-w-xs" />
                </div>
                <button className="btn">Add Item</button>
            </form>
        </div>
    );
};

export default AddItems;

const MenuItem = ({ item }) => {
    const { image, price, recipe, name } = item;
    return (
        <div className="flex space-x-4">
            <img style={{ borderRadius: "0 250px 200px 250px" }} className="w-[120px]" src={image} alt="" />
            <div>
                <h3>{name}---------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;
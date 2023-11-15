import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg"
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle
                heading={"Featured Item"}
                subHeading={"Check it out"}
            ></SectionTitle>
            <div className="md:flex justify-center items-center pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10 space-y-2">
                    <p>Aug 20, 2024</p>
                    <p className="uppercase">Where can i get som?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, laborum? Reprehenderit facere blanditiis deleniti velit. Accusamus corrupti quasi nesciunt sapiente libero harum ipsam quia in molestias blanditiis itaque sunt deserunt, fugit illum consequatur quisquam porro! Optio accusantium tenetur repellat deleniti culpa nihil, alias aliquam quam debitis distinctio numquam nam?</p>
                    <button className="btn btn-outline text-white border-0 border-b-4">Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
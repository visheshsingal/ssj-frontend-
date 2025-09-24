/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getDiscount } from "../../../utils/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const Product = (props) => {
    const {
        _id,
        name,
        price,
        discountPrice,
        images,
        ratings,
        numOfReviews,
        func,
    } = props;
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteProduct = async () => {
        setIsDeleting(true);
        try {
            await func(_id);
        } catch (error) {
            // Handle any errors if necessary
        } finally {
            setIsDeleting(false);
        }
    };
    const shouldRenderImage = images && images.length > 0;

    return (
        <div className="flex gap-4 p-4 sm:pb-8 w-full group overflow-hidden bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 rounded-xl shadow border border-gray-800 mb-4">
            <div className="w-1/6 h-28 flex-shrink-0 bg-gray-900 rounded-lg border border-gray-800 flex items-center justify-center">
                <img
                    draggable="false"
                    className="h-full w-full object-contain"
                    src={shouldRenderImage ? images[0].url : ""}
                    alt={name}
                />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-5 w-full p-1">
                {/* Product title */}
                <div className="flex justify-between items-start sm:pr-5">
                    <Link
                        to={`/product/${_id}`}
                        className="flex flex-col gap-0.5"
                    >
                        <p className="group-hover:text-indigo-400 w-56 sm:w-full truncate font-semibold text-indigo-200">
                            {name?.length > 70
                                ? `${name?.substring(0, 70)}...`
                                : name}
                        </p>
                        {/* Rating badge */}
                        <span className="text-sm text-gray-400 font-medium flex gap-2 items-center">
                            <span className="text-xs px-1.5 py-0.5 bg-indigo-600 rounded-sm text-white flex items-center gap-0.5">
                                {ratings} <StarIcon sx={{ fontSize: "14px" }} />
                            </span>
                            <span>({numOfReviews?.toLocaleString()})</span>
                            {/* <span>
                                <img
                                    draggable="false"
                                    className="w-[60px] h-[20px] ml-4 object-contain"
                                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                                    alt={name}
                                />
                            </span> */}
                        </span>
                    </Link>
                    <button
                        onClick={deleteProduct}
                        className="text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-400 rounded-lg p-2 transition-all duration-200 bg-gray-900"
                        disabled={isDeleting}
                    >
                        <DeleteIcon />
                    </button>
                </div>
                {/* Price desc */}
                <div className="flex items-center gap-2 text-2xl font-medium">
                    <span className="text-white">
                        ₹{(price - discountPrice)?.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through font-normal mt-1">
                        ₹{price?.toLocaleString()}
                    </span>
                    <span className="text-sm text-green-400 mt-1">
                        {getDiscount(price, discountPrice)}%&nbsp;off
                    </span>
                </div>
            </div>
            {/* <!-- description --> */}
        </div>
    );
};

export default Product;

/* eslint-disable react/prop-types */
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import { categories } from "../../utils/constants";
import { useState, useRef, useEffect } from "react";

const SideFilter = ({
    subcategoryList,
    price,
    subcategory,
    ratings,
    setPrice,
    setSubcategory,
    setRatings,
    floating = false,
}) => {
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);

    const debounceTimeout = useRef(null);

    // Debounce priceHandler to prevent multiple API calls on slider change
    const priceHandler = (_, newPrice) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            let newVal = [
                Math.round(newPrice[0] / 1000) * 1000,
                Math.round(newPrice[1] / 1000) * 1000,
            ];
            setPrice(newVal);
        }, 100);
    };

    useEffect(() => {
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, []);

    const clearFilters = () => {
        setPrice([0, 200000]);
        setSubcategory("");
        setRatings(0);
    };

    return (
        <div
            className={`w-full max-w-xs flex flex-col px-1 ${
                floating ? "h-full" : "sm:w-1/2 md:w-1/3 lg:w-64"
            }`}
            style={{
                maxHeight: floating ? "100vh" : "100vh",
                height: floating ? "100%" : "100vh",
            }}
        >
            <div className="flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-xl shadow-xl border border-gray-800 text-gray-100 h-full">
                {/* Only show header if not floating (handled by parent in floating mode) */}
                {!floating && (
                    <div className="flex items-center justify-between gap-5 px-4 py-2 border-b border-gray-800">
                        <p className="text-lg font-semibold text-indigo-300">Filters</p>
                        <span
                            className="uppercase text-indigo-400 text-xs cursor-pointer font-medium"
                            onClick={clearFilters}
                        >
                            clear all
                        </span>
                    </div>
                )}
                <div
                    className="flex flex-col gap-2 py-3 text-sm overflow-y-auto scrollbar-hide"
                    style={{
                        flex: 1,
                        minHeight: 0,
                        maxHeight: floating ? "calc(100vh - 56px)" : "calc(100vh - 56px)",
                    }}
                >
                    {/* Price slider filter */}
                    <div className="flex flex-col gap-2 border-b border-gray-800 px-4">
                        <span className="font-medium text-xs text-indigo-200">PRICE</span>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            getAriaLabel={() => "Price range slider"}
                            min={0}
                            max={200000}
                            sx={{
                                color: "#6366f1",
                            }}
                        />
                        <div className="flex gap-3 items-center mb-2">
                            <span className="flex-1 min-w-[70px] border border-gray-700 px-4 py-1 rounded-sm text-indigo-300 bg-gray-900">
                                ₹{price[0].toLocaleString()}
                            </span>
                            <span className="font-medium text-gray-400">to</span>
                            <span className="flex-1 min-w-[70px] border border-gray-700 px-4 py-1 rounded-sm text-indigo-300 bg-gray-900">
                                ₹{price[1].toLocaleString()}
                            </span>
                        </div>
                    </div>
                    {/* Category filter */}
                    <div className="flex flex-col border-b border-gray-800 px-4">
                        <div
                            className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                            onClick={() => setCategoryToggle(!categoryToggle)}
                        >
                            <p className="font-medium text-xs uppercase text-indigo-200">
                                Category


                            </p>
                            {categoryToggle ? (
                                <ExpandLessIcon sx={{ fontSize: "20px", color: "#6366f1" }} />
                            ) : (
                                <ExpandMoreIcon sx={{ fontSize: "20px", color: "#6366f1" }} />
                            )}
                        </div>
                        {categoryToggle && (
                            <div className="flex flex-col pb-1">
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="category-radio-buttons-group"
                                        onChange={(e) => setSubcategory(e.target.value)}
                                        name="category-radio-buttons"
                                        value={subcategory}
                                    >   
                                        {subcategoryList.map((el, i) => (
                                            <FormControlLabel
                                                value={el._id}
                                                key={el._id}
                                                control={<Radio size="small" sx={{ color: "#6366f1" }} />}
                                                label={
                                                    <span className="text-sm text-gray-100" key={el._id}>
                                                        {el.name}
                                                    </span>
                                                }
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        )}
                    </div>
                    {/* Ratings filter */}
                    <div className="flex flex-col border-b border-gray-800 px-4 -mb-4">
                        <div
                            className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                            onClick={() => setRatingsToggle(!ratingsToggle)}
                        >
                            <p className="font-medium text-xs uppercase text-indigo-200">
                                Ratings
                            </p>
                            {ratingsToggle ? (
                                <ExpandLessIcon sx={{ fontSize: "20px", color: "#6366f1" }} />
                            ) : (
                                <ExpandMoreIcon sx={{ fontSize: "20px", color: "#6366f1" }} />
                            )}
                        </div>
                        {ratingsToggle && (
                            <div className="flex flex-col pb-1">
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="ratings-radio-buttons-group"
                                        onChange={(e) => setRatings(e.target.value)}
                                        value={ratings}
                                        name="ratings-radio-buttons"
                                    >
                                        {[4, 3, 2, 1].map((el, i) => (
                                            <FormControlLabel
                                                value={el}
                                                key={i}
                                                control={<Radio size="small" sx={{ color: "#6366f1" }} />}
                                                label={
                                                    <span className="flex items-center text-sm text-gray-100">
                                                        {el}
                                                        <StarIcon
                                                            sx={{
                                                                fontSize: "12px",
                                                                mx: 0.5,
                                                                color: "#facc15",
                                                            }}
                                                        />
                                                        &nbsp;and above
                                                    </span>
                                                }
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>
                {`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                `}
            </style>
        </div>
    );
};

export default SideFilter;

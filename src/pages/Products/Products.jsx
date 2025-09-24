/* eslint-disable react/jsx-key */
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import MinCategory from "../../components/MinCategory";
import Product from "../../components/ProductListing/Product";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./../../components/Spinner";
import axios from "axios";
import SeoData from "../../SEO/SeoData";
import SideFilter from "../../components/ProductListing/SideFilter";
import { useAuth } from "../../context/auth";

const Products = () => {
    // Use useSearchParams to get category from URL
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category") || "68d32a5528bd1c6bc2577be6";

    const { auth, isAdmin } = useAuth();
    const [loading, setLoading] = useState(true);

    const [price, setPrice] = useState([0, 200000]);
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [subcategory, setSubcategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [products, setProducts] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    // pagination----->
    const [currentPage, setCurrentPage] = useState(1);
    const [productsCount, setProductsCount] = useState(products?.length);
    const productsPerPage = 8;
    // Calculate the total number of pages
    const totalPages = Math.ceil(productsCount / productsPerPage);
    // Calculate the range of products to display on the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    //updating the products to display on current page
    const currentProducts = products.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    // Fetch subcategory id from backend when category changes
    useEffect(() => {
        const fetchSubcategory = async () => {
            if (!category) {
                setSubcategoryList([]);
                return;
            }
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/get-subcategory/${category}`
                );
                // Find the category object by name
                const catObj = res.data
                    
                // Pick the first subcategory's _id if exists
                
                if (catObj && catObj.subCategories && catObj.subCategories.length > 0) {
                    
                    setSubcategoryList(catObj.subCategories);
                    setSubcategory(catObj.subCategories[0]._id);
                } else {
                    setSubcategoryList([]);
                }
            } catch (err) {
                setSubcategoryList([]);
            }
        };
        fetchSubcategory();
    }, [category]);

    useEffect(() => {
        // toast(
        //     "The backend is starting up, please wait for a minute if the loader is visible."
        // );

        //fetching filtered products from sever
        const fetchFilteredData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/product/filtered-products`,
                    {
                        params: {
                            category, // send category as well
                            subcategory,
                            priceRange: [
                                parseInt(price[0].toFixed()),
                                parseInt(price[1].toFixed()),
                            ],
                            ratings,
                        },
                    }
                );
                // console.log(res.data);

                res.status === 404 &&
                    toast.error("No Products Found!", {
                        toastId: "productNotFound",
                    });
                const prod=[...res.data.products, ...res.data.products, ...res.data.products, ...res.data.products, ...res.data.products]// remove duplicate
                res.status === 201 && setProducts(prod);
                setLoading(false);
                setProductsCount(res.data.products.length);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);

                //server error
                error.response?.status === 500 &&
                    toast.error(
                        "Something went wrong! Please try after sometime.",
                        {
                            toastId: "error",
                        }
                    );
            }
        };
        // Only fetch if subcategory is set (prevents empty fetch)
        if (subcategory) fetchFilteredData();
    }, [price, subcategory, ratings, category]);

    useEffect(() => {
        // getting user wishlist items from server
        const fetchWishlistItems = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                setWishlistItems(res.data.wishlistItems);
            } catch (error) {
                console.error(
                    "Error fetching data from wishlist product page:",
                    error
                );
                //server error
                error.response?.status === 500 &&
                    toast.error("Error in Fetching Wishlist Items!", {
                        toastId: "error",
                    });
            }
        };
        auth?.token && !isAdmin && fetchWishlistItems();
    }, [auth?.token, isAdmin]);

    // Floating filter logic
    const [showFilter, setShowFilter] = useState(false);

    return (
        <>
            <SeoData title="All Products | SSG" />
            <MinCategory />
            <main className="w-full pt-2 pb-5 sm:mt-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 min-h-screen">
                <div className="flex flex-col gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto">
                    {/* Filter Button at Top */}
                    <div className="w-full flex justify-end mb-3 lg:hidden">
                        <button
                            className="bg-indigo-600 text-white rounded-lg shadow-lg px-5 py-2 flex items-center gap-2 hover:bg-indigo-700 transition-all"
                            onClick={() => setShowFilter(true)}
                            aria-label="Toggle Filters"
                        >
                            <svg
                                width="22"
                                height="22"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10 18h4v-2h-4v2zm-7-8v2h18v-2H3zm3-6v2h12V4H6z" />
                            </svg>
                            Filters
                        </button>
                    </div>
                    <div className="flex gap-3">
                        {/* Sidebar filter for large screens only */}
                        <div className="hidden lg:flex">
                            <SideFilter
                            subcategoryList={subcategoryList}
                                price={price}
                                subcategory={subcategory}
                                ratings={ratings}
                                setPrice={setPrice}
                                setSubcategory={setSubcategory}
                                setRatings={setRatings}
                            />
                        </div>
                        {/* Floating sidebar for small/medium screens */}
                        {showFilter && (
                            <>
                                {/* Overlay */}
                                <div
                                    className="fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300"
                                    onClick={() => setShowFilter(false)}
                                />
                                {/* Slide-in sidebar */}
                                <div className="fixed top-0 right-0 z-50 h-full w-11/12 max-w-xs sm:max-w-sm bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 shadow-2xl border-l border-gray-800 transition-transform duration-300 ease-in-out translate-x-0 flex flex-col"
                                    style={{ minWidth: "260px" }}
                                >
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                                        <span className="text-lg font-semibold text-indigo-300">Filters</span>
                                        <button
                                            className="text-indigo-400 hover:text-indigo-200 text-3xl"
                                            onClick={() => setShowFilter(false)}
                                            aria-label="Close Filters"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <div className="flex-1 overflow-y-auto">
                                        <SideFilter
                                        subcategoryList={subcategoryList}
                                            price={price}
                                            subcategory={subcategory}
                                            ratings={ratings}
                                            setPrice={setPrice}
                                            setSubcategory={setSubcategory}
                                            setRatings={setRatings}
                                            floating={true}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        {/* Products grid */}
                        <div className="flex-1 relative">
                            {/* No products found */}
                            {!loading && products?.length === 0 && (
                                <div className="flex flex-col items-center justify-start gap-3 bg-gray-900 shadow-sm rounded-xl p-6 sm:p-16 sm:min-h-[750px] md:min-h-[850px] border border-gray-800">
                                    <img
                                        draggable="true"
                                        className="w-1/2 h-44 object-contain"
                                        src="/no-product-found.png"
                                        alt="Search Not Found"
                                    />
                                    <h1 className="text-2xl font-medium text-gray-100">
                                        Sorry, no results found!
                                    </h1>
                                    <p className="text-lg text-center text-indigo-300 max-w-md">
                                        Please try searching for
                                        something else.
                                    </p>
                                </div>
                            )}

                            {loading ? (
                                <Spinner />
                            ) : (
                                products?.length !== 0 && (
                                    <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-transparent">
                                        {/* Responsive grid: 2 cards on xs, 3 on sm, 4 on md+ */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 w-full place-content-start overflow-hidden pb-4 min-h-[750px]">
                                            {currentProducts?.map((product) => (
                                                <Product
                                                    key={product._id}
                                                    {...product}
                                                    wishlistItems={wishlistItems}
                                                    setWishlistItems={setWishlistItems}
                                                />
                                            ))}
                                        </div>
                                        {productsCount > productsPerPage && (
                                            <Pagination
                                                count={totalPages}
                                                page={currentPage}
                                                onChange={handlePageChange}
                                                color="primary"
                                                sx={{
                                                    "& .MuiPaginationItem-root": {
                                                        color: "#6366f1",
                                                    },
                                                }}
                                            />
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Products;

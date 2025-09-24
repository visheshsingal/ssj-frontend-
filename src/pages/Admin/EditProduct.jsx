//make it horizontal scorllbale if overflow the area which contain form
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import Spinner from "../../components/Spinner";
import axios from "axios";
import FormData from "form-data";
import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "./../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../SEO/SeoData";

const EditProduct = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [loading, setLoading] = useState(true);

    // Add these state hooks:
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [stock, setStock] = useState("");
    const [warranty, setWarranty] = useState("");
    const [brand, setBrand] = useState("");
    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState("");
    const [specs, setSpecs] = useState([]);
    const [specsInput, setSpecsInput] = useState({ title: "", description: "" });
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [oldLogo, setOldLogo] = useState(null);

    // Category & Subcategory state
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [subcategoryList, setSubcategoryList] = useState([]);

    //for submit state
    const [isSubmit, setIsSubmit] = useState(false);

    // max image size 500kb
    const MAX_IMAGE_SIZE = 500 * 1024;
    const MAX_IMAGES_COUNT = 4; // Maximum number of allowed images

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    };

    const addSpecs = () => {
        if (!specsInput.title.trim() && !specsInput.description.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: "", description: "" });
    };

    const addHighlight = () => {
        if (!highlightInput?.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput("");
    };

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index));
    };

    const deleteSpec = (index) => {
        setSpecs(specs.filter((s, i) => i !== index));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (file.size > MAX_IMAGE_SIZE) {
            toast.warning("Logo image size exceeds 500 KB!");
            return;
        }

        if (oldLogo)
            setRemovedImages((prev) => {
                return [...prev, oldLogo.public_id];
            });
        setOldLogo(null);
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
                setLogo(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        // if more than 4 images then show warning
        if (files.length > MAX_IMAGES_COUNT) {
            toast.warning("You can only upload up to 4 images");
            return;
        }

        files.forEach((file) => {
            // check for image size
            if (file.size > MAX_IMAGE_SIZE) {
                toast.warning("One of the product images exceeds 500 KB");
                // Skip the file if it exceeds the size limit
                return;
            }
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const newProductUpdateHandler = async (e) => {
        e.preventDefault();

        setIsSubmit(true);

        const validationErrors = [];

        if (specs.length <= 1) {
            validationErrors.push("Please Add Minimum 2 Specifications");
        }

        if (oldImages.length <= 0 && images.length <= 0) {
            validationErrors.push("Please Add Atleast 1 Product Image");
        }

        if (!category) {
            validationErrors.push("Please select a category");
        }
        if (!subcategory) {
            validationErrors.push("Please select a subcategory");
        }

        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => toast.warning(error));
            setIsSubmit(false); // Disable submission due to validation errors
            return;
        }
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("discountPrice", discountPrice);
            formData.append("category", category);
            formData.append("subcategory", subcategory);
            formData.append("stock", stock);
            formData.append("warranty", warranty);
            formData.append("brandName", brand);
            formData.append("logo", logo);
            formData.append("oldLogo", JSON.stringify(oldLogo));

            images.forEach((image) => {
                formData.append("images", image);
            });

            highlights.forEach((h) => {
                formData.append("highlights", h);
            });

            specs.forEach((s) => {
                formData.append("specifications", JSON.stringify(s));
            });

            formData.append("oldImages", JSON.stringify(oldImages));
            // oldImages.forEach((image) => {
            // });

            removedImages.forEach((image) => {
                formData.append("removedImages", image);
            });

            // send a put request to replace data on server
            const response = await axios.patch(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/product/update/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: auth?.token,
                    },
                }
            );
            // console.log(response);
            // on success->
            response.status === 201 &&
                toast.success("Product Updated Successfully!");
            navigate("/admin/dashboard/all-products");
        } catch (error) {
            console.error("Error:", error);
            setIsSubmit(false);
            //server error
            error.response.status === 500 &&
                toast.error("Something went wrong! Please try after sometime.");
        }
    };

    useEffect(() => {
        // Request for prefilled values from the server
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/${productId}`
                );
                setName(res.data.product.name);
                setDescription(res.data.product.description);
                setPrice(res.data.product.price);
                setDiscountPrice(res.data.product.discountPrice);
                setCategory(res.data.product.category?._id || "");
                setSubcategory(res.data.product.subcategory?._id || "");
                setStock(res.data.product.stock);
                setWarranty(res.data.product.warranty);
                setBrand(res.data.product.brand.name);
                setHighlights(res.data.product.highlights || []);
                setSpecs(res.data.product.specifications || []);
                setOldLogo(() => {
                    return {
                        url: res.data.product.brand.logo.url,
                        public_id: res.data.product.brand.logo.public_id,
                    };
                });
                {
                    res.data.product.images.map((image) => {
                        setOldImages((prevImages) => [
                            ...prevImages,
                            { url: image.url, public_id: image.public_id },
                        ]);
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);

                // Server error
                error.response?.status === 500 &&
                    toast.error(
                        "Something went wrong! Please try again later."
                    );
            }
        };
        // Initial call to fetch data from the server
        fetchData();
    }, [productId]);

    // Fetch categories and subcategories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/get-category`
                );
                setCategoryList(res.data.categories || []);
            } catch (err) {
                setCategoryList([]);
            }
        };
        fetchCategories();
    }, []);

    // Update subcategory list when category changes (use _id)
    useEffect(() => {
        const selected = categoryList.find((cat) => cat._id === category);
        setSubcategoryList(selected?.subcategories || []);
        setSubcategory(""); // Reset subcategory when category changes
    }, [category, categoryList]);

    // When fetching product, set category and subcategory to _id
    useEffect(() => {
        // Request for prefilled values from the server
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/${productId}`
                );
                setName(res.data.product.name);
                setDescription(res.data.product.description);
                setPrice(res.data.product.price);
                setDiscountPrice(res.data.product.discountPrice);
                setCategory(res.data.product.category?._id || "");
                setSubcategory(res.data.product.subcategory?._id || "");
                setStock(res.data.product.stock);
                setWarranty(res.data.product.warranty);
                setBrand(res.data.product.brand.name);
                setHighlights(res.data.product.highlights || []);
                setSpecs(res.data.product.specifications || []);
                setOldLogo(() => {
                    return {
                        url: res.data.product.brand.logo.url,
                        public_id: res.data.product.brand.logo.public_id,
                    };
                });
                {
                    res.data.product.images.map((image) => {
                        setOldImages((prevImages) => [
                            ...prevImages,
                            { url: image.url, public_id: image.public_id },
                        ]);
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                error.response?.status === 500 &&
                    toast.error("Something went wrong! Please try again later.");
            }
        };
        fetchData();
    }, [productId]);

    const menuProps = {
        PaperProps: {
            sx: {
                bgcolor: "#23272f",
                color: "#e0e7ef",
                "& .MuiMenuItem-root": {
                    "&.Mui-selected": {
                        bgcolor: "#6366f1",
                        color: "#fff",
                    },
                    "&:hover": {
                        bgcolor: "#3730a3",
                        color: "#fff",
                    },
                },
            },
        },
    };

    return (
        <>
            <SeoData title="New/Update Product | Flipkart" />
            <ScrollToTopOnRouteChange />

            {isSubmit || loading ? (
                <div className="relative h-full">
                    <Spinner />
                </div>
            ) : (
                <form
                    onSubmit={newProductUpdateHandler}
                    encType="multipart/form-data"
                    className="flex flex-col sm:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-lg shadow-xl p-4 border border-gray-800 text-gray-100"
                    id="mainForm"
                >
                    <div className="flex flex-col flex-1 gap-3 m-2 ">
                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputProps={{
                                style: {
                                    color: "#e0e7ef",
                                    background: "#23272f",
                                    borderRadius: 6,
                                },
                            }}
                            InputLabelProps={{
                                style: { color: "#6366f1" },
                            }}
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={2}
                            required
                            variant="outlined"
                            size="small"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            InputProps={{
                                style: {
                                    color: "#e0e7ef",
                                    background: "#23272f",
                                    borderRadius: 6,
                                },
                            }}
                            InputLabelProps={{
                                style: { color: "#6366f1" },
                            }}
                        />
                        <div className="flex gap-2 justify-between">
                            <TextField
                                label="Price"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                    style: {
                                        color: "#e0e7ef",
                                        background: "#23272f",
                                        borderRadius: 6,
                                    },
                                }}
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                InputLabelProps={{
                                    style: { color: "#6366f1" },
                                }}
                            />
                            <TextField
                                label="Discount Price"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                    style: {
                                        color: "#e0e7ef",
                                        background: "#23272f",
                                        borderRadius: 6,
                                    },
                                }}
                                required
                                value={discountPrice}
                                onChange={(e) =>
                                    setDiscountPrice(e.target.value)
                                }
                                InputLabelProps={{
                                    style: { color: "#6366f1" },
                                }}
                            />
                        </div>
                        <div className="flex justify-between gap-4">
                            <TextField
                                label="Category"
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                SelectProps={{
                                    MenuProps: menuProps,
                                }}
                                InputProps={{
                                    style: {
                                        color: "#e0e7ef",
                                        background: "#23272f",
                                        borderRadius: 6,
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#6366f1" },
                                }}
                            >
                                {categoryList.map((cat) => (
                                    <MenuItem value={cat._id} key={cat._id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </TextField>{
                                // console.log("subcateg:",subcategory )
                            }
                            <TextField
                                label="Subcategory"
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                value={subcategory}
                                onChange={(e) => setSubcategory(e.target.value)}
                                SelectProps={{
                                    MenuProps: menuProps,
                                }}
                                InputProps={{
                                    style: {
                                        color: "#e0e7ef",
                                        background: "#23272f",
                                        borderRadius: 6,
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#6366f1" },
                                }}
                                disabled={!category}
                            >
                                {subcategoryList.map((sub) => (
                                    <MenuItem value={sub._id} key={sub._id}>
                                        {sub.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Stock"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                    style: {
                                        color: "#e0e7ef",
                                        background: "#23272f",
                                        borderRadius: 6,
                                    },
                                }}
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                InputLabelProps={{
                                    style: { color: "#6366f1" },
                                }}
                            />
                            <TextField
                                label="Warranty"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                    style: {
                                        color: "#e0e7ef",
                                        background: "#23272f",
                                        borderRadius: 6,
                                    },
                                }}
                                required
                                value={warranty}
                                onChange={(e) => setWarranty(e.target.value)}
                                InputLabelProps={{
                                    style: { color: "#6366f1" },
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center border border-gray-700 rounded bg-gray-900">
                                <input
                                    value={highlightInput}
                                    onChange={(e) =>
                                        setHighlightInput(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Highlight"
                                    className="px-2 flex-1 outline-none border-none bg-transparent text-indigo-200"
                                />
                                <span
                                    onClick={() => addHighlight()}
                                    className="py-2 px-6 bg-indigo-600 text-white rounded-r hover:shadow-lg cursor-pointer transition-all duration-200"
                                >
                                    Add
                                </span>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                {highlights?.map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between rounded items-center py-1 px-2 bg-green-900/30 border border-green-700"
                                    >
                                        <p className="text-green-300 text-sm font-medium">
                                            {h}
                                        </p>
                                        <span
                                            onClick={() => deleteHighlight(i)}
                                            className="text-red-400 hover:bg-red-900/40 p-1 rounded-full cursor-pointer transition-all duration-200"
                                        >
                                            <DeleteIcon />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className="font-medium text-indigo-300">Brand Details</h2>
                        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start">
                            <TextField
                                label="Brand"
                                type="text"
                                variant="outlined"
                                size="small"
                                required
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                InputProps={{
                                    style: {
                                        color: "#e0e7ef",
                                        background: "#23272f",
                                        borderRadius: 6,
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#6366f1" },
                                }}
                            />
                            <div className="w-24 h-10 flex items-center justify-center border border-gray-700 rounded-lg relative bg-gray-900">
                                {oldLogo ? (
                                    <img
                                        draggable="false"
                                        src={oldLogo.url}
                                        alt="Brand Logo"
                                        className="w-full h-full object-contain"
                                    />
                                ) : !logoPreview ? (
                                    <ImageIcon className="text-indigo-400" />
                                ) : (
                                    <img
                                        draggable="false"
                                        src={logoPreview}
                                        alt="Brand Logo"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                                <span className="text-red-500 absolute -top-1 -right-[90px]">
                                    *
                                    <span className=" text-[10px] text-gray-500">
                                        (max 500KB)
                                    </span>
                                </span>
                            </div>
                            <label className="rounded bg-indigo-600 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg transition-all duration-200">
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                                Choose Logo
                            </label>
                        </div>

                        <h2 className="font-medium text-indigo-300">
                            Specifications{" "}
                            <span className="text-xs text-gray-400">
                                (at least 2 required)
                            </span>
                        </h2>

                        <div className="flex justify-between gap-2 items-center">
                            <TextField
                                value={specsInput.title}
                                onChange={handleSpecsChange}
                                name="title"
                                label="Name"
                                placeholder="Model No."
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    style: {
                                        color: "#e0e7ef",
                                        background: "#23272f",
                                        borderRadius: 6,
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#6366f1" },
                                }}
                            />
                            <TextField
                                value={specsInput.description}
                                onChange={handleSpecsChange}
                                name="description"
                                label="Description"
                                placeholder="WJDK42DF5"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    style: {
                                        color: "#e0e7ef",
                                        background: "#23272f",
                                        borderRadius: 6,
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "#6366f1" },
                                }}
                            />
                            <span
                                onClick={() => addSpecs()}
                                className="py-2 px-6 bg-indigo-600 text-white rounded hover:shadow-lg cursor-pointer transition-all duration-200"
                            >
                                Add
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {specs?.map((spec, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between gap-2 sm:gap-5 items-center text-sm rounded bg-blue-900/30 border border-blue-700 py-1 px-2"
                                >
                                    <p className="text-indigo-300 font-medium">
                                        {spec.title}
                                    </p>
                                    <p className="text-gray-200">{spec.description}</p>
                                    <span
                                        onClick={() => deleteSpec(i)}
                                        className="text-red-400 hover:bg-red-900/40 bg-red-900/20 p-1 rounded-full cursor-pointer transition-all duration-200"
                                    >
                                        <DeleteIcon />
                                    </span>
                                </div>
                            ))}
                        </div>

                        <h2 className="font-medium text-indigo-300">
                            Product Images{" "}
                            <span className="ml-2 text-xs text-gray-400">
                                (1-4 images, max 500KB each)
                            </span>
                        </h2>
                        <div className="flex gap-2 overflow-x-auto h-36 border border-gray-700 rounded bg-gray-900 p-2">
                            {imagesPreview?.map((image, i) => (
                                <img
                                    draggable="false"
                                    src={image}
                                    alt="Product Image"
                                    key={i}
                                    className="w-24 h-24 object-contain"
                                />
                            ))}
                            {oldImages?.map((image, i) => (
                                <div key={i} className="relative group">
                                    <img
                                        draggable="false"
                                        src={image.url}
                                        alt="Product"
                                        className="w-24 h-24 object-contain transition-opacity duration-300 group-hover:opacity-20"
                                    />
                                    <div
                                        onClick={() => {
                                            setOldImages((prev) =>
                                                prev.filter(
                                                    (item) =>
                                                        item?.url !== image?.url
                                                )
                                            );
                                            setRemovedImages((prev) => [
                                                ...prev,
                                                image?.public_id,
                                            ]);
                                        }}
                                        className="absolute text-red-500 text-center top-0 right-0 w-full h-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <span>Remove</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <label className="rounded font-medium bg-indigo-600 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2 transition-all duration-200">
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleProductImageChange}
                                className="hidden"
                            />
                            Choose Files
                        </label>

                        <div className="flex  items-center gap-4 justify-between">
                            <input
                                form="mainForm"
                                type="submit"
                                className="bg-gradient-to-r from-orange-600 to-yellow-500 border-2 border-yellow-400 hover:from-orange-700 hover:to-yellow-600 uppercase w-full p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer transition-all duration-300"
                                value="Update"
                            />
                            <Link
                                to="/admin/dashboard/all-products"
                                className="bg-red-600 uppercase w-full p-3 text-white text-center font-medium rounded shadow hover:shadow-lg cursor-pointer"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};
export default EditProduct;

import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Rating from "@mui/material/Rating";
import Actions from "./Actions";
import SeoData from "../../SEO/SeoData";

const AllProducts = () => {
    const { auth } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/product/seller-product`,
                    {
                        headers: {
                            Authorization: auth.token,
                        },
                    }
                );
                res.status === 201 && setProducts(res.data.products);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
                error.response?.status === 500 &&
                    toast.error(
                        "Something went wrong! Please try after sometime."
                    );
            }
        };
        fetchData();
    }, [auth.token]);
    const updateDeletedProduct = (id) => {
        setProducts((prevProducts) => {
            return prevProducts.filter((product) => product._id !== id);
        });
    };

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            <img
                                draggable="false"
                                src={params.row.image}
                                alt={params.row.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 100,
            flex: 0.1,
            renderCell: (params) => {
                return <span>{params.row.category?.name}</span>;
            }
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            headerAlign: "left",
            align: "left",
            minWidth: 70,
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.stock < 10 ? (
                            <span className="font-[500] text-red-400 rounded-full bg-red-900/40 p-1 w-6 h-6 flex items-center justify-center">
                                {params.row.stock}
                            </span>
                        ) : (
                            <span className="">{params.row.stock}</span>
                        )}
                    </>
                );
            },
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            renderCell: (params) => {
                return <span>₹{params.row.price?.toLocaleString()}</span>;
            },
        },
        {
            field: "discount_price",
            headerName: "Discount Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span>₹{params.row.discount_price?.toLocaleString()}</span>
                );
            },
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 100,
            flex: 0.1,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                return (
                    <Rating
                        readOnly
                        value={params.row.rating}
                        size="small"
                        precision={0.5}
                    />
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions
                        name={params.row.name}
                        updateDeletedProduct={updateDeletedProduct}
                        id={params.row.id}
                    />
                );
            },
        },
    ];

    const rows = [];

    products?.forEach((item) => {
        rows.unshift({
            id: item._id,
            name: item.name,
            image: item.images[0]?.url,
            category: item.category,
            stock: item.stock,
            price: item.price,
            discount_price: item.discountPrice,
            rating: item.ratings,
        });
    });
    return (
        <div className="relative p-2 w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-gray-100">
            <SeoData title="All Products - Flipkart Seller" />

            {loading ? (
                <Spinner />
            ) : (
                <div className="h-full">
                    <div className="flex justify-between items-center p-2">
                        <h1 className="text-[16px] font-[600] uppercase text-indigo-300">
                            products
                        </h1>
                        <Link
                            to="/admin/dashboard/add-product"
                            className="py-2 px-4 rounded shadow font-[500] text-white bg-gradient-to-r from-indigo-600 to-indigo-400 border-2 border-indigo-400 hover:shadow-lg transition-all duration-300"
                        >
                            New Product
                        </Link>
                    </div>
                    <div className="w-full h-[90%] bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 border border-gray-800 rounded-xl shadow">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            sx={{
                                color: "#e0e7ef",
                                background: "transparent",
                                border: "none",
                                "& .MuiDataGrid-cell": {
                                    borderColor: "#23272f",
                                    background: "transparent",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    background: "#23272f",
                                    color: "#a5b4fc",
                                    fontWeight: 600,
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    background: "#23272f",
                                    color: "#a5b4fc",
                                },
                                "& .MuiTablePagination-root": {
                                    color: "#a5b4fc",
                                },
                                "& .MuiDataGrid-row": {
                                    background: "transparent",
                                },
                                "& .MuiDataGrid-selectedRowCount": {
                                    color: "#a5b4fc",
                                },
                            }}
                            pageSizeOptions={[10]}
                            disableRowSelectionOnClick
                            disableSelectIconOnClick
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProducts;

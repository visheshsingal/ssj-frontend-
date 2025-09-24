import { Helmet } from "react-helmet";

// eslint-disable-next-line react/prop-types
const SeoData = ({ title, description, keywords }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>
);

SeoData.defaultProps = {
    title: "Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!",
    description: "PointAll online shopping",
    keywords: ["shopping", "wholeseller", "ecommerce website", "online shopping"],
};

export default SeoData;

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoice = ({orderItems:order, buyer:customer, shippingInfo:shipping, createdAt}) => {
    // if (!order || !order.products || !order.products.length) return;

    const doc = new jsPDF();

    console.log("Generating invoice for order: ", order);
    console.log("Customer: ", customer);
    console.log("Shipping Info: ", shipping);

    // Header
    doc.setFontSize(18);
    doc.text("PointAll", 14, 20);

    doc.setFontSize(11);
    doc.text("Address: 123 Main Street, City, Country", 14, 27);
    doc.text(`Invoice Number: ${customer._id.slice(0,5) || "N/A"}`, 150, 20);
    doc.text(`Date: ${new Date(createdAt).toLocaleDateString()}`, 150, 27);
    // Customer info
    doc.setFontSize(12);
    doc.text("Bill To:", 14, 40);
    doc.text(`  Name: ${customer?.name || ""}`, 14, 46);
    doc.text(`  Email: ${customer?.email || ""}`, 14, 52);
    doc.text(`  Phone Nu: ${customer?.phone || ""}`, 14, 58);
    doc.text(`  Address: ${shipping?.address || ""}, ${shipping?.city || ""}`, 14, 64);

    // Products table
    const tableColumn = ["Product", "Qty", "Price", "Discount", "Total"];
    const tableRows = [];
    let totalPrice = 0;

    order.forEach((item) => {
        const itemData = [
            item.name || "",
            item.quantity || 0,
            `Rs.${item.price || 0}`,
            `Rs.${item.discountPrice || 0}`,
            `Rs.${item.quantity * (item.discountPrice || item.price || 0)}`
        ];
        totalPrice+= item.quantity * (-item.discountPrice +item.price || 0);
        tableRows.push(itemData);
    });

    autoTable(doc, { // <-- NOTE: call autoTable as a function, passing `doc` first
        head: [tableColumn],
        body: tableRows,
        startY: 70,
    });

    const finalY = doc.lastAutoTable?.finalY || 70;

    // Summary
    // doc.text(`Subtotal: ₹${order.subtotal || 0}`, 140, finalY + 10);
    // doc.text(`Tax: ₹${order.tax || 0}`, 140, finalY + 16);
    doc.text(`Total: Rs.${totalPrice || 0}`, 140, finalY + 22);
    // doc.text(`Payment Method: ${order.paymentMethod || ""}`, 14, finalY + 22);

    // Footer
    doc.text("Thank you for shopping with us!", 14, finalY + 36);

    doc.save(`Invoice_${order._id || Date.now()}.pdf`);
};

export default generateInvoice;

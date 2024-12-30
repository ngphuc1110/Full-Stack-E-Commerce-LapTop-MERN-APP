// const orderEmailTemplate = ({ name, phone, address, product }) => {
//     console.log("product", product)
//     return `
//     <p>Dear ${name},</p>
//     <p>Thank you for shopping at LaptopStore</p>
//     <p>Your Order detail:</p>
//     <p>- Phone: ${phone} - Address: ${address} - Order ID: ${product._id}</p>
//     <p>- Product: </p>
//     `
// }

// module.exports = orderEmailTemplate

const orderEmailTemplate = ({ name, phone, address, product }) => {
    const productDetailsHTML = product.productDetails.map((item) => {
        return `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toLocaleString()} VND</td>
        </tr>
        `;
    }).join(""); // Tạo HTML cho từng sản phẩm và nối chuỗi

    return `
    <p>Dear ${name},</p>
    <p>Thank you for shopping at LaptopStore</p>
    <p>Your Order Detail:</p>
    <p>- Phone: ${phone} - Address: ${address} - Order ID: ${product._id}</p>
    <p>- Product:</p>
    <table border="1" cellpadding="5" cellspacing="0">
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            ${productDetailsHTML}
        </tbody>
    </table>
    <p>Total Amount: ${product.totalAmount.toLocaleString()} VND</p>
    <p>Thank you for your order!</p>
    `;
}

module.exports = orderEmailTemplate;

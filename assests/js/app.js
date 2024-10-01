let subTotal = 0;
let totalDiscount = 0;
let deliveryCharge = 300;
let itemCounter = 10001; 

function itemAdded(button, itemName, itemPrice, discount, qty) {
    if (itemName === undefined || itemPrice === undefined || discount === undefined || qty === undefined) {
        console.error('Invalid input values');
        return;
    }

    const discountForItem = itemPrice * (discount / 100) * qty;
    subTotal += itemPrice * qty;
    totalDiscount += discountForItem;

    button.innerHTML = "Item Added";
    button.style = "color: #000000; background-color: #e8e1c4; border: 0px solid #000000;";

    updateLocalStorage(subTotal, totalDiscount);
    addToCart(itemName, itemPrice, discount, qty);
}

function clearOrder() {
    // Use SweetAlert for the confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to permanently delete this order?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const tableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
            if (tableBody) {
                tableBody.innerHTML = '';
            }

            document.getElementById('SubTotal').value = "+ LKR 0.00/=";
            document.getElementById('Discount').value = " - LKR 0.00/=";
            document.getElementById('Delivery').value = "+ LKR 0.00/=";
            document.getElementById('Total').value = "LKR 0.00/=";

            localStorage.removeItem('cartItems');
            localStorage.removeItem('subTotal');
            localStorage.removeItem('discount');

            document.getElementById('CusNIC').value = '';
            document.getElementById('CusName').value = '';
            document.getElementById('CusContact').value = '';
            document.getElementById('CusAddress').value = '';

            // Show a success message after clearing the order
            Swal.fire(
                'Deleted!',
                'The order has been cleared.',
                'success'
            );
        }
    });
}




function printTable() {
    var divToPrint = document.getElementById("table-container");
    var newWin = window.open("");
    newWin.document.write('<html><head><title>Print Table</title>');
    newWin.document.write('<style>');
    newWin.document.write('body * { visibility: hidden; }');
    newWin.document.write('.table-container, .table-container * { visibility: visible; }');
    newWin.document.write('.table-container { position: absolute; top: 0; left: 0; width: 100%; }');
    newWin.document.write('table { width: 100%; border-collapse: collapse; }');
    newWin.document.write('</style>');
    newWin.document.write('</head><body>');
    newWin.document.write(divToPrint.outerHTML);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.print();
    newWin.close();
}

function addToCart(itemName, itemPrice, discount, qty) {
        const item = {
            id: Date.now(), 
            name: itemName,
            price: itemPrice,
            discount: discount,
            quantity: qty
        };

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        cartItems.push(item);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

    }

function updateLocalStorage(subTotal, totalDiscount) {
    localStorage.setItem('subTotal', subTotal);
    localStorage.setItem('discount', totalDiscount);
}




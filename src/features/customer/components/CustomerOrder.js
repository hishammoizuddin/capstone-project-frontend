const CustomerOrder = () => {
    const [customerOrders, setCustomerOrders] = useState([]);
    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         await axios.get("localhost:8181/product/customer/purchase/get/" + )
        //         setCustomerOrders(response.data);
        //     }
        //     catch (err) {
        //         console.log(err);
        //     }
        // }
        // fetchData();
    }, [])
    return (
        {
            customerOrders.map((co, index) => {
                return (
                    <div> {co.product.title} </div>
                )
            })
        }
    )
};

export default CustomerOrder;
import React, {useState, useEffect} from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import  axios from 'axios';
const TableProjectItems = () => {
    const [product, setProduct] = useState([]);
    const getData = () => {
        const urlAPI = "https://paragraf.uz/wp-json/wc/v3/products";
        axios.get(urlAPI, {
            auth: {
                username: 'ck_a84f9db0adf5f2cb773a4f935a193b7bf2c86d84',
                password: 'cs_d3021e56e149c76f1f6590443bfbb93be132bbb4'
            }
        })
            .then((response) => {
                setProduct(response.data)
                console.log(response.data);
            })
    }
    useEffect(() => {
        getData();
    }, []);

    const  productItems = product;
    const tableItems = productItems.map((item, index) => {
        let badgeView;
        if (!item.stock) {
            badgeView = <span className="ps-badge success">Stock</span>;
        } else {
            badgeView = <span className="ps-badge gray">Out of stock</span>;
        }
        return (
            <tr key={item.sku}>
                <td>{index + 1}</td>
                <td>
                    <a href="#">
                        <strong>{item.name}</strong>
                    </a>
                </td>
                <td>{item.sku}</td>
                <td>{badgeView}</td>
                <td>
                    <strong>{item.price}</strong>
                </td>
                <td>
                    <p className="ps-item-categories">
                        {item.categories.map((cat) => (
                            <a href="#" key={cat.name}>
                                {cat.name}
                            </a>
                        ))}
                    </p>
                </td>
                <td>{item.date_created}</td>
                <td>
                    <DropdownAction />
                </td>
            </tr>
        );
    });
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Categories</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItems}</tbody>
            </table>
        </div>
    );
};

export default TableProjectItems;

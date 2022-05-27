import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import axios from "axios";

const TableOrdersItems = () => {
    const [order, setOrder] = useState([]);
    const getOrder = () => {
        const urlAPI = "https://paragraf.uz/wp-json/wc/v3/orders";
        axios.get(urlAPI, {
            auth: {
                username: 'ck_a84f9db0adf5f2cb773a4f935a193b7bf2c86d84',
                password: 'cs_d3021e56e149c76f1f6590443bfbb93be132bbb4'
            }
        })
            .then((response) => {
                setOrder(response.data)
                console.log(response.data);
            })
    }
    useEffect(() => {
        getOrder();
    }, []);

    const orderItems = order;

    const tableItemsView = orderItems.map((item) => {
        let badgeView, fullfillmentView;
        const menuView = (
            <Menu>
                <Menu.Item key={0}>
                    <a className="dropdown-item" href="#">
                        Edit
                    </a>
                </Menu.Item>
                <Menu.Item key={0}>
                    <a className="dropdown-item" href="#">
                        <i className="icon-t"></i>
                        Delete
                    </a>
                </Menu.Item>
            </Menu>
        );
        if (item.payment_method) {
            badgeView = <span className="ps-badge success">Paid</span>;
        } else {
            badgeView = <span className="ps-badge gray">Unpaid</span>;
        }
        switch (item.fullfillment) {
            case 'In Progress':
                fullfillmentView = (
                    <span className="ps-fullfillment warning">In Progress</span>
                );
                break;
            case 'Cancel':
                fullfillmentView = (
                    <span className="ps-fullfillment danger">Cancel</span>
                );
                break;
            default:
                fullfillmentView = (
                    <span className="ps-fullfillment success">delivered</span>
                );
                break;
        }
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                    <Link href="/orders/order-detail">
                        <a>
                            <strong>{item.date_created}</strong>
                        </a>
                    </Link>
                </td>
                <td>
                    <strong>
                        {
                            item.line_items.map(item => (
                                <p>{item.name}</p>
                            ))
                        }
                    </strong>
                </td>
                <td>{badgeView}</td>
                <td>{fullfillmentView}</td>
                <td>
                    <strong>{item.total}</strong>
                </td>
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
                        <th>Date</th>
                        <th>Product</th>
                        <th>Payment</th>
                        <th>Fullfillment</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItemsView}</tbody>
            </table>
        </div>
    );
};

export default TableOrdersItems;

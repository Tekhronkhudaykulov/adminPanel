import React, {useEffect, useState} from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import axios from "axios";

const TableCustomerItems = () => {
    const [customer, setCustomer] = useState([]);
    const getCustomer = () => {
        const urlAPI = "https://paragraf.uz/wp-json/wc/v3/customers";
        axios.get(urlAPI, {
            auth: {
                username: 'ck_a84f9db0adf5f2cb773a4f935a193b7bf2c86d84',
                password: 'cs_d3021e56e149c76f1f6590443bfbb93be132bbb4'
            }
        })
            .then((response) => {
                setCustomer(response.data)
                console.log(response.data);
            })
    }
    useEffect(() => {
        getCustomer();
    }, []);

    const customerItems = customer;

    const tableItemsView = customerItems.map((item, index) => {
        let badgeView;

        if (item.status) {
            badgeView = <span className="ps-badge success">active</span>;
        } else {
            badgeView = <span className="ps-badge gray">deactive</span>;
        }

        return (
            <tr key={index}>
                <td>{index}</td>
                <td>
                    <strong>{item.first_name}</strong>
                </td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                {/*<td>{badgeView}</td>*/}
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
                        <th>Surname</th>
                        {/*<th>Phone Number</th>*/}
                        <th>Email</th>
                        {/*<th>Status</th>*/}
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItemsView}</tbody>
            </table>
        </div>
    );
};

export default TableCustomerItems;

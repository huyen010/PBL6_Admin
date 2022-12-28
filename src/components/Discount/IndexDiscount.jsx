import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import discountAPI from "../../api/Discount";
import ListDiscount from "./ListDiscount";

function IndexDiscount(props) {
    const navigate = useNavigate();
    const [discounts, setDiscounts] = useState([])
    useEffect(() => {
        const fetchDiscount = async () => {
            const listdc = await discountAPI.getALL()
            setDiscounts(listdc.discounts)
        };
        fetchDiscount()
    }, []);
    const handleDelete = async (key, value) => {
        var answer = window.confirm("Are you sure to delete product?");
        if (answer) {
            const res = await discountAPI.deleteDiscount(value);
            console.log(res)
            let discountClone = [...discounts];
            discountClone.splice(key, 1);
            setDiscounts(discountClone);
        }
        else {
            return;
        }
    }
    return (
        <div>
            <ListDiscount Discounts={discounts} onDeleteClick={handleDelete} />
        </div>
    );
}

export default IndexDiscount;
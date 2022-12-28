import React from 'react';
import PropTypes from 'prop-types';
import { CartesianGrid, Tooltip, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
OrderofMonth.propTypes = {
    ListOrder: PropTypes.array.isRequired,
    Month: PropTypes.number.isRequired,
    HandleMonthChange: PropTypes.func.isRequired,
};
OrderofMonth.defaultProps = {
    ListOrder: [{}],
    Month: 1,
    HandleMonthChange: null
}
function OrderofMonth(props) {
    const handleMonthChange = props.HandleMonthChange
    const data = props.ListOrder
    let totalOrder = 0
    let revenue = 0
    data.forEach(element => {
        totalOrder = totalOrder + element.number
        revenue = revenue + element.revenue
    });
    const month = props.Month
    return (
        <div>
            <div style={{ marginLeft: "250px", marginBottom: "10px" }}>
                <select name="month" id="" onChange={(event) => { handleMonthChange(event.target.value) }} value={month}>
                    <option value="1">Tháng 1</option>
                    <option value="2">Tháng 2</option>
                    <option value="3">Tháng 3</option>
                    <option value="4">Tháng 4</option>
                    <option value="5">Tháng 5</option>
                    <option value="6">Tháng 6</option>
                    <option value="7">Tháng 7</option>
                    <option value="8">Tháng 8</option>
                    <option value="9">Tháng 9</option>
                    <option value="10">Tháng 10</option>
                    <option value="11">Tháng 11</option>
                    <option value="12">Tháng 12</option>

                </select>
                <label style={{ marginLeft: "10px" }} htmlFor="">Tổng số đơn: {totalOrder}, Doanh thu: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(revenue)}</label>
            </div>

            <div style={{
                marginLeft: "-60px",
                width: "1000px",
                height: "350px",
                backgroundColor: "snow"
            }}>
                <ResponsiveContainer width="100%"
                    height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="number"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone"
                            dataKey="revenue"
                            stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
}

export default OrderofMonth;
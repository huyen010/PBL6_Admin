import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

OrderStatus.propTypes = {
    ListStatus: PropTypes.array.isRequired,
};
OrderStatus.defaultProps = {
    ListStatus: [{}]
}
function OrderStatus(props) {
    const data = props.ListStatus
    console.log(data)
    const COLORS = ['#0088febf', '#00C49F', '#8884d8', '#dfc884'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ marginLeft: "-90px", marginTop: "30px" }}>
            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="number"
                    nameKey="status"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
        </div>
    );
}

export default OrderStatus;
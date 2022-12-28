import React from 'react';
import PropTypes from 'prop-types';

NotAvailble.propTypes = {

};

function NotAvailble(props) {
    return (
        <div style={{ height: "700px" }}>
            <h5 style={{ marginLeft: "-30px", marginTop: "20px", color: 'red' }}>Bạn không có quyền truy cập chức năng</h5>
        </div>
    );
}

export default NotAvailble;
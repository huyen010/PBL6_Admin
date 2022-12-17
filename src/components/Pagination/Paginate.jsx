import Pagination from 'react-bootstrap/Pagination';
import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
Paginate.propTypes = {
    active: PropTypes.number.isRequired,
    firstpage: PropTypes.number.isRequired,
    lastpage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
};

function Paginate(props) {
    let active = parseInt(props.active);
    let firstpage = props.firstpage;
    let lastpage = props.lastpage;
    let count = props.count;
    let href = props.href;
    let items = [];
    let hrefNext, hrefBefore = ""
    if (lastpage < count) {
        hrefNext = href + (lastpage + 1).toString();
    }
    if (firstpage !== 1) {
        hrefBefore = href + (firstpage - 1).toString();
    }
    for (let number = firstpage; number <= lastpage; number++) {
        let hrefPage = href + number.toString();
        // let test = 'products/' + number.toString();
        // console.log(test)
        items.push(
            <Pagination.Item key={number} active={number === active} href={hrefPage}>
                {number}
            </Pagination.Item>,
        );
        hrefPage = ''
    }
    return (
        <div>
            <Pagination >
                <Pagination.First href={hrefBefore} />
                {items}
                <Pagination.Last href={hrefNext} />
            </Pagination>
        </div>
    );
}

export default Paginate;


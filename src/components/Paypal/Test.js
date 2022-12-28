import React from "react";
import PropTypes from "prop-types";
import Paypal from "./Paypal";

Test.propTypes = {};

function Test(props) {
  const money = parseFloat((300000 / 23600).toFixed(1));

  console.log(money);
  return (
    <div>
      <Paypal Money={money} />
    </div>
  );
}

export default Test;

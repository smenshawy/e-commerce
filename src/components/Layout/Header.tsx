import React, { FC } from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";

const Header: FC<{ onCartButtonClicked: () => void }> = ({
  onCartButtonClicked,
}) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Products</h1>
        <HeaderCartButton onClick={onCartButtonClicked}></HeaderCartButton>
      </header>
    </>
  );
};

export default Header;

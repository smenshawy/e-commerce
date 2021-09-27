import { FC } from "react";
import classes from "./Status.module.css";

export enum StatusType {
  Loading = "loading",
  Error = "error",
  Success = "success",
}

const Status: FC<{ type: StatusType }> = ({ type, children }) => {
  return (
    <p
      className={`${classes.status} ${
        classes[type.toString().toLocaleLowerCase()]
      }`}
    >
      {type === StatusType.Loading ? "Loading ..." : children}
    </p>
  );
};

export default Status;

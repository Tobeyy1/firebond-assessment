import { FunctionComponent } from "react";
import classes from "./LoadingSpinner.module.scss";
import LOGO from "../../../assets/logo.png";
import Image from "next/image";

interface LoadingSpinnerProps {}

const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.image__container}>
        <Image src={LOGO} alt="FireBond Logo" fill className={classes.image} />
      </div>
      <p>Retrieving Data... Please Wait</p>
    </div>
  );
};

export default LoadingSpinner;

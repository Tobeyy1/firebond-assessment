import { FunctionComponent } from "react";
import classes from "./NavBar.module.scss";
import Image from "next/image";
import LOGO from "../../../assets/logo.png";
import { FiSettings } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{
        type: "tween",
        duration: 0.5,
      }}
      className={classes.container}
    >
      <div className={classes.name__and__logo}>
        <div className={classes.image__container}>
          <Image src={LOGO} alt="Firebond Logo" fill className={classes.logo} />
        </div>
        <span>{sessionStorage.getItem("tournamentID")} Tournament</span>
      </div>
      {/* <div className={classes.current__stage}>
        <p className={classes.text}>Current Stage</p>
        <h1 className={classes.current__stage}>1st Knock-Out Stage</h1>
      </div> */}
      {/* <button className={classes.settings}>
        <FiSettings />
        <span>SETTINGS</span>
      </button> */}
    </motion.div>
  );
};

export default NavBar;

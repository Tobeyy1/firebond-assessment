"use client";

import { FunctionComponent, useRef } from "react";
import classes from "./ScoreUpdate.module.scss";
import { motion } from "framer-motion";

interface ScoreUpdateProps {
  setShowScoreUpdate: (value: boolean) => void;
  pairDetails: any;
  setPairDetails: (value: {}) => void;
  overallTournamentData: any;
  setOverallTournamentData: (value: any) => void;
}

const ScoreUpdate: FunctionComponent<ScoreUpdateProps> = ({
  setShowScoreUpdate,
  pairDetails,
  setPairDetails,
  overallTournamentData,
  setOverallTournamentData,
}) => {
  const { groupIndex, pairIndex } = pairDetails;
  const playerSelectRef = useRef<HTMLSelectElement>(null);
  //   console.log(overallTournamentData[groupIndex][pairIndex].players[0]);

  const tournamentID = sessionStorage.getItem("tournamentID");

  const playerSelectHandler = () => {
    if (!playerSelectRef.current) return;
    if (!playerSelectRef.current?.value) return;
    console.log(
      playerSelectRef.current.options[playerSelectRef.current.selectedIndex]
        .innerText
    );

    // Creates a local Version of the OverallData
    const nestedOverallData = overallTournamentData;

    if (playerSelectRef.current?.value !== "0") {
      //Makes the changes to the local version of the overall data
      nestedOverallData[groupIndex][pairIndex].matchResult =
        playerSelectRef.current?.value;

      // console.log(Math.ceil(11 / 2));

      if (nestedOverallData[groupIndex + 1][Math.floor(pairIndex / 2)] === "") {
        nestedOverallData[groupIndex + 1][Math.floor(pairIndex / 2)] = {
          matchResult: "undecided",
          players: [],
        };
      }

      console.log(nestedOverallData);

      nestedOverallData[groupIndex + 1][Math.floor(pairIndex / 2)].players.push(
        playerSelectRef.current.options[playerSelectRef.current.selectedIndex]
          .innerText
      );

      console.log(
        nestedOverallData[groupIndex + 1][Math.floor(pairIndex / 2)].players
      );

      //updates the parent overall data
      setOverallTournamentData(nestedOverallData);

      //Updates the Store
      // dispatch(overallDataActions.setOverallData(overallTournamentData));
      const update = async () => {
        try {
          const response = await fetch(
            `https://firebond-backend-default-rtdb.firebaseio.com/${tournamentID}/tournamentData.json`,
            {
              method: "PUT",
              body: JSON.stringify(nestedOverallData),
            }
          );
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
        console.log("updated");
      };
      update();

      //closes modal
      setShowScoreUpdate(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={classes.container}
    >
      {/* <AnimatePresence> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classes.backdrop}
        key={"backdrop"}
        onClick={() => {
          setShowScoreUpdate(false);
        }}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className={classes.modal}
        key={"modal"}
      >
        <header className={classes.header}>Score Update</header>
        <div className={classes.ui}>
          <label htmlFor="Match Winner" className={classes.label}>
            <p className={classes.description}>Who won the match?</p>
            <select
              name="Match Winner"
              className={classes.select}
              ref={playerSelectRef}
            >
              <option value="0">Select Player</option>
              <option value="player1">
                {overallTournamentData[groupIndex][pairIndex].players[0]}
              </option>
              <option value="player2">
                {overallTournamentData[groupIndex][pairIndex].players[1]}
              </option>
            </select>
          </label>
          <div className={classes.cta__container}>
            <button
              className={classes.cancel__cta}
              onClick={() => {
                setShowScoreUpdate(false);
              }}
            >
              Cancel
            </button>
            <button
              className={`${classes.confirm__cta} `}
              onClick={playerSelectHandler}
              disabled={playerSelectRef.current?.value === "0" ? true : false}
            >
              Confirm
            </button>
          </div>
        </div>
      </motion.div>
      {/* </AnimatePresence> */}
    </motion.div>
  );
};

export default ScoreUpdate;

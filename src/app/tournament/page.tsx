"use client";

import React, { useState, FunctionComponent, useEffect } from "react";
import classes from "./Tournament.module.scss";
import Bracket from "../components/Bracket/Bracket";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar/NavBar";
import ScoreUpdate from "./ScoreUpdate/ScoreUpdate";
import { convertToOrdinal } from "../utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { playersDataActions } from "@/store/store";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

interface TournamentProps {}

const Tournament: FunctionComponent<TournamentProps> = () => {
  const [showScoreUpdate, setShowScoreUpdate] = useState<boolean>(false);
  const [pairDetails, setPairDetails] = useState<object>({});
  const [overallTournamentData, setOverallTournamentData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const playersFlatData = useSelector(
    (state: any) => state.playersData.playersData
  );

  const dispatch = useDispatch();

  //Variables for Animation
  const variants = {
    initial: {
      backgroundColor: "transparent",
    },
    animate: {
      backgroundColor: "transparent",
      transition: { staggerChildren: 0.2, type: "tween", delay: 0.5 },
    },
  };

  const item = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { opacity: 0.5 },
  };

  useEffect(() => {
    //Handles the initial retrieval of data from the backend
    const tournamentID = sessionStorage.getItem("tournamentID");
    console.log(tournamentID);
    setIsLoading(true);

    // const testData = [
    //   [
    //     {
    //       matchResult: "player1",
    //       players: ["Johm", "Doe"],
    //     },
    //     {
    //       matchResult: "player2",
    //       players: ["Adam", "Smith"],
    //     },
    //   ],
    //   [
    //     {
    //       matchResult: "player1",
    //       players: ["Smith", "Adam"],
    //     },
    //   ],
    //   [
    //     {
    //       matchResult: "undecided",
    //       players: ["Adam"],
    //     },
    //   ],
    // ];

    const getData = async () => {
      try {
        setIsLoading(true);
        console.log("Retrieving Data");
        const response = await fetch(
          `https://firebond-backend-default-rtdb.firebaseio.com/${tournamentID}.json`
        );
        const data = await response.json();

        if (data.playersNames) {
          dispatch(playersDataActions.setPlayersData(data.playersNames));
        }
        if (data.tournamentData) {
          setOverallTournamentData(data.tournamentData);
        }

        console.log(data);
        // console.log(data.tournamentData);
        setIsLoading(false);
      } catch (error) {
        console.log("ERROR: ", error);
        setIsLoading(false);
      }
      console.log("Data Retrieved");
    };

    console.log("Players Data: ", playersFlatData);
    console.log("Players Overall Data: ", overallTournamentData);
    if (playersFlatData.length === 0) {
      getData();
    }

    if (playersFlatData.length > 0) {
      setIsLoading(false);
    }
  }, [dispatch, playersFlatData, overallTournamentData]);

  // useEffect(() => {
  //   const createNewArray = (array: string[]) => {
  //     return array
  //       .map((value: string, index: number) => {
  //         if (index % 2 === 0 && index < array.length - 1) {
  //           return {
  //             matchResult: "undecided",
  //             players: [value, array[index + 1]],
  //           };
  //         }
  //         return null;
  //       })
  //       .filter(Boolean);
  //   };

  //   setPlayersData(createNewArray(playersFlatData));
  //   // setPlayersFlatData(playersData);
  // }, []);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <NavBar />
          <AnimatePresence>
            {showScoreUpdate && (
              <ScoreUpdate
                setShowScoreUpdate={setShowScoreUpdate}
                pairDetails={pairDetails}
                setPairDetails={setPairDetails}
                overallTournamentData={overallTournamentData}
                setOverallTournamentData={setOverallTournamentData}
              />
            )}
          </AnimatePresence>
          <section>
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
              }}
              className={classes.bracket__container}
            >
              <Bracket
                overallTournamentData={overallTournamentData}
                setOverallTournamentData={setOverallTournamentData}
                playersData={playersFlatData}
              />
            </motion.section>
            <section className={classes.match__data}>
              {overallTournamentData.map((_: any, index: number) => {
                if (index + 1 < overallTournamentData.length) {
                  return (
                    <div
                      className={classes.match__stage}
                      key={`match stage ${index}`}
                    >
                      <p>
                        {index < overallTournamentData.length - 3 &&
                          `${convertToOrdinal(index + 1)} Knock-out Stage`}
                        {index === overallTournamentData.length - 3 &&
                          `Semi Finals`}
                        {index === overallTournamentData.length - 2 && `Finals`}
                        {index === overallTournamentData.length - 1 && `Winner`}
                      </p>
                      <motion.ul
                        variants={variants}
                        initial="initial"
                        animate="animate"
                      >
                        {overallTournamentData[index].map(
                          (pair: any, nestedIndex: number) => {
                            return (
                              <motion.li
                                variants={item}
                                className={`${classes.match} ${
                                  pair === undefined ? classes.disabled : ""
                                }`}
                                key={nestedIndex}
                                onClick={() => {
                                  if (pair !== undefined) {
                                    setShowScoreUpdate(true);
                                    setPairDetails({
                                      groupIndex: index,
                                      pairIndex: nestedIndex,
                                    });
                                    // console.log("Tournament: ", {
                                    //   groupIndex: index,
                                    //   pairIndex: nestedIndex,
                                    // });
                                  }
                                }}
                              >
                                <span className={classes.player1}>
                                  {pair ? pair?.players[0] : ""}
                                </span>
                                <div>
                                  <span>
                                    {pair?.matchResult ? (
                                      pair?.matchResult !== "undecided" ? (
                                        pair?.matchResult === "player1" ? (
                                          <span className={classes.won}>
                                            WON
                                          </span>
                                        ) : (
                                          <span className={classes.lost}>
                                            LOST
                                          </span>
                                        )
                                      ) : (
                                        "---"
                                      )
                                    ) : (
                                      "---"
                                    )}
                                  </span>{" "}
                                  :{" "}
                                  <span>
                                    {pair?.matchResult ? (
                                      pair?.matchResult !== "undecided" ? (
                                        pair?.matchResult === "player2" ? (
                                          <span className={classes.won}>
                                            WON
                                          </span>
                                        ) : (
                                          <span className={classes.lost}>
                                            LOST
                                          </span>
                                        )
                                      ) : (
                                        "---"
                                      )
                                    ) : (
                                      "---"
                                    )}
                                  </span>
                                </div>
                                <span className={classes.player2}>
                                  {pair ? pair?.players[1] : ""}
                                </span>
                              </motion.li>
                            );
                          }
                        )}
                      </motion.ul>
                    </div>
                  );
                }

                if (index + 1 === overallTournamentData.length) {
                  return (
                    <div
                      className={classes.match__stage}
                      key={`match stage ${index}`}
                    >
                      <p>
                        {index < overallTournamentData.length - 3 &&
                          `${convertToOrdinal(index + 1)} Knock-out Stage`}
                        {index === overallTournamentData.length - 3 &&
                          `Semi Finals`}
                        {index === overallTournamentData.length - 2 && `Finals`}
                        {index === overallTournamentData.length - 1 && `Winner`}
                      </p>
                      <motion.ul
                        variants={variants}
                        initial="initial"
                        animate="animate"
                      >
                        {overallTournamentData[index].map(
                          (pair: any, nestedIndex: number) => {
                            return (
                              <motion.li
                                variants={item}
                                className={`${classes.match} ${
                                  pair === undefined ? classes.disabled : ""
                                }`}
                                key={nestedIndex}
                                onClick={() => {
                                  if (pair !== undefined) {
                                    setShowScoreUpdate(true);
                                    setPairDetails({
                                      groupIndex: index,
                                      pairIndex: nestedIndex,
                                    });
                                    // console.log("Tournament: ", {
                                    //   groupIndex: index,
                                    //   pairIndex: nestedIndex,
                                    // });
                                  }
                                }}
                              >
                                <FaCrown />
                                <span className={classes.player1}>
                                  {pair ? pair?.players[0] : ""}
                                </span>
                                <FaCrown />
                              </motion.li>
                            );
                          }
                        )}
                      </motion.ul>
                    </div>
                  );
                }
              })}
            </section>
          </section>
        </>
      )}
    </div>
  );
};

export default Tournament;

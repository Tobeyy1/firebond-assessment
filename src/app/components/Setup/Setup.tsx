"use client";

import { FunctionComponent, useState, useRef } from "react";
import classes from "./Setup.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { playersDataActions, tournamentDataActions } from "@/store/store";
import { useRouter } from "next/navigation";

interface SetupProps {}

const Setup: FunctionComponent<SetupProps> = () => {
  const [showPlayerNameInput, setShowPlayerNameInput] =
    useState<boolean>(false);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(0);

  const tournamentSetupMode = useSelector(
    (state: any) => state.tournamentData.tournamentData.tournamentSetupMode
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const tournamentNameRef = useRef<HTMLInputElement>(null);

  const variants = {
    initial: {
      backgroundColor: "transparent",
    },
    animate: {
      backgroundColor: "transparent",
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { opacity: 0.5 },
  };

  return (
    <div className={classes.container}>
      <AnimatePresence mode="wait">
        {!showPlayerNameInput && (
          <motion.form
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            // transition={{ durat ion: 0.5 }}
            key={"number__of__players__modal"}
            className={classes.modal}
          >
            <header>
              <h1>Tournament Setup</h1>
            </header>
            <div>
              <label htmlFor="Tounament Name" className={classes.label}>
                <p>Whats the name of your Tournament?</p>
                <input
                  type="Tournament Name"
                  className={classes.input}
                  ref={tournamentNameRef}
                />
              </label>

              {tournamentSetupMode === "new" && (
                <fieldset>
                  <legend>How many players will be in this tournament?</legend>
                  <div>
                    <label
                      onClick={() => setNumberOfPlayers(2)}
                      htmlFor="two__players"
                    >
                      <span>2</span>
                      <input
                        type="radio"
                        id="two__players"
                        name="playerNumber"
                        // value="email"
                        className={classes.input}
                      />
                    </label>

                    <label
                      onClick={() => setNumberOfPlayers(4)}
                      htmlFor="four__players"
                    >
                      <span>4</span>
                      <input
                        type="radio"
                        id="four__players"
                        name="playerNumber"
                        // value="phone"
                        className={classes.input}
                      />
                    </label>

                    <label
                      onClick={() => setNumberOfPlayers(8)}
                      htmlFor="eight__players"
                    >
                      <span>8</span>
                      <input
                        type="radio"
                        id="eight__players"
                        name="playerNumber"
                        // value="mail"
                        className={classes.input}
                      />
                    </label>

                    <label
                      onClick={() => setNumberOfPlayers(16)}
                      htmlFor="sixteen__players"
                    >
                      <span>16</span>
                      <input
                        type="radio"
                        id="sixteen__players"
                        name="playerNumber"
                        // value="mail"
                        className={classes.input}
                      />
                    </label>

                    <label
                      onClick={() => setNumberOfPlayers(32)}
                      htmlFor="thirtytwo__players"
                    >
                      <span>32</span>
                      <input
                        type="radio"
                        id="thirtytwo__players"
                        name="playerNumber"
                        // value="mail"
                        className={classes.input}
                      />
                    </label>

                    <label
                      onClick={() => setNumberOfPlayers(64)}
                      htmlFor="sixtyfour__players"
                    >
                      <span>64</span>
                      <input
                        type="radio"
                        id="sixtyfour__players"
                        name="playerNumber"
                        // value="mail"
                        className={classes.input}
                      />
                    </label>
                  </div>
                </fieldset>
              )}
            </div>
            <button
              type="submit"
              className={`${classes.cta} ${
                tournamentSetupMode === "new" &&
                tournamentNameRef.current &&
                tournamentNameRef.current?.value.length === 0 &&
                numberOfPlayers === 0 &&
                classes.disabled__cta
              }
               ${
                 tournamentSetupMode === "existing" &&
                 tournamentNameRef.current &&
                 tournamentNameRef.current?.value.length === 0 &&
                 classes.disabled__cta
               }
              `}
              onClick={(e) => {
                e.preventDefault();

                console.log(tournamentSetupMode === "existing");

                if (tournamentSetupMode === "new") {
                  if (
                    tournamentNameRef.current &&
                    tournamentNameRef.current?.value.length > 0 &&
                    numberOfPlayers !== 0
                  ) {
                    sessionStorage.setItem(
                      "tournamentID",
                      tournamentNameRef.current.value
                    );
                    dispatch(
                      tournamentDataActions.setTournamentDataName(
                        tournamentNameRef.current.value
                      )
                    );
                    dispatch(
                      tournamentDataActions.setTournamentNumberOfPlayers(
                        numberOfPlayers
                      )
                    );
                    setShowPlayerNameInput(true);
                  }
                } else if (
                  tournamentSetupMode === "existing" &&
                  tournamentNameRef.current &&
                  tournamentNameRef.current?.value.length > 0
                ) {
                  sessionStorage.setItem(
                    "tournamentID",
                    tournamentNameRef.current.value
                  );
                  router.push("/tournament");
                }
              }}
            >
              Continue
            </button>
          </motion.form>
        )}

        {showPlayerNameInput && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            key={"players__info__modal"}
            // transition={{ duration: 0.5 }}
            className={classes.players__info__modal}
          >
            <header>
              <h1>Player Info</h1>
              <p>Input each players name in the respective text fields.</p>
            </header>
            <motion.ul
              variants={variants}
              initial="initial"
              animate="animate"
              className={classes.players}
            >
              {Array(numberOfPlayers)
                .fill("player")
                .map((_, index: number) => {
                  return (
                    <motion.li
                      variants={item}
                      key={index}
                      className={classes.player}
                    >
                      <label
                        htmlFor={`Player ${index + 1}`}
                        className={classes.label}
                      >
                        <p>Player {index + 1}</p>
                        <input
                          type="text"
                          className={classes.input}
                          onChange={(e) => {
                            playerNames[index] = e.target.value;
                            // console.log(playerNames);
                          }}
                        />
                      </label>
                    </motion.li>
                  );
                })}
            </motion.ul>
            <div className={classes.cta__container}>
              <button
                className={classes.back__cta}
                onClick={() => {
                  setNumberOfPlayers(0);
                }}
              >
                Go Back
              </button>
              <Link
                href={`${
                  playerNames.length === numberOfPlayers ? "/tournament" : ""
                }`}
                className={`${classes.continue__cta} ${
                  playerNames.length < numberOfPlayers && classes.disabled__cta
                }`}
                onClick={() => {
                  if (playerNames.length < numberOfPlayers) return;
                  dispatch(playersDataActions.setPlayersData(playerNames));
                  const update = async () => {
                    try {
                      const response = await fetch(
                        `https://firebond-backend-default-rtdb.firebaseio.com/${sessionStorage.getItem(
                          "tournamentID"
                        )}/playersNames.json`,
                        {
                          method: "PUT",
                          body: JSON.stringify(playerNames),
                        }
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  };
                  update();
                }}
              >
                Continue
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Setup;

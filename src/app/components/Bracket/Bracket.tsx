import { FunctionComponent, useEffect, useState } from "react";
import classes from "./Bracket.module.scss";
import { BsFillPersonFill } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";

interface BracketProps {
  playersData: string[];
  overallTournamentData: any;
  setOverallTournamentData: (value: any) => void;
}

interface PlayerGroup {
  matchResult: string;
  players: [string, string];
}

const Bracket: FunctionComponent<BracketProps> = ({
  playersData,
  overallTournamentData,
  setOverallTournamentData,
}) => {
  // State for the number of rounds and grouped player data
  const [numberOfRounds, setNumberOfRounds] = useState<number>(0);
  const [overallData, setOverallData] = useState<any>([]);
  const [playersGroupedData, setPlayersGroupedData] = useState<PlayerGroup[]>(
    []
  );

  useEffect(() => {
    //This recereates the tournament bracket data and updates the parent component
    const allData = [];
    for (let index = 0; index < numberOfRounds; index++) {
      if (index === 0) {
        allData.push(playersGroupedData);
      }
      if (index > 0) {
        // allData.push(Array.from({ length: allData[index - 1].length / 2 }, ));
        allData.push(Array(allData[index - 1].length / 2).fill(""));
      }
    }
    if (overallTournamentData.length > 0) {
      allData.push(Array(1).fill(""));
    }
    console.log("Bracket AllData 1: ", allData);
    if (overallTournamentData.length === 0) {
      console.log("Bracket Editing Parent Data");
      console.log("Bracket AllData 2: ", allData);
      setOverallTournamentData(allData);
    }
  }, [numberOfRounds, playersGroupedData, setOverallTournamentData]);

  useEffect(() => {
    //Ensures that changes made to the parent component data are reflected in the bracket
    setOverallData(overallTournamentData);
    console.log("RENDERING BRACKET");
  }, [overallTournamentData, setOverallData]);

  useEffect(() => {
    //Calculates the number of rounds, generates the data and matches for the first round
    const createNewArray = (array: string[]) => {
      return array
        .map((value: string, index: number) => {
          if (index % 2 === 0 && index < array.length - 1) {
            return {
              matchResult: "undecided",
              players: [value, array[index + 1]],
            };
          }
          return null;
        })
        .filter(Boolean);
    };

    const newArray = createNewArray(playersData);

    //Array containing the matches for the first round
    setPlayersGroupedData(newArray as PlayerGroup[]);

    const rounds = Math.log2(playersData.length);
    console.log(typeof rounds);

    //Number of tournament rounds
    setNumberOfRounds(rounds || 0);
  }, [playersData]);

  // If there are no players, display a message
  if (numberOfRounds === 0)
    return <div className={classes.container}>No Players</div>;

  return (
    <div className={classes.container}>
      {/* Create holders for the different group stages */}
      {overallData.map((_: any, index: number) => {
        if (index + 1 < overallData.length) {
          return (
            <ul key={index}>
              {/* Iterate over player groups and create the bracket */}
              {overallData[index].map(
                (pair: PlayerGroup, nestedIndex: number) => {
                  return (
                    <li key={nestedIndex}>
                      <div className={classes.left__bar}></div>

                      <div className={classes.player1}>
                        <span>
                          <BsFillPersonFill /> {pair ? pair?.players[0] : "---"}
                        </span>{" "}
                        <span>
                          {pair?.matchResult ? (
                            pair?.matchResult !== "undecided" ? (
                              pair?.matchResult === "player1" ? (
                                <span className={classes.won}>WON</span>
                              ) : (
                                <span className={classes.lost}>LOST</span>
                              )
                            ) : (
                              "---"
                            )
                          ) : (
                            "---"
                          )}
                        </span>
                      </div>
                      <div className={classes.player2}>
                        <span>
                          <BsFillPersonFill /> {pair ? pair?.players[1] : "---"}
                        </span>{" "}
                        <span>
                          {pair?.matchResult ? (
                            pair?.matchResult !== "undecided" ? (
                              pair?.matchResult === "player2" ? (
                                <span className={classes.won}>WON</span>
                              ) : (
                                <span className={classes.lost}>LOST</span>
                              )
                            ) : (
                              "---"
                            )
                          ) : (
                            "---"
                          )}
                        </span>
                      </div>
                      <div className={classes.right__bar}></div>
                    </li>
                  );
                }
              )}
            </ul>
          );
        } else if (index + 1 === overallData.length) {
          return (
            <ul key={index}>
              {/* Create bracket for winner */}
              {overallData[index].map(
                (player: PlayerGroup, nestedIndex: number) => {
                  return (
                    <li key={nestedIndex} className={classes.winner__container}>
                      <div className={classes.left__bar}></div>

                      <div className={classes.winner}>
                        <span>
                          <BsFillPersonFill />{" "}
                          {player ? player?.players[0] : "---"}
                        </span>{" "}
                        <span>
                          <FaCrown />
                        </span>
                      </div>
                      <div className={classes.right__bar}></div>
                    </li>
                  );
                }
              )}
            </ul>
          );
        }
      })}
    </div>
  );
};

export default Bracket;

import { FunctionComponent } from "react";
import classes from "./Welcome.module.scss";
import { useDispatch } from "react-redux";
import { tournamentDataActions } from "@/store/store";

interface WelcomeProps {
  setShowWelcome: (value: boolean) => void;
}

const Welcome: FunctionComponent<WelcomeProps> = ({ setShowWelcome }) => {
  const dispatch = useDispatch();
  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <header>
          <h1>Welcome to the Firebond Tournament</h1>
          <p>Luck or Skill? Lets find out!!!</p>
        </header>
        <div className={classes.cta__container}>
          <button
            className={classes.load__tournament__cta}
            onClick={() => {
              dispatch(
                tournamentDataActions.setTournamentSetupMode("existing")
              );
              setShowWelcome(false);
            }}
          >
            Load Existing Tournament
          </button>
          <button
            className={classes.new__tournament__cta}
            onClick={() => {
              dispatch(tournamentDataActions.setTournamentSetupMode("new"));
              setShowWelcome(false);
            }}
          >
            Create New Tournament
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

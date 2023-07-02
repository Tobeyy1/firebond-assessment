import { ReactNode, FunctionComponent } from "react";

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: FunctionComponent<AppWrapperProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default AppWrapper;

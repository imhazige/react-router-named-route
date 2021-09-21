import React from "react";
import { Switch as RSwitch } from "react-router-dom";
import { regiterPath } from "./routes-helpers";

const Switch:React.FC = ({ children }) => {
  return (
    <RSwitch>
      {React.Children.map(children, (child:any) => {
        const { name, path } = child?.props;
        regiterPath(name, path);
        return child;
      })}
    </RSwitch>
  );
};

export default Switch;

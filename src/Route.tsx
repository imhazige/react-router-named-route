import React from "react";
import { Route as RRoute } from "react-router-dom";
import { Helmet } from "react-helmet";
import useRoute, { RouteState } from "./useRoute";
import { setCurrentRoute } from "./routes-helpers";

interface TitleFunction { 
  (routeState:RouteState):string;
}

interface TitleProps {
  title:string | TitleFunction;
}

const Title:React.FC<TitleProps> = ({ title }) => {
  const routeState = useRoute();

  const theTitle = typeof title === "function" ? title(routeState) : title;

  return (
    <Helmet>
      <title>{theTitle}</title>
    </Helmet>
  );
};

interface RouteProps { 
  name:string; 
  path:string;
  title?:string | TitleFunction ;
  onEnter?:(routeState:RouteState)=>Boolean | undefined;
}

const Route:React.FC<RouteProps> = ({ name,onEnter,children, title, ...otherProps }) => {
  setCurrentRoute(name);
  const routeState = useRoute();
  if (onEnter && !onEnter(routeState)) {
    return null;
  }

  return (
    <RRoute {...otherProps}>
      <>
        {title && <Title title={title} />}
        {children}
      </>
    </RRoute>
  );
};

export default Route;

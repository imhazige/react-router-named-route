import { generatePath } from "react-router";

const routesMap : Record<string, string> = {};
let currentRoute:string | null | undefined = null;

export interface ParamsType {
  [x: string]: string | number | boolean | undefined
}

export const generateRoutePath = (name:string, params?:ParamsType) => {
  const pattern = routesMap[name];
  const path = generatePath(pattern, params);

  return path;
};

export const regiterPath = (name:string, path:string) => {
  if (!name || !path) {
    return;
  }
  routesMap[name] = path;
};


export const setCurrentRoute = (route:string) => {
  currentRoute = route;
};

export const getCurrentRoute = () => {
  if (!currentRoute) {
    return null;
  }
  const path = routesMap[currentRoute];

  return { name: currentRoute, path };
};

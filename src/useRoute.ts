import { useLocation, useHistory, useParams } from "react-router-dom";
import { generateRoutePath, getCurrentRoute } from "./routes-helpers";
import History from 'history';

export interface RouteState {
  name?: string;
  path?: string;
  url: string;
  params: any;
  queryParams: any;
  location: History.Location<History.LocationState>,
  history: History.History<History.LocationState>,
  setRouteParams(ops: any, reset?: boolean): unknown;
  setQueryParams(ops: any): unknown;
  goRoute(routeName: string, routeParams?: any): unknown;
}

const useRoute = (): RouteState => {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const { name, path } = getCurrentRoute() || {};

  const goRoute = (routeName: string, routeParams?: any) => {
    const url = generateRoutePath(routeName, routeParams);

    history.push(url);
  };

  const setRouteParams = (ops: any) => {
    const newParams = { ...params, ...ops };
    const { search } = location;

    const url = generateRoutePath(name as string, newParams) + (search ? search : '');

    history.replace(url);
  };

  const setQueryParams = (ops: any, reset = true) => {
    const { pathname, search } = location;

    const sString = search ? search.substring(1) : "";
    const queryParams = new URLSearchParams(reset ? "" : sString);
    Object.entries(ops).map(([key, val]) => {
      if (!key) {
        return;
      }
      if (!val) {
        queryParams.delete(key);

        return;
      }
      queryParams.set(key, val as string);
    });

    const query = queryParams.toString();

    const fullUrl = `${pathname}${query ? `?${query}` : ""}`;

    history.replace(fullUrl);
  };

  const queryParams: Record<string, string> = {};

  new URLSearchParams(location.search).forEach((value: string, key: string) => {
    queryParams[key] = value;
  });

  return {
    name,
    path,
    location,
    history,
    url: location.pathname,
    params: params || {},
    setRouteParams,
    queryParams,
    setQueryParams,
    goRoute
  };
};

export default useRoute;

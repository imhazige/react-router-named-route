import React from "react";
import { RouteState, useRoute } from ".";

const withRoute = (component:React.ElementType<{routeState:RouteState}>)=>{
    const WrapWithRoute:React.FC = (props)=>{
        const Comp = component;
        const routeState = useRoute();
        
        return (<Comp routeState={routeState} {...{props}}></Comp>);
    }

    return WrapWithRoute;
}

export default withRoute;
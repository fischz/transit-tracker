import React from "react";
import { Link } from "react-router-dom";
import { TransitRoute } from "../../types/Transit.type";
import { RouteLink } from "./RouteList.styles";

interface Props {
    routes: TransitRoute[]
}


const RouteList: React.FC<Props> = ({routes}) => {

    const routeElements = routes.map((r, i) => {
        return <RouteLink to={`/route/${r.tag}`} key={r.tag}><div >{r.title}</div></RouteLink>
    })
    return <div>
        {routeElements}
    </div>

}

export default RouteList;
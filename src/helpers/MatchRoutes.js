import { matchPath } from 'react-router';

const matchRoutes = (location, routes) => {
  const matches = [];
  routes.forEach(route => {
    const match = matchPath(location, {
      ...route
    });

    matches.push({
      match,
      component: route.component
    });

    if(route.routes){
      matches.push(...matchRoutes(location, route.routes));
    }
  });

  return matches;
}


export default matchRoutes;

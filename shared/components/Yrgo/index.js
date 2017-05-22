import React from 'react';
import { Route, Switch } from 'react-router';

import App from 'components/App';
import Home from 'components/Home';
import NotFound from 'components/NotFound';
import EducationsMenu from 'components/EducationsMenu';
import CourseCategory from 'components/CourseCategory';
import Course from 'components/Course';

export default () => {
  const asd = (
    <App>
      <Switch>
        <Route exact path="/" component={Home} />

        {/* match educations */}
        <Route exact path="/courses" component={EducationsMenu} />

        {/* match educations */}
        <Route exact path="/course/category/:slug" component={CourseCategory} />

        {/* match educations */}
        <Route exact path="/course/:slug" component={Course} />

        {/* match post */}
        <Route exact path="/:id(\d+)-:slug" component={Home} />

        {/* match page */}
        <Route exact path="/(.*)/:slug" component={Home} />

        <Route component={NotFound} />
      </Switch>
    </App>
  );

  return asd;
};

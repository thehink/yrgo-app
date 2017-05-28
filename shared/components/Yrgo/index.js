import React from 'react';
import { Route, Switch } from 'react-router';

import App from 'components/App';
import Home from 'components/Home';
import NotFound from 'components/NotFound';
import EducationsMenu from 'components/EducationsMenu';
import CourseCategory from 'components/CourseCategory';
import Course from 'components/Course';
import Application from 'components/Application';
import CompanyMenu from 'components/CompanyMenu';
import Contact from 'components/Contact';
import About from 'components/About';

export default () => {
  const asd = (
    <App>
      <Switch>
        <Route exact path="/" component={Home} />

        {/* match educations */}
        <Route exact path="/business" component={CompanyMenu} />

        {/* match educations */}
        <Route exact path="/courses" component={EducationsMenu} />

        {/* match educations */}
        <Route exact path="/course/category/:slug" component={CourseCategory} />

        {/* match educations */}
        <Route exact path="/course/:slug" component={Course} />

        {/* match post */}
        <Route exact path="/course/:slug/ansokan" component={Application} />

        {/* match educations */}
        <Route exact path="/contact" component={Contact} />

        {/* match educations */}
        <Route exact path="/about/:slug?" component={About} />

        <Route component={NotFound} />
      </Switch>
    </App>
  );

  return asd;
};

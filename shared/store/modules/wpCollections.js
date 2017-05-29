const collections = [
  {
    name: 'post',
    type: 'posts',
  },
  {
    name: 'course',
    type: 'courses',
    params: {
      perPage: 100,
    },
  },
  {
    name: 'page',
    type: 'pages',
  },
  {
    name: 'courseCategorie',
    type: 'course_categories',
  },
  {
    name: 'partner',
    type: 'partners',
  },
  {
    name: 'staff',
    type: 'staff',
  },
  {
    name: 'home',
    type: 'pages',
    multi: false,
    params: {
      slug: 'home',
    },
  },
  {
    name: 'contact',
    type: 'pages',
    multi: false,
    params: {
      slug: 'contact',
    },
  },
  {
    name: 'about',
    type: 'pages',
    multi: false,
    params: {
      slug: 'about',
    },
  },
];

export default collections;

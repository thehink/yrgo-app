const collections = [
  {
    name: 'post',
    type: 'posts',
    params: {},
  },
  {
    name: 'course',
    type: 'courses',
    params: {},
  },
  {
    name: 'courseCategorie',
    type: 'course_categories',
    params: {},
  },
  {
    name: 'home',
    type: 'pages',
    multi: false,
    params: {
      slug: 'home',
    },
  },
];

export default collections;

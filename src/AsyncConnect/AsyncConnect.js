import { connect } from 'react-redux';

import { load, loadSuccess } from './store';

export const AsyncRegister = ({key, promise}, props) => (dispatch, getState) =>  {

  const state = getState().asyncReducer;

  if(state.loadState[key] && state.loadState[key].loaded){
    return;
  }

  promise(props)
  .then(() => {
    dispatch(loadSuccess(key));
  })
  .catch(console.log);

  return dispatch(load(key));
};

export const asyncConnect = (loaders, mapStateToProps, mapDispatchToProps, mergeProps, options) => (Component) => {

  const asyncJobs = [];

  for(var key in loaders){
    let loader = loaders[key];
    let job = {
      key,
      promise: loader
    };

    asyncJobs.push(job);

    mapDispatchToProps._asyncRegister = AsyncRegister;
  }

  class AsyncComponent extends Component{

    static displayName = `AsyncConnect(${Component.name})`;

    componentWillMount(){
      super.componentWillMount();

      asyncJobs.forEach(job => {
        this.props._asyncRegister(job, this.props);
      });
    }

    render(){
      return super.render();
    }
  }

  return connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(AsyncComponent);
}

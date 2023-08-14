import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

//hot reloading | module that comming form parcel not real js

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.pathname.slice(1); //window.location gives entire url
    // console.log('id', id);
    //const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // //!) Loading recipe | asyn fn call another asyn function
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    //2 Rendering recipe
    recipeView.render(model.state.recipe); //rennder method is
  } catch (err) {
    // recipeView.renderError(`${err} 💥💥💥💥`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. load search results
    await model.loadSearchResults(query);

    //3 Render results
    //  resultsView.render(model.state.search.results);

    resultsView.render(model.getSearchResultsPage(3));

    //4) Render initialpagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
//publish subscriper pattern

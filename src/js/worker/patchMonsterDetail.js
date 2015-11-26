require('regenerator/runtime');

var renderDetailView = require('../shared/renderMonsterDetailView');
var getMonsterDarkTheme = require('../shared/monster/getMonsterDarkTheme');
var dbService = require('./databaseService');
var diff = require('virtual-dom/diff');
var Stopwatch = require('../shared/util/stopwatch');
var fromJson = require('vdom-as-json/fromJson');

var lastDetailView = fromJson(require('../shared/prerendered/bulbasaur'));

module.exports = async nationalId => {
  var stopwatch = new Stopwatch('detail: fetching monsterData');
  var fullMonsterData = await dbService.getFullMonsterDataById(nationalId);
  stopwatch.time('detail: rendering');

  var newDetailView = renderDetailView(fullMonsterData);

  stopwatch.time('detail: diffing');

  var patch = diff(lastDetailView, newDetailView);

  lastDetailView = newDetailView;

  stopwatch.time();

  return {patch};
};

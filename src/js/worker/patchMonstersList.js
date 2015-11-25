require('regenerator/runtime');

var renderMonstersList = require('../shared/renderMonstersList');
var diff = require('virtual-dom/diff');
var Stopwatch = require('../shared/util/stopwatch');
var dbService = require('./databaseService');
var startingPageSize = require('../shared/util/constants').pageSize;
var fromJson = require('vdom-as-json/fromJson');

var lastMonstersListView = fromJson(require('../shared/prerendered/monsterSummaries.json'));

module.exports = async (filter, pageSize, start, end) => {
  var stopwatch = new Stopwatch('getting monsters');

  var newMonsters;
  if (filter) {
    newMonsters = await dbService.getFilteredMonsters(filter);
  } else {
    newMonsters = await dbService.getAllMonsters();
  }

  stopwatch.time('rendering monsters');
  var newMonstersList = renderMonstersList(newMonsters, pageSize, start, end);
  stopwatch.time('diffing monsters');

  var patch = diff(lastMonstersListView, newMonstersList);
  var endOfList = newMonsters.length <= pageSize;
  console.log('newMonsters.length', newMonsters.length, 'pageSize', pageSize);
  stopwatch.time();
  lastMonstersListView = newMonstersList;

  return {patch, endOfList};
};

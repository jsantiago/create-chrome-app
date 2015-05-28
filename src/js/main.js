var bespoke = require('bespoke');
var keys = require('bespoke-keys');
var classes = require('bespoke-classes');
var bullets = require('bespoke-bullets');
var progress = require('bespoke-progress');
var scale = require('bespoke-scale');
var loop = require('bespoke-loop');

var deck = bespoke.from('article', [
    keys(),
    classes(),
    bullets('li, .bullet'),
    loop(),
    progress(),
    scale()
]);

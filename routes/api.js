/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
var Issue = require("./../model/issueModel");
var issueController = require("./../controllers/issueController");

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function(app) {
  app
    .route("/api/issues/:project")

    .get(issueController.getIssue)

    .post(issueController.createIssue)

    .put(issueController.updateIssue)

    .delete(issueController.deleteIssue);
};

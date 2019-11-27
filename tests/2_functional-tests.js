/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  suite("POST /api/issues/{project} => object with issue data", function() {
    test("Every field filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          status_text: "In QA"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.data.issue.issue_title, "Title");
          assert.equal(res.body.data.issue.issue_text, "text");
          assert.equal(
            res.body.data.issue.created_by,
            "Functional Test - Every field filled in"
          );
          assert.equal(res.body.data.issue.assigned_to, "Chai and Mocha");
          assert.equal(res.body.data.issue.status_text, "In QA");
          assert.isDefined(res.body.data.issue.created_on);
          assert.isDefined(res.body.data.issue.updated_on);
          assert.isDefined(res.body.data.issue.open);
          //fill me in too!

          done();
        });
    });

    test("Required fields filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.data.issue.issue_title, "Title");
          assert.equal(res.body.data.issue.issue_text, "text");
          assert.equal(
            res.body.data.issue.created_by,
            "Functional Test - Every field filled in"
          );
          done();
        });
    });

    test("Missing required fields", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          assigned_to: "Joe"
        })
        .end(function(err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "ValidationError");
          done();
        });
    });
  });

  suite("PUT /api/issues/{project} => text", function() {
    test("No body", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({})
        .end(function(err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.body.failed, "no updated field sent");
          done();
        });
    });

    test("One field to update", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          _id: "5ddc8b204f9d654bf8b7da88",
          issue_title: "Things"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.success,
            "successfully updated 5ddc8b204f9d654bf8b7da88"
          );
          assert.equal(res.body.data.data.issue_title, "Things");
          done();
        });
    });

    test("Multiple fields to update", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          _id: "5ddc8b4c7e2a0e194c28e137",
          issue_title: "Forks",
          issue_text: "Spoons",
          created_by: "Howard"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.success,
            "successfully updated 5ddc8b4c7e2a0e194c28e137"
          );
          assert.equal(res.body.data.data.issue_title, "Forks");
          assert.equal(res.body.data.data.issue_text, "Spoons");
          assert.equal(res.body.data.data.created_by, "Howard");
          done();
        });
    });
  });

  suite(
    "GET /api/issues/{project} => Array of objects with issue data",
    function() {
      test("No filter", function(done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });

      test("One filter", function(done) {});

      test("Multiple filters (test for multiple fields you know will be in the db for a return)", function(done) {});
    }
  );

  suite("DELETE /api/issues/{project} => text", function() {
    test("No _id", function(done) {});

    test("Valid _id", function(done) {});
  });
});

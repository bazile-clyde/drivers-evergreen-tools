/**
 * Validate that the server supports real credentials from AWS and can talk to a real AWS STS
 * service
 */
load("lib/aws_e2e_lib.js");

(function() {
"use strict";

const external = Mongo.getDB("$external");
const admin = Mongo.getDB("admin");
assert.commandWorked(admin.runCommand({createUser: "admin", pwd: "pwd", roles: ['root']}));
assert(admin.auth("admin", "pwd"));

const config = readSetupJson();

assert.commandWorked(
    external.runCommand({createUser: config["iam_auth_ecs_account_arn"], roles: []}));

assert(external.auth({
    user: config["iam_auth_ecs_account"],
    pwd: config["iam_auth_ecs_secret_access_key"],
    mechanism: 'MONGODB-IAM'
}));
}());
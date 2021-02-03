const { assert } = require("chai");
const { describe } = require("mocha");
const { capitalizeFirstLetter } = require("../../src/utils/text")



test("UTILS capitalizeFirstLetter", () => {

    assert.equal(capitalizeFirstLetter("hello"), 'Hello');
    assert.equal(capitalizeFirstLetter(""), '');

})
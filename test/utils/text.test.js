const { assert } = require("chai");
const { capitalizeFirstLetter } = require("../../src/utils/text")



test("UTILS capitalizeFirstLetter", () => {

    assert.equal(capitalizeFirstLetter("hello"), 'Hello');
    assert.equal(capitalizeFirstLetter(""), '');

})
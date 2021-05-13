/**
 * Name: Xiaoqi Long
 * Date: May 12, 2021
 * TODO: cp,,emy
 */

"use strict";
(function() {
  const BASE_URL = "https://v1.jinrishici.com/";

  function init() {
    id("random").addEventListener("click", fetchRandPoem);
  }

  function fetchRandPoem() {
    let request = BASE_URL + "all.json";
    fetch(request)
      .then(checkStatus)
      .then(resp => resp.json()) 
      .then(function(resp) {
        displayResult(resp["content"], resp["category"]);
        return 
      })
      .catch(console.error); 
  }

  function displayResult(content, category) {
    let categoryTags = id("tags");
    let sentence = id("def");
    sentence.removeChild(sentence.firstChild);
    sentence.appendChild(document.createTextNode(content));
    let newChildren = category.split("-");
    while (categoryTags.firstChild) {
      categoryTags.removeChild(categoryTags.lastChild);
    }
    for (let j = 1; j < newChildren.length; j++) {
      categoryTags.appendChild(createTags(newChildren[j]))
    }
  }

  function createTags(tagContent) {
    let tag = document.createElement("span");
    tag.textContent = tagContent;
    tag.setAttribute('class', 'tag');
    return tag;
  }

  

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  init();
})();

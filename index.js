/**
 * Name: Xiaoqi Long
 * Date: May 12, 2021
 * Javascript file for my poetry website. Clicking the "random" button would lead
 * the website to fetch a new line of poetry along with its category tags to display
 * in the HTML page.
 */

"use strict";
(function() {
  const BASE_URL = "https://v1.jinrishici.com/";

  /**
   * adds an event listener on the random button, so that it could fetch
   * a new random line of poetry and its tags when clicked.
   * @param {} none
   * @return {} none
   */
  function init() {
    id("random").addEventListener("click", fetchRandPoem);
  }

  /**
   * Called when the random button is clicked.
   * Fetches a new random line of poetry and its tags, and displays them
   * in the corresponding boxes on the webpage.
   * @param {} none
   * @return {} none
   */
  function fetchRandPoem() {
    let request = BASE_URL + "all.json";
    fetch(request)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(function(resp) {
        displayResult(resp["content"], resp["category"]);
        return
      })
      .catch(handleError);
  }

  /**
   * Helper function for fetchRandPoem(). Displays the fetched result
   * into the desired boxes on the webpage.
   * @param {string} content - the fetched string that is the content 
   * of the line of poem.
   * @param {string} category - the fetched string that describes the 
   * categories that the line belongs to. This string is later split 
   * into an array of substrings so as to display them as separate tags
   * on the webpage.
   * @return {} none
   */
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
    return
  }

  /**
   * Helper function to create the new tag nodes when a new line is 
   * fetched.
   * @param {string} tagContent - the content of the new tag
   * @return {node} tag - the created span node to be displayed
   */
  function createTags(tagContent) {
    let tag = document.createElement("span");
    tag.textContent = tagContent;
    tag.setAttribute("class", "tag");
    return tag;
  }

  /**
   * Handles an error during a fetch call chain (e.g. the request
   * returns a non-200 error code, such as when the service is 
   * down, or the network request didn't go through in the first 
   * place). 
   * Displays a user-friendly error message.
   * @param {Error} err - the error details of the request.
   */
  function handleError (err) {
    while (id("def").firstChild) {
      id("def").removeChild(id("def").lastChild);
    }
    id("def").appendChild(document.createTextNode(err.message));
    return
  }

  /**
   * Checks the status of a fetch Response, returning the Response 
   * object back for further processing if successful, otherwise 
   * returns an Error that needs to be caught.
   * @param {object} response - response with status to check for 
   * success/error.
   * @returns {object} - The Response object if successful, 
   * otherwise an Error that needs to be caught.
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Returns the element that has the input ID
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  init();
})();

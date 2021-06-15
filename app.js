"use strict";

const memberInput = document.getElementById("memberId")
const envType = document.getElementById("env")
const respDiv = document.getElementById("respContainer")
const submitBtn = document.getElementById("submit")


const showLoading = () => {
  submitBtn.disabled = true
  submitBtn.value = "Loading"
}

const clearLoading = () => {
  submitBtn.disabled = false
  submitBtn.value = "Submit"
  respDiv.style.display = 'block'
}

const createLabel = (value) => {
  var node = document.createElement("LABEL");
  var textnode = document.createTextNode(value);
  node.appendChild(textnode);
  return node;
}

const clearResponse = () => {
  respDiv.textContent = ''
  respDiv.style.display = 'none'
}

submitBtn.addEventListener('click', () => {
  console.log(memberInput.value, envType.value)
  clearResponse()
  showLoading()
  addMember(memberInput.value, envType.value)
})

const addRowToResp = (key, value) => {
  var div = document.createElement("div");
  div.appendChild(createLabel(key))
  div.appendChild(createLabel(value))
  respDiv.appendChild(div)
  respDiv.appendChild(document.createElement("br"))
}

function addMember(memberId, envType) {
  fetch('http://localhost:8080/api/v1/onboard', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      "Accept": 'application/json'
    },
    body: JSON.stringify({
      "subscriberId": memberId,
      "environmentType": envType
    })
  })
    .then(resp => resp.json())
    .then(data => {
      clearLoading()
      Object.entries(data).forEach(([key, value]) =>
        addRowToResp(`${key} : `, value)
      )
    })
    .catch(error => {
      clearLoading()
      addRowToResp("Error while adding user details", '')
      console.error(error)
    });
}
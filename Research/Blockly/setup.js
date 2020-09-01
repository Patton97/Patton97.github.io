// NOTE: This file shouldn't exist because it mostly just repeats the /threejs/setup.js,
// but it's quicker & faster to hack it in here and the project will be gone in a month 

// if for some ungodly reason you start to work on this again, restructuring is your first port-of-call

// ********************************************************************************
// BUTTON HANDLERS
// ********************************************************************************
function btnMenu_Pressed()
{
  window.location = "/Research/"
}

function btnPrevLevel_Pressed()
{
  let currentLevel = parseInt(localStorage.getItem("levelID"))
  let prevLevel = Math.max(currentLevel - 1, 1)
  localStorage.setItem("levelID", prevLevel)
  location.reload()
}

function btnNextLevel_Pressed()
{
  let currentLevel = parseInt(localStorage.getItem("levelID"))
  let numLevels = 5
  let nextLevel = Math.min(currentLevel + 1, numLevels)

  localStorage.setItem("levelID", nextLevel)
  location.reload()
}

// toggles button between "skip" and "next" (for when the user completes the level)
function btnNextLevel_SetFinish()
{
  let btnNextLevel = document.getElementById(`btnNextLevel`)
  btnNextLevel.classList += `finish`
  btnNextLevel.textContent = `Finish ⭐`
  btnNextLevel.onclick = function() { window.location='/Research/' }
}

function btnNextLevel_SetFinish()
{
  let btnNextLevel = document.getElementById(`btnNextLevel`)
  btnNextLevel.classList += `finish`
  btnNextLevel.textContent = `Finish ⭐`
  btnNextLevel.onclick = function() { window.location='/Research/' }
}

function PHY_LoadLevel()
{
  let levelID = localStorage.getItem("levelID")
  if(levelID === undefined || levelID === null)
  {
    levelID = 1
  }
  let levelData = readDataJSON()

  document.getElementById(`levelDescription`).innerHTML = `Level ${levelID}: ${levelData.levels[levelID].description}`
  if(levelID >= levelData.levels.length - 1)
  {
    btnNextLevel_SetFinish()
  }
}

PHY_LoadLevel()
function GenerateHeaderHTML(id, title, tools)
{
  let html = ``

  html += `<span class="projectCardHeader" id ="${id}">`
  html += `  <h2>${title}</h2>`
  html += `  <ul class="tools">`

  tools.forEach(tool => {
    html += `    <li><a class="${tool}"><span class="tooltip"></span></a></li>`
  });

  html += `  </ul>`
  html += `</span>`

  return html
}

function GenerateDescriptionHTML(description)
{
  let html = ``
  html += `<p class="description">${description}</p>`
  return html
}

function GenerateImageHTML(image)
{
  let html = ``
  if(image == null) {return html}

  html += `<div class="videoWrapper">`
  html += `  <img src="${image.url}" alt="NDA"/>`
  html += `</div>`
  return html
}

function GenerateVideoHTML(video)
{
  let html = ``
  if(video == null) {return html}

  if(video.scale == null) { video.scale = 100 }

  html += `<div class="videoWrapper">`
  html += `  <video autoplay controls loop muted>`
  html += `    <source src="${video.url}" type="video/mp4">`
  html += `    Your browser does not support the video tag.`
  html += `  </video>`
  html += `</div>`
  return html
}

function GenerateLinksHTML(links)
{
  if (!Array.isArray(links) || links.length == 0)
  {
    return ``
  }

  let html = ``
  html += `<ul class="links">`
  links.forEach(link =>{
    html += `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${link.class}">${link.text}</a></li>`
  });
  html += `</ul>`
  return html
}

function GenerateProjectHTML(project)
{
  let html = ``
  html += GenerateHeaderHTML(project.id, project.title, project.tools)
  html += GenerateDescriptionHTML(project.description)
  html += GenerateVideoHTML(project.video)
  html += GenerateImageHTML(project.image)
  html += GenerateLinksHTML(project.links)

  return html
}

function GenerateShowcaseHTML(showcaseTitle, projects)
{
  let main = document.getElementsByTagName("main")[0]

  let showcaseTitleElement = document.createElement("h1")
  showcaseTitleElement.textContent = showcaseTitle
  main.insertBefore(showcaseTitleElement, main.lastChild)

  let showcaseSection = document.createElement("section")
  showcaseSection.className = "showcase"
  main.insertBefore(showcaseSection, main.lastChild)

  let showcaseGrid = document.createElement("div")
  showcaseGrid.className = "showcaseGrid"
  showcaseSection.appendChild(showcaseGrid)

  projects.forEach(project => {
    let showcaseGridCell = document.createElement("div")
    showcaseGridCell.className = "showcaseGridCell"
    showcaseGridCell.innerHTML = GenerateProjectHTML(project)
    showcaseGrid.appendChild(showcaseGridCell)
  });
}

function GetProjectsForShowcase(projects, showcaseId)
{
  return projects.filter(project =>
  {
    if (showcaseId === null)
    {
      return !project.hasOwnProperty("showcase")
    }

    return project.showcase === showcaseId
  })
}

function LoadProjectJson(jsonUrl)
{
  var json = null
  $.ajax({
      'async': false,
      'global': false,
      'url': jsonUrl,
      'dataType': "json",
      'success': function (data)
      {
        json = data;
      }
  })
  return json
}

let portfolioJson = LoadProjectJson('/Portfolio/portfolio.json')

let personalShowcaseJson = GetProjectsForShowcase(portfolioJson, "personal")
console.log("Found " + portfolioJson.length + " personal projects!")
console.log(portfolioJson)
GenerateShowcaseHTML("⭐Personal Showcase⭐", personalShowcaseJson)

let professionalShowcaseJson = GetProjectsForShowcase(portfolioJson, "professional")
console.log("Found " + professionalShowcaseJson.length + " professional projects!")
console.log(professionalShowcaseJson)

GenerateShowcaseHTML("⭐Professional Showcase⭐", professionalShowcaseJson)

// TODO: Find a nice way of styling a showcase with more than 1 row of projects
// TODO: Make this a button, which only loads them if the user actively requests it (save on video download)
// let archiveJson = GetProjectsForShowcase(portfolioJson, null)
// console.log("Found " + archiveJson.length + " archive projects!")
// console.log(archiveJson)
// GenerateShowcaseHTML("Archive", archiveJson)
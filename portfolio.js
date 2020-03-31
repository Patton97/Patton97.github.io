
function GenerateHeaderHTML(id, title, tools)
{
  let html = ``

  html += `<span class="projectCardHeader" id ="${id}">`
  html += `  <h2>${title}</h2>`
  html += `  <ul class="tools">`

  tools.forEach(tool => {
    html += `    <li><a href="" class="${tool}"></a></li>`
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

function GenerateVideoHTML(video)
{
  let html = ``
  if(video == null) {return html}

  
  html += `<video width="${video.scale}%" autoplay controls loop muted>`
  html += `  <source src="${video.url}" type="video/mp4">`
  html += `  Your browser does not support the video tag.`
  html += `</video>`
  return html
}

function GenerateLinksHTML(links)
{
  let html = ``
  html += `<ul class="links">`
  links.forEach(link =>{
    html += `<li><a href="${link.url}" target="_blank" class="${link.class}">${link.text}</a></li>`
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
  html += GenerateLinksHTML(project.links)

  return html
}

function GeneratePortfolioHTML(projects)
{
  let main = document.getElementsByTagName("main")[0]
  projects.forEach(project => {
    let section = document.createElement('section')
    section.className = "projectCard"
    section.innerHTML = GenerateProjectHTML(project)
    main.insertBefore(section, main.lastChild)
  });
}

var json = (function () 
{
  var json = null;
  $.ajax({
      'async': false,
      'global': false,
      'url': './portfolio.json',
      'dataType': "json",
      'success': function (data) {
          json = data;
      }
  });
  return json;
})(); 

GeneratePortfolioHTML(json)
    
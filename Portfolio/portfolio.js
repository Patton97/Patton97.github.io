function GenerateProjectCardHeaderElement(id, title, tools)
{
  let headerElement = document.createElement("div");
  headerElement.className = "projectCardHeader";
  headerElement.id = id;

  let headerTextElement = document.createElement("h2");
  headerTextElement.textContent = title;
  headerElement.appendChild(headerTextElement);

  let toolsListElement = document.createElement("ul");
  toolsListElement.className = "tools";
  tools.forEach(tool => toolsListElement.innerHTML += `<li><a class="${tool}"><span class="tooltip"></span></a></li>`);
  headerElement.appendChild(toolsListElement);

  return headerElement;
}

function GenerateDescriptionElement(description)
{
  let descriptionElement = document.createElement("p");
  descriptionElement.className = "description";
  descriptionElement.textContent = description;
  return descriptionElement;
}

function GenerateMediaElement(project)
{
  let mediaElement = document.createElement("div");
  mediaElement.className = "mediaWrapper";

  if (project.video)
  {
    mediaElement.innerHTML = `
<video autoplay controls loop muted>
  <source src="${project.video.url}" type="video/mp4">
  Your browser does not support the video tag.
</video>
`;
  }
  else if (project.image)
  {
    mediaElement.innerHTML = `<img src="${project.image.url}" alt="NDA"/>`;
  }
  else
  {
    return null;
  }

  return mediaElement;
}

function GenerateLinksElement(links)
{
  if (!Array.isArray(links) || links.length === 0)
  {
    return null;
  }

  let linksElement = document.createElement("ul");
  linksElement.className = "links";
  links.forEach(link => linksElement.innerHTML += `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${link.class}">${link.text}</a></li>`);
  
  return linksElement;
}

function CreateProjectCardElement(project)
{
  let projectCard = document.createElement("div");
  projectCard.className = "projectCard";

  projectCard.appendChild(GenerateProjectCardHeaderElement(project.id, project.title, project.tools));
  projectCard.appendChild(GenerateDescriptionElement(project.description));

  let mediaElement = GenerateMediaElement(project);
  if (mediaElement)
  {
    projectCard.appendChild(mediaElement);
  }

  let linksElement = GenerateLinksElement(project.links);
  if (linksElement)
  {
    projectCard.appendChild(linksElement);
  }

  return projectCard;
}

function GenerateShowcaseHTML(showcaseTitle, projects)
{
  let main = document.getElementsByTagName("main")[0];

  // Showcase section
  let showcaseSection = document.createElement("section");
  showcaseSection.className = "showcase";
  main.insertBefore(showcaseSection, main.lastChild);

  // Showcase title
  let showcaseTitleElement = document.createElement("h1");
  showcaseTitleElement.textContent = showcaseTitle;
  showcaseSection.appendChild(showcaseTitleElement);

  // Project group container
  let projectGroup = document.createElement("div");
  projectGroup.className = "projectGroup";
  showcaseSection.appendChild(projectGroup);

  // Add project cards
  projects.forEach(project => {
    let projectCard = CreateProjectCardElement(project);
    projectGroup.appendChild(projectCard);
  });
}

function LoadProjectJson(jsonUrl)
{
   var json = null
    $.ajax({
        'async': false,
        'global': false,
        'url': jsonUrl,
        'dataType': "json",
        'success': function (data) { json = data; }
    })
    return json
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

let portfolioJson = LoadProjectJson('/Portfolio/portfolio.json');
let personalShowcaseJson = GetProjectsForShowcase(portfolioJson, "personal");
console.log("Found " + portfolioJson.length + " personal projects!");
console.log(portfolioJson);
GenerateShowcaseHTML("⭐Personal Showcase⭐", personalShowcaseJson);

let professionalShowcaseJson = GetProjectsForShowcase(portfolioJson, "professional");
console.log("Found " + professionalShowcaseJson.length + " professional projects!");
console.log(professionalShowcaseJson);
GenerateShowcaseHTML("⭐Professional Showcase⭐", professionalShowcaseJson);

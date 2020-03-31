function GenerateHexagonHTML(project)
{
  let html = ``
  html += `<a href="./portfolio#${project.id}">`
  html += `<img src="${project.thumbnail}" class="hex-thumbnail">`
  html += `<p class="hex-description">${project.title}</p>`
  html += `</a>`
  return html
}

function GenerateGalleryHTML(projects)
{
  let main = document.getElementsByTagName("main")[0]
  let gallery = document.createElement('div')
  gallery.className = "hex-gallery"
  main.insertBefore(gallery, main.lastChild)

  projects.forEach(project => {
    let hexagon = document.createElement('div')
    hexagon.className = "hexagon"
    
    hexagon.innerHTML = GenerateHexagonHTML(project)
    main.insertBefore(hexagon, gallery.lastChild)
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

GenerateGalleryHTML(json)
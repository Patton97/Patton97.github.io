
function GenerateThumbnailHTML(project)
{
  let html = ``
  html += `<div class="thumbnail-wrapper">`
  html += `  <p class="thumbnail-description">${project.title}</p>`
  html += `  <a href="/Portfolio#${project.id}">`
  html += `    <img src="${project.thumbnail}" class="thumbnail">`  
  html += `  </a>`
  html+= `</div>`
  return html
}

function GenerateGalleryHTML(projects)
{
  let main = document.getElementsByTagName("main")[0]
  let gallery = document.createElement('div')
  gallery.className = "gallery"
  main.insertBefore(gallery, main.lastChild)


  projects.forEach(project => {
    let thumbnail = document.createElement('div')
    thumbnail.className = "thumbnail"
    thumbnail.id = project.id
    thumbnail.innerHTML = GenerateThumbnailHTML(project)
    main.insertBefore(thumbnail, gallery.lastChild)
  });
}

var json = (function () 
{
  var json = null;
  $.ajax({
      'async': false,
      'global': false,
      'url': '/Portfolio/portfolio.json',
      'dataType': "json",
      'success': function (data) {
          json = data;
      }
  });
  return json
})(); 

GenerateGalleryHTML(json)
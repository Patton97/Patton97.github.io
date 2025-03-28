
function GenerateFooterHTML()
{
  let html = ``
  html += `<ul class="links">`
  html += `  <li><a href="mailto:atpatton97@gmail.com" target="_blank" rel="noopener noreferrer" class="email">atpatton97@gmail.com</a></li>`
  html += `  <li><a href="https://linkedin.com/in/andrewpattondev" target="_blank" rel="noopener noreferrer" class="linkedin">/in/andrewpattondev</a></li>`
  html += `</ul>`
  return html
}

let footer = document.getElementsByTagName("footer")[0]
footer.innerHTML = GenerateFooterHTML()

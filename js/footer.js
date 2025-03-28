
function GenerateFooterHTML()
{
  let html = ``
  html += `<ul class="links">`
  html += `  <li><a href="mailto:atpatton97@gmail.com" class="email">atpatton97@gmail.com</a></li>`
  html += `  <li><a href="https://linkedin.com/in/andrewpattondev" class="linkedin">/in/andrewpattondev</a></li>`
  html += `</ul>`
  return html
}

let footer = document.getElementsByTagName("footer")[0]
footer.innerHTML = GenerateFooterHTML()

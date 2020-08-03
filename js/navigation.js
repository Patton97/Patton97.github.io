function GenerateNavHTML()
{
  let html = ``
  html +=`<a href="/" id="home">`
  html +=`  <img src="/Images/Favicon/favicon.png"/>`
  html +=`</a>`
  html +=`<ul>`
  html +=`  <li><a href="/About">About</a></li>`
  html +=`  <li><a href="/Portfolio">Portfolio</a></li>`
  html +=`  <li><a href="/Downloads/Resume.pdf">CV [PDF]</a></li>`
  html +=`</ul>`

  return html
}

let nav = document.getElementsByTagName("nav")[0]
nav.innerHTML = GenerateNavHTML()
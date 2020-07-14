
function ConvertToHex(data)
{
  var file = new Blob([data]) // your file

  var fr = new FileReader()
  fr.addEventListener('load', function () {
      var u = new Uint8Array(this.result)
      var a = new Array(u.length)
      var i = u.length
      while (i--) // map to hex
          a[i] = (u[i] < 16 ? '0' : '') + u[i].toString(16)
      u = null // free memory
      a.forEach(x => console.log(x))
      console.log(a) // work with this
  });
  fr.readAsArrayBuffer(file)
}
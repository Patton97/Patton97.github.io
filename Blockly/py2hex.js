// Adapted from make_hex.py script created by Paul Grenfell (2016)
// Available at: http://giggletronics.blogspot.com/2016/09/what-are-hex-files.html

var include_filename = 'base.hex'
var source_filename = 'source.py'
var output_filename = 'output.hex'
var output_file = ``

function readTextFile(file)
{
  var fileContents;
  var rawFile = new XMLHttpRequest()
  rawFile.open("GET", file, false)
  rawFile.overrideMimeType("text/plain")
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        fileContents = rawFile.responseText;       
      }
    }
  }
  rawFile.send(null);
  return fileContents
}

function ConvertDecToHex(dec)
{
  let hex = dec.toString(16);
  if( (hex.length % 2) > 0 ) { hex= "0" + hex } //force preceding 0 in case of single digit hex 
  return hex;
}

class HexDataWriter
{
    constructor(base_address, data_bytes_per_line)
    {
      this.buffer = []
      this.base_address = base_address
      this.data_bytes_per_line = data_bytes_per_line
    }
        

    output(data)
    {
      this.buffer.push(data)
      if (this.buffer.length == this.data_bytes_per_line)
      {
        // Init bytes with req preamble 
        let bytes = [this.data_bytes_per_line, 
                    (this.base_address / 256) & 0xff, 
                    (this.base_address & 0xff),
                    0]
        this.buffer.forEach(i => bytes.push(i))
        let msg = ':'
        let checksum = 0
        bytes.forEach((i) =>
        {
          msg = msg + ConvertDecToHex(i)
          checksum = (checksum + i) & 0xff
        })

        msg = msg + ConvertDecToHex(-checksum & 0xff)
        output_file += (msg.toUpperCase() + '\n')

        this.buffer = []
        this.base_address = this.base_address + this.data_bytes_per_line
      }
    }
        
    finalise()
    {
      //If chars left in buffer, pad with 0s until buffer reaches
      //required number of data bytes to fill a new line
      while(this.buffer.length != 0)
      {
        this.output(0)
      }
    }
}

function GetHeader()
{
  let header;
  header += readTextFile("./base.hex")
  return header;
}

function GetPrologue()
{
  let prologue;
  prologue += ':020000040003F7\n'
  return prologue
}

function GetEpilogue()
{
  let epilogue;
  epilogue += ':0400000500013A8537\n'
  epilogue += ':00000001FF\n'
  return epilogue
}

function ConvertToHex(python_code)
{
  //Header & Prologue are universal, so we can begin by copying those over
  output_file += GetHeader()
  output_file += GetPrologue()

  // HexDataWriter is used to esnure precise conversion & formatting of the hex file
  writer = new HexDataWriter(0xe000, 16)

  // Send required MicroPython Signature to the hex data writer
  writer.output('M'.charCodeAt(0))
  writer.output('P'.charCodeAt(0))
  writer.output(python_code.length & 0xff)
  writer.output((python_code.length / 256) & 0xff)

  // Write the source file to output file
  for (var i = 0; i < python_code.length; i++) {
    writer.output(python_code.charAt(i).charCodeAt(0))
  }
  
  writer.output(0)
  writer.finalise()

  // Epilogue is also universal, so we can copy that over too
  output_file += GetEpilogue()
  
  console.log(output_file)
} 
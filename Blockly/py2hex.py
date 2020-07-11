# Paul Grenfell (2016)
# Available at: http://giggletronics.blogspot.com/2016/09/what-are-hex-files.html
#import document

include_filename = document.getElementById("base-hex").value
source_filename  = document.getElementById("python-code").value
output_filename  = document.getElementById("output-hex").value

class HexDataWriter():
    def __init__(self, output_file, base_address, data_bytes_per_line):
        self.buffer = []
        self.output_file = output_file
        self.base_address = base_address
        self.data_bytes_per_line = data_bytes_per_line

    def output(self, data):
        self.buffer.append(data)
        if len(self.buffer) == self.data_bytes_per_line:
            bytes = []
            bytes.append(self.data_bytes_per_line)
            bytes.append((self.base_address / 256) & 0xff)
            bytes.append(self.base_address & 0xff)
            bytes.append(0)
            for i in self.buffer:
                bytes.append(i)

            msg = ':'
            checksum = 0
            for i in bytes:
                msg = msg + format(i, '02x')
                checksum = (checksum + i) & 0xff
            msg = msg + format(-checksum & 0xff, '02x')
            self.output_file.write(msg.upper() + '\n')

            self.buffer = []
            self.base_address = self.base_address + self.data_bytes_per_line

    def finalise(self):
        while len(self.buffer) != 0:
            self.output(0)


def try_open(filename, mode):
    try:
        return open(filename, mode)
    except:
        print('Could not open ' + filename)
        return None


# Try to open all of the files
include_file = try_open(include_filename, 'rt')
source_file = try_open(source_filename, 'rt')
output_file = try_open(output_filename, 'wb')
if include_file and source_file and output_file:
    # Load the header
    include_data = include_file.read()

    # Write the header to the output file
    output_file.write(include_data)

    # Write prologue to output file
    output_file.write(':020000040003F7\n')

    # Read source file
    source_lines = source_file.read()

    # Write required header to output file
    writer = HexDataWriter(output_file, 0xe000, 16)
    writer.output(ord('M'))
    writer.output(ord('P'))
    writer.output(len(source_lines) & 0xff)
    writer.output((len(source_lines) / 256) & 0xff)

    # Write the source file to output file
    for i in source_lines:
        writer.output(ord(i))
    writer.output(0)
    writer.finalise()

    # Write epilogue to output file
    output_file.write(':0400000500013A8537\n')
    output_file.write(':00000001FF\n')

    print('Done')
else:
    print('Failed')

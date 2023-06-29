
# Creating Images, Animations, and Fonts on SSD130x Controllers

Recently I've been playing around with some OLED displays on a Raspberry PI. These are dot-matrix displays where you feed it enough bytes and it prints some image to the screen. The official libraries I have received from the manufactures provide setting individual pixels, drawing bitmaps along with some stock images they hard coded into the header files as byte arrays, and char/string rendering, with some really ugly fonts, which are also hard coded in the headers.

Focusing on bitmaps, understanding the structure of the buffers they want is pretty straight forward. Each byte represents 8 bits that go across the screen until it hits the width carried to the function, then it goes to the next line. 

`void SSD1309_bitmap(unsigned char x, unsigned char y, const unsigned char *pBmp, unsigned char chWidth, unsigned char chHeight);`

This gives us a basic framework to display images, however there are some caveats...

## The ugly
* Creating images using byte arrays is very time consuming. I was able to save an image as C code in Gimp by exporting as .xbm, however the endianness was backwards to what the driver code wanted and there wasn't any extra data about the image (such as width and height)
* Speaking of width and height, it's kind of ugly that you have to pass that in with the buffer. You should be able to pass in an object that ties everything the image needs nicely
* The fonts supplied in the driver were pretty bad, taking an image of an ASCII font and having our code map out the characters as an easy way to find, create, and edit fonts for our screens
* No animations. If I want animations I need to have multiple arrays that swap every so often

![A much nicer font on opengameart.org](https://opengameart.org/sites/default/files/font_5.png)

*A much nicer font I found on [opengameart.org](https://opengameart.org/)*

With these issues in mind it's clear we need a file format to handle these things, and an easy way to create these images. This is what I came up with

## Let's make a file format!
Here is the structure I came up with for my file format:

<table class="table">
  <tbody>
    <tr>
      <th>byte 0</th>
      <th>byte 1</th>
      <th>byte 2</th>
      <th>byte 3</th>
      <th>byte 4</th>
      <th></th>
      <th>byte n+4</th>
    </tr>
    <tr>
      <td>version</td>
      <td>width</td>
      <td>height</td>
      <td>frames</td>
      <td>data[0]</td>
      <td>...</td>
      <td>data[n]</td>
    </tr>
  </tbody>
</table>

With just this information we have enough to handle images, ASCII fonts, and animations. 

Now we just need to have a way to quickly create these images
## Writing a plugin
Aseprite is the best candidate to make a plugin for. It is made for pixel art, supports animation, and supports scripting in Lua. The script can be found [here](https://github.com/aaron64/Asprite_SSD1305_save.git). I'll go over some of the main bits here, most of the script is setting up the file / GUI.

Write version (0), width and height

```
-- meta data
file:write(string.char(0))
file:write(string.char(width))
file:write(string.char(height))
```

Write number of frames

```
local frames = 0
for c, cel in ipairs(fsprite.cels) do
    frames = frames + 1
end
file:write(string.char(frames))
```

Iterate the flattened image to write every 8 pixels as a hex char, the threshold for a pixel being on or off depends on the image pixel's value at 128 ( > 128 is ON, <= 128 is OFF)

<code>
-- image data
local zeroPadding = fsprite.width-((fsprite.width/8)*8)
local bytes = math.ceil(width/8.0)
for c, cel in ipairs(fsprite.cels) do
    local fimage = cel.image
    for y = 0, fsprite.height - 1 do
        for b = 0, bytes - 1 do
            local byte = 0
            for x = 0, 7 do
                local px = app.pixelColor.grayaV(fimage:getPixel(x + b * 8, y))
                if px > 128 then
                    px = 1
                else
                    px = 0
                end
&nbsp;
                byte = byte | (px << x)
                px = 0
            end
            file:write(string.char(byte))
        end
    end
end
</code>

Running our script on  an animation gives us something like this:

```
0080 2010 0000 0000 0000 0000 0000 0000
0000 0000 0000 00fa ffff ffff ffff ffff
1f00 0000 0000 0008 0000 0000 0000 0000
1000 0000 0000 00c8 ff3f 00ff ff00 feff
1700 0000 0000 00e8 ff7f 80ff ff01 feff
1700 0000 0000 00ea ff7f 80ff ff01 feff
1700 0000 0000 00e8 ff7f 80ff ff01 feff
1700 0000 0000 00e8 ff7f 80ff ff01 feff
```

You can see the metadata in the first 4 bytes:
0x00 (version)
0x80 (width = 128)
0x20 (height = 32)
0x10 (10 frame animation)

One limitation is the width and height are capped at 256, however most of these displays are smaller than that, if needed you can always append more bytes to a value in the file.

## Modifying our library
The library I will be modifying can be found [here](https://www.waveshare.com/wiki/2.23inch_OLED_HAT), however any library that can display bitmaps in a similar manner will work. This library is for the SSD1305 but has worked fine on SSD1309 devices as well.

![SSD1309 bitmap class structure](https://i.imgur.com/n5Ti3st.png)

Here we have an image, font, and animation class, which all extend from a file class.

### SSDFile
The file class contains a simple constructor with the file path as a parameter and a protected byte pointer to store the file data:

```
class SSD1309File
{
protected:
	uint8_t *_data;
public:
	SSD1309File(std::string filePath);
};
```

The constructor is quite simple as well, reading the file and storing the data in data

<code>
SSD1309File::SSD1309File(std::string filePath)
{
	std::ifstream file(filePath, std::ios::out | std::ios::binary);
	if(!file)
	{
		std::cout << "Could not find file" << std::endl;
		return;
	}
&nbsp;
	file.seekg(0, std::ios::end);
	size_t length = file.tellg();
	file.seekg(0, std::ios::beg);
	this->_data = new uint8_t[length];
	file.read((char*)_data, length);
}
</code>

### SSDImage
The image class has a few extra members:
* width
* height
* imageData

These values can be pulled from the data in the file's constructor. When rendering simply call the SSD130x libraries draw function
```
SSD1309_bitmap(x, y, this->_imageData,this->_width, this->_height);
```

### SSDAnimation
![Creating an animation in Aseprite](https://i.imgur.com/BdhkN8k.png)

The animation class is identical to the image class, but includes data for the amount of frames. Each frames size (width * height) is stored in frameSize which we can use to offset the buffer when rendering with pointer arithmetic. I also use a timer class that checks the current time when rendering to decide when to increment frames.

<code>
void SSD1309Animation::render(int16_t x, int16_t y)
{
	// Render current frame
	SSD1309_bitmap(x, y, this->_imageData + this->_currentFrame * this->_frameSize,this->_width, this->_height);
&nbsp;
	// If the timer is done and we have more frames
	if(this->_timer->done() && this->_currentFrame <= this->_frames-1)
	{
		this->_currentFrame++;
		this->_timer->start();
	}
&nbsp;
	// If we go past the amount of frames, either stop or loop
	if (this->_currentFrame >= this->_frames)
	{
		if(this->_loop)
			this->_currentFrame = 0;
		else
			this->_done = true;
	}
}
</code>

Loop is passed in as an optional parameter
```
SSD1309Animation(std::string filePath, uint16_t rate, bool loop=false);
```

### SSDFont
Font's are actually very similar to animations, but instead of each frame being a slice in time it's used to slice the sprite into each character. 
![Slicing an image in Aseprite](https://i.imgur.com/m5kPpve.png)

Rendering a font also requires some pointer arithmetic, in this case frameSize is the size of each character on the sprite and I am offsetting the character left by ' ' (32) as the first 32 ASCII chars are not included in this font so I removed them.
```
void SSD1309Font::render(std::string str, int16_t x, int16_t y)
{
	for(unsigned int i = 0; i < str.size(); i++)
	{
		uint8_t c = str[i] - ' ';
		SSD1309_bitmap(x + this->_width * i, y, 
			this->_imageData + c * this->_frameSize, this->_width, this->_height);
	}
}
```

## Conclusion
Without too much work we can now more easily display images, animations, and fonts on our screens! Some final reminders:
* We only use 1 byte for width and height, limiting our sprite size to 256
* Animations and fonts are also limited to 256 frames/characters
* All 3 bitmap types are being sent to the same render function in the library. At the end of the day the screen just wants some bytes!
* If your image is flipped every 8 pixels, you need to change the endianness of either the library or the Lua script

![Final result showing an image and some text](https://i.imgur.com/yHxuEQj.jpg?1)

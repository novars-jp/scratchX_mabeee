# scratchX_mabeee
MaBeee Extension for ScratchX.
MaBeee is dry battery type IoT device that controll dry battery power via bluetooth.
About detail of MaBeee see here -> [MaBeee Official site](https://mabeee.mobi/)

## Requirement

- [Official MaBeee App for macOS](https://github.com/novars-jp/MaBeeeMacApp).
MaBeee driver for pc. Please start this app before using MaBeee.

※MaBeee driver is now only available on macOS. We work hard on windows app now!

## Usage
Click this link ([ScratcX/MaBeeeExtention](http://scratchx.org/?url=https://novars-jp.github.io/scratchX_mabeee/mabeee.js#scratch)) and open the extension.

## Usage of each blocks
### "Connect MaBeee" block
![2017-04-13 0 00 01](https://cloud.githubusercontent.com/assets/24409457/25064963/04cbcf14-2241-11e7-8f6c-20c9db15b236.png)

You can connect scratchx extension and MaBeee with this block.
When you start this block, MaBeees available are detected. Select the MaBeee you want to use.

### "Turn MaBeee on" "Turn MaBeee off" block
![2017-04-12 23 59 12](https://cloud.githubusercontent.com/assets/24409457/25064967/218eb4d6-2241-11e7-9101-8138e83a5e3e.png)
![2017-04-13 0 17 21](https://cloud.githubusercontent.com/assets/24409457/25064969/25e75d1c-2241-11e7-9411-07d98e43dcf0.png)

These blocks change power of MaBeee 100 or 0.

### "Set MaBeee power" block
![2017-04-13 0 28 28](https://cloud.githubusercontent.com/assets/24409457/25064974/3af804d6-2241-11e7-8586-b3fd8fec2031.png)

You can set power of MaBeee between 0 and 100.

### "Wait seconds and turn MaBeee on" "Wait seconds and turn MaBee off"
![2017-04-13 0 35 57](https://cloud.githubusercontent.com/assets/24409457/25064976/48df2aa2-2241-11e7-8d3e-283b04d77317.png)
![2017-04-13 0 36 17](https://cloud.githubusercontent.com/assets/24409457/25064977/4a9db05c-2241-11e7-8402-822db6bd3e7a.png)

ON and Off blocks that wait.

### "Intensity of bluetooth" block
![2017-04-13 0 42 35](https://cloud.githubusercontent.com/assets/24409457/25064986/573b650c-2241-11e7-9efa-25439ac80d6d.png)

You can measure the intensity of bluetooth connection.
This block returns the intensity between 0 and 100.

### "Disconnect MaBeee" block
![2017-04-13 0 47 51](https://cloud.githubusercontent.com/assets/24409457/25064988/613127e0-2241-11e7-930c-ce913b16ce22.png)

You can disconnect MaBeee and extension.

## Examples

### Simply turn MaBeee on.
![2017-04-13 1 03 15](https://cloud.githubusercontent.com/assets/24409457/25065029/d8f9393e-2241-11e7-8dcc-1b55c8c0c3fb.png)

### Turn on MaBeee for 10 seconds.
![2017-04-13 1 02 07](https://cloud.githubusercontent.com/assets/24409457/25065013/c1a86f8e-2241-11e7-98e0-cf770cab0081.png)

### Switch ON / Off in 3 seconds interval.
![2017-04-13 1 05 03](https://cloud.githubusercontent.com/assets/24409457/25065033/f2d760f6-2241-11e7-92b3-948e062742f6.png)

### Raise MaBeee power every 1 second.
![2017-04-13 1 11 54](https://cloud.githubusercontent.com/assets/24409457/25065078/13b72166-2243-11e7-8dde-5167352eea1f.png)


### Sync MaBeee power and loudness.
![2017-04-13 1 35 09](https://cloud.githubusercontent.com/assets/24409457/25065042/2d1bc7e8-2242-11e7-86b4-ea41f3ef015a.png)

### Sync MaBeee power and intensity of bluetooth connection
![2017-04-13 1 34 44](https://cloud.githubusercontent.com/assets/24409457/25065044/30fd5b4c-2242-11e7-8030-54c770142ebf.png)

### Turn MaBeee on when intensity of bluetooth.
![2017-04-13 1 39 20](https://cloud.githubusercontent.com/assets/24409457/25065047/50148b54-2242-11e7-8115-6abaf6d6f04a.png)

### Turn MaBeee on and off when mouse cursor is in specific area.
![2017-04-13 1 46 12](https://cloud.githubusercontent.com/assets/24409457/25065051/6477b562-2242-11e7-9d63-c85ee64b1a7d.png)

### Body clock game
![2017-04-13 2 14 48](https://cloud.githubusercontent.com/assets/24409457/25065060/7fd1c62c-2242-11e7-843f-17c41d06041e.png)

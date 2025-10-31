const enum LED {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

const enum RELAY {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

const enum DistanceUnit {
    //% block="cm"
    CM = 0,
    //% block="inch"
    INCH = 1
}

const enum CharIndex {
    //% block="1"
    C1 = 0,
    //% block="2"
    C2 = 1,
    //% block="3"
    C3 = 2,
    //% block="4"
    C4 = 3,
    //% block="5"
    C5 = 4,
    //% block="6"
    C6 = 5,
    //% block="7"
    C7 = 6,
    //% block="8"
    C8 = 7
}

const enum MyDigitalPin {
    //% block="P0"
    P0 = 100,
    //% block="P1"
    P1 = 101,
    //% block="P2"
    P2 = 102,
    //% block="P3(Col1)"
    P3 = 103,
    //% block="P4(Col2)"
    P4 = 104,
    //% block="P5(A)"
    P5 = 105,
    //% block="P6(Col9)"
    P6 = 106,
    //% block="P7(Col8)"
    P7 = 107,
    //% block="P8"
    P8 = 108,
    //% block="P9(Col7)"
    P9 = 109,
    //% block="P10(Col3)"
    P10 = 110,
    //% block="P11(B)"
    P11 = 111,
    //% block="P12"
    P12 = 112,
    //% block="P13(SCK)"
    P13 = 113,
    //% block="P14(MISO)"
    P14 = 114,
    //% block="P15(MOSI)"
    P15 = 115,
    //% block="P16"
    P16 = 116,
    //% block="P19(SCL)"
    P19 = 119,
    //% block="P20(SDA)"
    P20 = 120,
}

const enum MyAnalogPin {
    //% block="P0"
    P0 = 100,
    //% block="P1"
    P1 = 101,
    //% block="P2"
    P2 = 101,
    //% block="P3(Col1)"
    P3 = 103,
    //% block="P4(Col2)"
    P4 = 104,
    //% block="P10(Col3)"
    P10 = 110
}

//% color="#31C7D5" weight=10 icon="\uf2db"
namespace Microbit_Kit {
    
    //% blockId=LED_Module block="LED at %pin| is %status"   group="LED"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myLED(pin: MyDigitalPin, status: LED): void {
        pins.digitalWritePin(pin, status)
    }

    //% blockId=RGB_Module block="RGB Red %rpin %rv Green %gpin %gv Blue %bpin %bv"   group="RGB"
    //% rpin.fieldEditor=pinpicker
    //% rpin.fieldOptions.columns=4
    //% gpin.fieldEditor=pinpicker
    //% gpin.fieldOptions.columns=4
    //% bpin.fieldEditor=pinpicker
    //% bpin.fieldOptions.columns=4
    //% rv.min=0 rv.max=1023
    //% gv.min=0 gv.max=1023
    //% bv.min=0 bv.max=1023
    //% rpin.defl=MyAnalogPin.P0
    //% gpin.defl=MyAnalogPin.P1
    //% bpin.defl=MyAnalogPin.P2
    //% inlineInputMode=inline
    export function myRGB(rpin: MyDigitalPin, rv: number, gpin: MyDigitalPin, gv: number, bpin: MyDigitalPin, bv: number): void {
        pins.analogWritePin(rpin, rv)
        pins.analogWritePin(gpin, gv)
        pins.analogWritePin(bpin, bv)
    }

    //% blockId=Button block="Button at %pin is pressed" 
    //% group="Button"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myButton(pin: MyDigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Joystick_Button block="Joystick button at %pin is pressed"
    //% group="Joystick"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.defl=MyDigitalPin.P2
    export function myJoystickButton(pin: MyDigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Joystick_Y block="Joystick Y-axis at %pin get value"
    //% group="Joystick"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    //% pin.defl=MyAnalogPin.P1
    export function myJoystick_Y(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Joystick_X block="Joystick X-axis at %pin get value"
    //% group="Joystick"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    //% pin.defl=MyAnalogPin.P0
    export function myJoystick_X(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Light_Sensor block="Light Sensor at %pin get value"
    //% group="Light Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    export function myLightSensor(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Sound_Sensor block="Sound Sensor at %pin get value"
    //% group="Sound Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    export function mySoundSensor(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Tilt_Sensor block="Tilt Sensor at %pin is tilted" 
    //% group="Tilt Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myTiltSensor(pin: MyDigitalPin): boolean {
        return pins.digitalReadPin(pin) == 1 ? true : false;
    }

    //% blockId=Soil_Moisture_Sensor_Digital block="Soil Moisture Sensor at %pin digital value"
    //% group="Soil Moisture Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function mySoilMoistureSensor_digitalValue(pin: MyDigitalPin): boolean {
        return pins.digitalReadPin(pin) == 1 ? true : false;
    }

    //% blockId=Soil_Moisture_Sensor_Analog block="Soil Moisture Sensor at %pin analog value"
    //% group="Soil Moisture Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    export function mySoilMoistureSensor_analogValue(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Infrared_Obstacle_Avoidance_Sensor block="Infrared Obstacle Avoidance Sensor at %pin digital value"
    //% group="Infrared Obstacle Avoidance Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myInfrared_Obstacle_Avoidance_Sensor(pin: MyDigitalPin): boolean {
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Relay block="Relay at %pin is %status"   group="Relay"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myRelay(pin: MyDigitalPin, status: RELAY): void {
        pins.digitalWritePin(pin, status)
    }

    //% blockId=Ultrasonic_Sensor block="Ultrasonic Sensor ECHO at %epin TRIG at is %tpin get distance in %unit"
    //% group="Ultrasonic Sensor"
    //% epin.fieldEditor=pinpicker
    //% epin.fieldOptions.columns=4
    //% tpin.fieldEditor=pinpicker
    //% tpin.fieldOptions.columns=4
    //% epin.defl=MyDigitalPin.P0
    //% tpin.defl=MyDigitalPin.P1
    export function UltrasonicDistance(epin: MyDigitalPin, tpin: MyDigitalPin, unit: DistanceUnit): number {
        // send pulse
        pins.setPull(tpin, PinPullMode.PullNone)
        pins.digitalWritePin(tpin, 0)
        control.waitMicros(2)
        pins.digitalWritePin(tpin, 1)
        control.waitMicros(10)
        pins.digitalWritePin(tpin, 0)

        // read pulse
        let d = pins.pulseIn(epin, PulseValue.High)
        let distance = d / 58

        if (distance > 500) {
            distance = 500
        }

        switch (unit) {
            case 0:
                return Math.floor(distance)  //cm
                break
            case 1:
                return Math.floor(distance / 254)   //inch
                break
            default:
                return 500
        }
    } 

    // LCD1602 @start
    let i2cAddr: number // 0x27: PCF8574
    let BK: number      // backlight control
    let RS: number      // command/data
    let Custom_Char: number[][] = []

    // set LCD reg
    function setreg(d: number) {
        pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE)
        basic.pause(1)
    }

    // send data to I2C bus
    function set(d: number) {
        d = d & 0xF0
        d = d + BK + RS
        setreg(d)
        setreg(d + 4)
        setreg(d)
    }

    // send command
    function cmd(d: number) {
        RS = 0
        set(d)
        set(d << 4)
    }

    // send data
    function dat(d: number) {
        RS = 1
        set(d)
        set(d << 4)
    }

    //% blockId="LCD1602_Clear" block="LCD1602 clear screen"
    //% group="LCD1602"
    export function LCD1602_Clear(): void {
        cmd(0x01)
    }

    //% blockId="LCD1602_shl" block="LCD1602 shift left"
    //% group="LCD1602"
    export function LCD1602_shl(): void {
        cmd(0x18)
    }

    //% blockId="LCD1602_shr" block="LCD1602 shift right"
    //% group="LCD1602"
    export function LCD1602_shr(): void {
        cmd(0x1C)
    }

    //% blockId="LCD1602_Makecharacter"
    //% block="LCD1602 create custom character %char_index|%im"
    //% group="LCD1602"
    export function LCD1602_CreateCharacter(char_index: CharIndex, im: Image): void {
        const customChar = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 5; x++) {
                if (im.pixel(x, y)) {
                    customChar[y] |= 1 << (4 - x)
                }
            }
        }
        Custom_Char[char_index] = customChar;
    }

    //% blockId="LCD1602_Characterpixels"
    //% block="Custom character"
    //% imageLiteral=1
    //% imageLiteralColumns=5
    //% imageLiteralRows=8
    //% imageLiteralScale=0.6
    //% shim=images::createImage
    //% group="LCD1602"
    export function LCD1602_CharacterPixels(i: string): Image {
        return <Image><any>i;
    }


    //% blockId="LCD1602_Showchararacter"
    //% block="LCD1602 at (x:|%x|,y:|%y) show custom character|%char_index"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% group="LCD1602"
    export function LCD1602_Showchararacter(x: number, y: number, char_index: CharIndex): void {
        let a: number
        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(0x40 | (char_index << 3));
        for (let y = 0; y < 8; y++) {
            dat(Custom_Char[char_index][y]);
        }
        cmd(a)
        dat(char_index)

    }

    //% blockId="LCD1602_ShowString" block="LCD1602 at (x:|%x|,y:|%y) show string|%s|"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% s.defl="Hello,Acebott!"
    //% group="LCD1602"
    export function LCD1602_ShowString(x: number, y: number, s: string): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(a)

        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i))
        }
    }

    //% blockId="LCD16202_ShowNumber" block="LCD1602 at (x:|%x|,y:|%y) show number|%n|"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% group="LCD1602"
    export function LCD1602_ShowNumber(x: number, y: number, n: number): void {
        let s = n.toString()
        LCD1602_ShowString(x, y, s)
    }

    //% blockId="LCD1602_Init" block="LCD1602 initialization"
    //% group="LCD1602"
    export function LCD1602_Init(): void {
        i2cAddr = 39
        BK = 8
        RS = 0
        cmd(0x33)       // set 4bit mode
        basic.pause(5)
        set(0x30)
        basic.pause(5)
        set(0x20)
        basic.pause(5)
        cmd(0x28)       // set mode
        cmd(0x0C)
        cmd(0x06)
        cmd(0x01)       // clear
    }
    // LCD1602 @end

    // SH1106 OLED驱动 (128x64)
    // 屏幕参数
    const WIDTH = 128
    const HEIGHT = 64
    const PAGES = HEIGHT / 8  // 共8页（每页8行像素）
    let addr: number = 0x3C    // 默认I2C地址（可改为0x3D）
    const COLUMN_OFFSET = 2  // 根据校准结果调整（0或2）

    // 初始化屏幕

    //% blockId="OLED_Init" block="OLED initialization"
    //% group="OLED"
    export function oledInit(i2cAddr: number = 0x3C): void{
        addr = i2cAddr
        const cmds = [
            0xAE,       // 关闭显示
            0x00, 0x10, // 列地址低/高4位
            0x40,       // 显示起始行
            0x81, 0xCF, // 对比度
            // 关键调整：段重映射（左右方向）
            0xA1,       // 0xA0=正常X轴；0xA1=X轴翻转（左右反）
            // 关键调整：行重映射（上下方向）
            0xC8,       // 0xC0=正常Y轴；0xC8=Y轴翻转（上下反）
            0xA6,       // 正常显示（非反显）
            0xA8, 0x3F, // 多路复用率
            0xD3, 0x00, // 显示偏移
            0xD5, 0x80, // 时钟配置
            0xD9, 0xF1, // 预充电周期
            0xDA, 0x12, // COM引脚配置
            0xDB, 0x40, // VCOMH
            0x20, 0x02, // 页地址模式
            0xA4,       // 全屏显示
            0xAF        // 开启显示
        ]
        for (const cmd of cmds) {
            writeCmd(cmd)
        }
        oledClear()
    }

    // 清屏
    //% blockId="OLED_Clear" block="OLED Clear"
    //% group="OLED"
    export function oledClear(): void {
        for (let page = 0; page < PAGES; page++) {
            setPage(page)          // 切换到当前页
            setColumn(0)           // 从第0列开始
            const buf = Buffer.create(WIDTH) // 生成128字节的空数据（0x00）
            writeData(buf)
        }
    }

    // 设置显示位置（页地址模式）
    function setPage(page: number) {
        if (page >= 0 && page < PAGES) {
            writeCmd(0xB0 + page) // 页地址指令（0xB0-0xB7）
        }
    }

    function setColumn(col: number) {
        if (col < 0 || col >= WIDTH) return
        const realCol = col + COLUMN_OFFSET // 应用偏移
        writeCmd(0x00 + (realCol & 0x0F))
        writeCmd(0x10 + ((realCol >> 4) & 0x0F))
    }

    // 发送命令
    function writeCmd(cmd: number) {
        pins.i2cWriteNumber(addr, 0x00 << 8 | cmd, NumberFormat.Int16BE)
    }

    // 发送数据
    function writeData(data: Buffer) {
        const buf = Buffer.create(data.length + 1)
        buf[0] = 0x40 // 数据控制位（0x40表示后续为数据）
        // 手动复制data到buf的第1位开始
        for (let i = 0; i < data.length; i++) {
            buf[i + 1] = data[i]
        }
        pins.i2cWriteBuffer(addr, buf)
    }

    // 绘制单个像素（x:0-127, y:0-63）
    //% blockId="OLED_drawPixel" block="OLED draw pixel at (%x %y) is %on"
    //% group="OLED"
    export function oledDrawPixel(x: number, y: number, on: boolean = true) {
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return
        const page = Math.floor(y / 8)    // 所在页（0-7）
        // 若Y轴显示颠倒，将bit改为：7 - (y % 8)
        const bit = y % 8                 // 页内bit位置（0-7）
        setPage(page)
        setColumn(x)

        // 读取当前页该列的原始数据（避免覆盖其他像素）
        // （优化：先读取再修改，而非直接覆盖）
        const readBuf = pins.i2cReadBuffer(addr, 1) // 读取当前位置1字节
        let original = readBuf[0]
        // 根据on状态设置/清除对应bit
        const newData = on ? (original | (0x01 << bit)) : (original & ~(0x01 << bit))
        const buf = Buffer.create(1)
        buf[0] = newData
        writeData(buf)
    }

    // 显示字符（8x8点阵，x:列, page:页）
    //% blockId="OLED_drawChar" block="OLED draw char at (%x %y) is %c"
    //% group="OLED"
    export function drawChar(x: number, page: number, c: string): void {
        if (x >= WIDTH || page >= PAGES) return
        const code = c.charCodeAt(0) - 0x20 // 计算ASCII偏移（空格开始）
        if (code < 0 || code >= font8x8.length) return
        const charData = font8x8[code]      // 获取字模数据
        setPage(page)
        setColumn(x)
        // 手动创建数据Buffer
        const dataBuf = Buffer.create(charData.length)
        for (let i = 0; i < charData.length; i++) {
            dataBuf[i] = charData[i]
        }
        writeData(dataBuf)
    }

    // 显示字符串（自动换行，8x8字体）
    //% blockId="OLED_drawString" block="OLED draw string at (%x %page) is %str"
    //% group="OLED"
    export function drawString(x: number, page: number, str: string) {
        let col = x
        let p = page
        for (const c of str) {
            if (col + 8 > WIDTH) { // 超出屏幕宽度则换行
                col = 0
                p++
                if (p >= PAGES) return // 超出屏幕高度则停止
            }
            drawChar(col, p, c)
            col += 8 // 每个字符占8列
        }
    }

    // 8x8字库（ASCII 32-126，共95个字符）
    const font8x8 = [
        [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], // 空格 (32)
        [0x00, 0x00, 0x5F, 0x00, 0x00, 0x00, 0x00, 0x00], // !
        [0x00, 0x00, 0x07, 0x00, 0x07, 0x00, 0x00, 0x00], // "
        [0x00, 0x14, 0x7F, 0x14, 0x7F, 0x14, 0x00, 0x00], // #
        [0x00, 0x24, 0x2A, 0x7F, 0x2A, 0x12, 0x00, 0x00], // $
        [0x00, 0x62, 0x64, 0x08, 0x13, 0x23, 0x00, 0x00], // %
        [0x00, 0x36, 0x49, 0x55, 0x22, 0x50, 0x00, 0x00], // &
        [0x00, 0x00, 0x05, 0x03, 0x00, 0x00, 0x00, 0x00], // '
        [0x00, 0x00, 0x1C, 0x22, 0x41, 0x00, 0x00, 0x00], // (
        [0x00, 0x00, 0x41, 0x22, 0x1C, 0x00, 0x00, 0x00], // )
        [0x00, 0x14, 0x08, 0x3E, 0x08, 0x14, 0x00, 0x00], // *
        [0x00, 0x08, 0x08, 0x3E, 0x08, 0x08, 0x00, 0x00], // +
        [0x00, 0x00, 0x00, 0xA0, 0x60, 0x00, 0x00, 0x00], // ,
        [0x00, 0x08, 0x08, 0x08, 0x08, 0x08, 0x00, 0x00], // -
        [0x00, 0x00, 0x60, 0x60, 0x00, 0x00, 0x00, 0x00], // .
        [0x00, 0x20, 0x10, 0x08, 0x04, 0x02, 0x00, 0x00], // /
        [0x00, 0x3E, 0x51, 0x49, 0x45, 0x3E, 0x00, 0x00], // 0
        [0x00, 0x00, 0x42, 0x7F, 0x40, 0x00, 0x00, 0x00], // 1
        [0x00, 0x42, 0x61, 0x51, 0x49, 0x46, 0x00, 0x00], // 2
        [0x00, 0x21, 0x41, 0x45, 0x4B, 0x31, 0x00, 0x00], // 3
        [0x00, 0x18, 0x14, 0x12, 0x7F, 0x10, 0x00, 0x00], // 4
        [0x00, 0x27, 0x45, 0x45, 0x45, 0x39, 0x00, 0x00], // 5
        [0x00, 0x3C, 0x4A, 0x49, 0x49, 0x30, 0x00, 0x00], // 6
        [0x00, 0x01, 0x71, 0x09, 0x05, 0x03, 0x00, 0x00], // 7
        [0x00, 0x36, 0x49, 0x49, 0x49, 0x36, 0x00, 0x00], // 8
        [0x00, 0x06, 0x49, 0x49, 0x29, 0x1E, 0x00, 0x00], // 9
        [0x00, 0x00, 0x36, 0x36, 0x00, 0x00, 0x00, 0x00], // :
        [0x00, 0x00, 0x56, 0x36, 0x00, 0x00, 0x00, 0x00], // ;
        [0x00, 0x08, 0x14, 0x22, 0x41, 0x00, 0x00, 0x00], // <
        [0x00, 0x14, 0x14, 0x14, 0x14, 0x14, 0x00, 0x00], // =
        [0x00, 0x41, 0x22, 0x14, 0x08, 0x00, 0x00, 0x00], // >
        [0x00, 0x02, 0x01, 0x51, 0x09, 0x06, 0x00, 0x00], // ?
        [0x00, 0x32, 0x49, 0x79, 0x41, 0x3E, 0x00, 0x00], // @
        [0x00, 0x7E, 0x11, 0x11, 0x11, 0x7E, 0x00, 0x00], // A
        [0x00, 0x7F, 0x49, 0x49, 0x49, 0x36, 0x00, 0x00], // B
        [0x00, 0x3E, 0x41, 0x41, 0x41, 0x22, 0x00, 0x00], // C
        [0x00, 0x7F, 0x41, 0x41, 0x22, 0x1C, 0x00, 0x00], // D
        [0x00, 0x7F, 0x49, 0x49, 0x49, 0x41, 0x00, 0x00], // E
        [0x00, 0x7F, 0x09, 0x09, 0x09, 0x01, 0x00, 0x00], // F
        [0x00, 0x3E, 0x41, 0x49, 0x49, 0x7A, 0x00, 0x00], // G
        [0x00, 0x7F, 0x08, 0x08, 0x08, 0x7F, 0x00, 0x00], // H
        [0x00, 0x00, 0x41, 0x7F, 0x41, 0x00, 0x00, 0x00], // I
        [0x00, 0x20, 0x40, 0x41, 0x3F, 0x01, 0x00, 0x00], // J
        [0x00, 0x7F, 0x08, 0x14, 0x22, 0x41, 0x00, 0x00], // K
        [0x00, 0x7F, 0x40, 0x40, 0x40, 0x40, 0x00, 0x00], // L
        [0x00, 0x7F, 0x02, 0x0C, 0x02, 0x7F, 0x00, 0x00], // M
        [0x00, 0x7F, 0x04, 0x08, 0x10, 0x7F, 0x00, 0x00], // N
        [0x00, 0x3E, 0x41, 0x41, 0x41, 0x3E, 0x00, 0x00], // O
        [0x00, 0x7F, 0x09, 0x09, 0x09, 0x06, 0x00, 0x00], // P
        [0x00, 0x3E, 0x41, 0x51, 0x21, 0x5E, 0x00, 0x00], // Q
        [0x00, 0x7F, 0x09, 0x19, 0x29, 0x46, 0x00, 0x00], // R
        [0x00, 0x46, 0x49, 0x49, 0x49, 0x31, 0x00, 0x00], // S
        [0x00, 0x01, 0x01, 0x7F, 0x01, 0x01, 0x00, 0x00], // T
        [0x00, 0x3F, 0x40, 0x40, 0x40, 0x3F, 0x00, 0x00], // U
        [0x00, 0x1F, 0x20, 0x40, 0x20, 0x1F, 0x00, 0x00], // V
        [0x00, 0x3F, 0x40, 0x30, 0x40, 0x3F, 0x00, 0x00], // W
        [0x00, 0x63, 0x14, 0x08, 0x14, 0x63, 0x00, 0x00], // X
        [0x00, 0x07, 0x08, 0x70, 0x08, 0x07, 0x00, 0x00], // Y
        [0x00, 0x61, 0x51, 0x49, 0x45, 0x43, 0x00, 0x00], // Z
        [0x00, 0x00, 0x7F, 0x41, 0x41, 0x00, 0x00, 0x00], // [
        [0x00, 0x02, 0x04, 0x08, 0x10, 0x20, 0x00, 0x00], // \
        [0x00, 0x00, 0x41, 0x41, 0x7F, 0x00, 0x00, 0x00], // ]
        [0x00, 0x04, 0x02, 0x01, 0x02, 0x04, 0x00, 0x00], // ^
        [0x00, 0x40, 0x40, 0x40, 0x40, 0x40, 0x00, 0x00], // _
        [0x00, 0x00, 0x01, 0x02, 0x04, 0x00, 0x00, 0x00], // `
        [0x00, 0x20, 0x54, 0x54, 0x54, 0x78, 0x00, 0x00], // a
        [0x00, 0x7F, 0x48, 0x44, 0x44, 0x38, 0x00, 0x00], // b
        [0x00, 0x38, 0x44, 0x44, 0x44, 0x20, 0x00, 0x00], // c
        [0x00, 0x38, 0x44, 0x44, 0x48, 0x7F, 0x00, 0x00], // d
        [0x00, 0x38, 0x54, 0x54, 0x54, 0x18, 0x00, 0x00], // e
        [0x00, 0x08, 0x7E, 0x09, 0x01, 0x02, 0x00, 0x00], // f
        [0x00, 0x18, 0xA4, 0xA4, 0xA4, 0x7C, 0x00, 0x00], // g
        [0x00, 0x7F, 0x08, 0x04, 0x04, 0x78, 0x00, 0x00], // h
        [0x00, 0x00, 0x44, 0x7D, 0x40, 0x00, 0x00, 0x00], // i
        [0x00, 0x40, 0x80, 0x84, 0x7D, 0x00, 0x00, 0x00], // j
        [0x00, 0x7F, 0x10, 0x28, 0x44, 0x00, 0x00, 0x00], // k
        [0x00, 0x00, 0x41, 0x7F, 0x40, 0x00, 0x00, 0x00], // l
        [0x00, 0x7C, 0x04, 0x78, 0x04, 0x78, 0x00, 0x00], // m
        [0x00, 0x7C, 0x08, 0x04, 0x04, 0x78, 0x00, 0x00], // n
        [0x00, 0x38, 0x44, 0x44, 0x44, 0x38, 0x00, 0x00], // o
        [0x00, 0xFC, 0x24, 0x24, 0x24, 0x18, 0x00, 0x00], // p
        [0x00, 0x18, 0x24, 0x24, 0x24, 0xFC, 0x00, 0x00], // q
        [0x00, 0x7C, 0x08, 0x04, 0x04, 0x08, 0x00, 0x00], // r
        [0x00, 0x48, 0x54, 0x54, 0x54, 0x20, 0x00, 0x00], // s
        [0x00, 0x04, 0x3F, 0x44, 0x40, 0x20, 0x00, 0x00], // t
        [0x00, 0x3C, 0x40, 0x40, 0x20, 0x7C, 0x00, 0x00], // u
        [0x00, 0x1C, 0x20, 0x40, 0x20, 0x1C, 0x00, 0x00], // v
        [0x00, 0x3C, 0x40, 0x30, 0x40, 0x3C, 0x00, 0x00], // w
        [0x00, 0x44, 0x28, 0x10, 0x28, 0x44, 0x00, 0x00], // x
        [0x00, 0x1C, 0xA0, 0xA0, 0xA0, 0x7C, 0x00, 0x00], // y
        [0x00, 0x44, 0x64, 0x54, 0x4C, 0x44, 0x00, 0x00], // z
        [0x00, 0x00, 0x08, 0x36, 0x41, 0x00, 0x00, 0x00], // {
        [0x00, 0x00, 0x00, 0x7F, 0x00, 0x00, 0x00, 0x00], // |
        [0x00, 0x00, 0x41, 0x36, 0x08, 0x00, 0x00, 0x00], // }
        [0x00, 0x02, 0x01, 0x01, 0x02, 0x01, 0x00, 0x00], // ~
    ]
}

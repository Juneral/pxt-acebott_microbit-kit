const enum OLEDDisplayMode{
    //% block="Normal"
    Normal = 0,
    //% block="Inverse"
    Inverse = 1
}

const enum OLEDFontSize{
    //% block="5x7"
    Font5x7 = 0,
    //% block="8x11"
    Font8x11 = 1,
    //% block="12x12"
    Font12x12 = 2
}

const enum OLEDNumberSize {
    //% block="3x5"
    Font3x5 = 0,
    //% block="8x11"
    Font5x7 = 1,
    //% block="12x12"
    Font8x11 = 2
}

// SH1106 OLED驱动 (128x64)
class SH1106{

    private SH1106_ADDR : number
    private screen : Buffer
    private charset: number[][]
    private charsetIndex: string[]

    constructor(addr: number = 0x3C) {
        this.SH1106_ADDR = addr
        this.screen = pins.createBuffer(1025) // 128x64 / 8 = 1024 + 1 command byte
        this.charset = []
        this.charsetIndex = []
    }

    // SH1106 command functions
    cmd1(cmd1: number): void {
        let buffer = pins.createBuffer(2)
        buffer[0] = 0x00  // Co=0, D/C=0
        buffer[1] = cmd1
        pins.i2cWriteBuffer(this.SH1106_ADDR, buffer)
    }

    cmd2(cmd1: number, cmd2: number): void {
        let buffer = pins.createBuffer(3)
        buffer[0] = 0x00
        buffer[1] = cmd1
        buffer[2] = cmd2
        pins.i2cWriteBuffer(this.SH1106_ADDR, buffer)
    }

    cmd3(cmd1: number, cmd2: number, cmd3: number): void {
        let buffer = pins.createBuffer(4)
        buffer[0] = 0x00
        buffer[1] = cmd1
        buffer[2] = cmd2
        buffer[3] = cmd3
        pins.i2cWriteBuffer(this.SH1106_ADDR, buffer)
    }

    showbit(bit: number, shift: number): number {
        if (bit & (1 << shift)) { }
        else {
            bit += 1 << shift
        }
        return bit
    }

    hidebit(bit: number, shift: number): number {
        if (bit & (1 << shift)) {
            bit -= 1 << shift
        }
        return bit
    }

    getbit(bits: number, shift: number): number {
        return (bits >> shift) & 1;
    }

    /**
     * Initialize SH1106 OLED display, this command must be called at the start of the program.
     */
    init(): void {
        // SH1106 initialization sequence
        this.cmd1(0xAE)       // Display OFF
        this.cmd1(0xA4)       // Display follows RAM content
        this.cmd2(0xD5, 0x80) // Set display clock divide ratio/oscillator frequency
        this.cmd2(0xA8, 0x3F) // Set multiplex ratio (1 to 64)
        this.cmd2(0xD3, 0x00) // Set display offset
        this.cmd1(0x40)       // Set display start line
        this.cmd2(0x8D, 0x14) // Enable charge pump regulator
        this.cmd2(0x20, 0x00) // Set memory addressing mode to horizontal
        this.cmd1(0xA0)       // Set segment re-map
        this.cmd1(0xC0)       // Set COM output scan direction
        this.cmd2(0xDA, 0x12) // Set COM pins hardware configuration
        this.cmd2(0x81, 0x80) // Set contrast control
        this.cmd2(0xD9, 0x22) // Set pre-charge period
        this.cmd2(0xDB, 0x20) // Set VCOMH deselect level
        this.cmd1(0xA6)       // Set normal display (not inverted)
        this.cmd1(0xAF)       // Display ON
        this.clearScreen(false)
        this.setOrientation(true, true)
        this.refresh()
    }

    /**
     * Sets the contrast level to the specified value.
     * @param contrast contrast level, eg: 128
     */
    setContrast(contrast: number): void {
        this.cmd2(0x81, contrast)
    }

    /**
     * Fills the display buffer with specified color.
     * You need to call `draw` to see the changes.
     * @param color filling color (usually `false`)
     */
    clearScreen(color: boolean): void {
        this.screen.fill((color) ? 0xFF : 0)
    }

    /**
     * Sends buffer to SH1106 OLED display.
     * This command must be called whenever you want to show something on the OLED display.
     */
    refresh(): void {
        // SH1106 requires page-by-page writing with column address setting
        for (let page = 0; page < 8; page++) {
            // Set page address
            this.cmd1(0xB0 + page)
            // Set lower column address (start at 2 for 128x64 displays to center the image)
            this.cmd1(0x02)
            // Set higher column address
            this.cmd1(0x10)

            // Prepare data buffer for this page (128 bytes + 1 command byte)
            let pageBuffer = pins.createBuffer(129)
            pageBuffer[0] = 0x40  // Co=0, D/C=1 (data)

            // Copy page data from screen buffer
            for (let col = 0; col < 128; col++) {
                pageBuffer[col + 1] = this.screen[page * 128 + col + 1]
            }

            pins.i2cWriteBuffer(this.SH1106_ADDR, pageBuffer)
        }
    }

    /**
     * Sets pixel at x y to specified color color.
     * You need to call `draw` to see the changes.
     * @param x coordinate x (increases towards the right)
     * @param y coordinate y (increases downwards)
     * @param color color of pixel
     */
    setPixel(x: number, y: number, color: boolean): void {
    const index = Math.round(Math.floor(y / 8) * 128 + x + 1)
    if ((index < 1025) && (index > -1) && (x < 128) && (x > -1) && (y > -1) && (y < 64)) {
        this.screen[index] = (color) ? this.showbit(this.screen[index], (y % 8)) : this.hidebit(this.screen[index], (y % 8))
    }
}

    /**
     * Toggles pixel at x y, it means that `true` will be `false` and vice versa.
     * You need to call `draw` to see the changes.
     * @param x coordinate x (increases towards the right)
     * @param y coordinate y (increases downwards)
     */
    togglePixel(x: number, y: number): void {
        const index = Math.round(Math.floor(y / 8) * 128 + x + 1)
        if ((index < 1025) && (index > -1) && (x < 128) && (x > -1) && (y > -1) && (y < 64)) {
            this.screen[index] = (!this.getPixel(x, y)) ? this.showbit(this.screen[index], (y % 8)) : this.hidebit(this.screen[index], (y % 8))
        }
    }

    /**
     * Returns color of pixel at x y in buffer.
     * @param x coordinate x (increases towards the right)
     * @param y coordinate y (increases downwards)
     */
    getPixel(x: number, y: number): boolean {
        const index = Math.round(Math.floor(y / 8) * 128 + x + 1)
        if ((index < 1025) && (index > -1) && (x < 128) && (x > -1) && (y > -1) && (y < 64)) {
            return this.getbit(this.screen[index], (y % 8)) == 1
        } else {
            return false
        }
    }

    draw5x7Text(text: string, x: number, y: number, color: boolean): void {
        const font5x7 = [
            [0x00, 0x00, 0x00, 0x00, 0x00], // 空格 (32)
            [0x00, 0x00, 0x5F, 0x00, 0x00], // !
            [0x00, 0x07, 0x00, 0x07, 0x00], // "
            [0x14, 0x7F, 0x14, 0x7F, 0x14], // #
            [0x24, 0x2A, 0x7F, 0x2A, 0x12], // $
            [0x23, 0x13, 0x08, 0x64, 0x62], // %
            [0x36, 0x49, 0x55, 0x22, 0x50], // &
            [0x00, 0x05, 0x03, 0x00, 0x00], // '
            [0x00, 0x1C, 0x22, 0x41, 0x00], // (
            [0x00, 0x41, 0x22, 0x1C, 0x00], // )
            [0x14, 0x08, 0x3E, 0x08, 0x14], // *
            [0x08, 0x08, 0x3E, 0x08, 0x08], // +
            [0x00, 0x50, 0x30, 0x00, 0x00], // ,
            [0x08, 0x08, 0x08, 0x08, 0x08], // -
            [0x00, 0x60, 0x60, 0x00, 0x00], // .
            [0x20, 0x10, 0x08, 0x04, 0x02], // /
            [0x3E, 0x51, 0x49, 0x45, 0x3E], // 0
            [0x00, 0x42, 0x7F, 0x40, 0x00], // 1
            [0x42, 0x61, 0x51, 0x49, 0x46], // 2
            [0x21, 0x41, 0x45, 0x4B, 0x31], // 3
            [0x18, 0x14, 0x12, 0x7F, 0x10], // 4
            [0x27, 0x45, 0x45, 0x45, 0x39], // 5
            [0x3C, 0x4A, 0x49, 0x49, 0x30], // 6
            [0x01, 0x71, 0x09, 0x05, 0x03], // 7
            [0x36, 0x49, 0x49, 0x49, 0x36], // 8
            [0x06, 0x49, 0x49, 0x29, 0x1E], // 9
            [0x00, 0x36, 0x36, 0x00, 0x00], // :
            [0x00, 0x56, 0x36, 0x00, 0x00], // ;
            [0x08, 0x14, 0x22, 0x41, 0x00], // <
            [0x14, 0x14, 0x14, 0x14, 0x14], // =
            [0x00, 0x41, 0x22, 0x14, 0x08], // >
            [0x02, 0x01, 0x51, 0x09, 0x06], // ?
            [0x32, 0x49, 0x79, 0x41, 0x3E], // @
            [0x7E, 0x11, 0x11, 0x11, 0x7E], // A
            [0x7F, 0x49, 0x49, 0x49, 0x36], // B
            [0x3E, 0x41, 0x41, 0x41, 0x22], // C
            [0x7F, 0x41, 0x41, 0x22, 0x1C], // D
            [0x7F, 0x49, 0x49, 0x49, 0x41], // E
            [0x7F, 0x09, 0x09, 0x09, 0x01], // F
            [0x3E, 0x41, 0x49, 0x49, 0x7A], // G
            [0x7F, 0x08, 0x08, 0x08, 0x7F], // H
            [0x00, 0x41, 0x7F, 0x41, 0x00], // I
            [0x20, 0x40, 0x41, 0x3F, 0x01], // J
            [0x7F, 0x08, 0x14, 0x22, 0x41], // K
            [0x7F, 0x40, 0x40, 0x40, 0x40], // L
            [0x7F, 0x02, 0x0C, 0x02, 0x7F], // M
            [0x7F, 0x04, 0x08, 0x10, 0x7F], // N
            [0x3E, 0x41, 0x41, 0x41, 0x3E], // O
            [0x7F, 0x09, 0x09, 0x09, 0x06], // P
            [0x3E, 0x41, 0x51, 0x21, 0x5E], // Q
            [0x7F, 0x09, 0x19, 0x29, 0x46], // R
            [0x46, 0x49, 0x49, 0x49, 0x31], // S
            [0x01, 0x01, 0x7F, 0x01, 0x01], // T
            [0x3F, 0x40, 0x40, 0x40, 0x3F], // U
            [0x1F, 0x20, 0x40, 0x20, 0x1F], // V
            [0x3F, 0x40, 0x38, 0x40, 0x3F], // W
            [0x63, 0x14, 0x08, 0x14, 0x63], // X
            [0x07, 0x08, 0x70, 0x08, 0x07], // Y
            [0x61, 0x51, 0x49, 0x45, 0x43], // Z
            [0x00, 0x7F, 0x41, 0x41, 0x00], // [
            [0x02, 0x04, 0x08, 0x10, 0x20], // \
            [0x00, 0x41, 0x41, 0x7F, 0x00], // ]
            [0x04, 0x02, 0x01, 0x02, 0x04], // ^
            [0x40, 0x40, 0x40, 0x40, 0x40], // _
            [0x00, 0x01, 0x02, 0x04, 0x00], // `
            [0x20, 0x54, 0x54, 0x54, 0x78], // a
            [0x7F, 0x48, 0x44, 0x44, 0x38], // b
            [0x38, 0x44, 0x44, 0x44, 0x20], // c
            [0x38, 0x44, 0x44, 0x48, 0x7F], // d
            [0x38, 0x54, 0x54, 0x54, 0x18], // e
            [0x08, 0x7E, 0x09, 0x01, 0x02], // f
            [0x0C, 0x52, 0x52, 0x52, 0x3E], // g
            [0x7F, 0x08, 0x04, 0x04, 0x78], // h
            [0x00, 0x44, 0x7D, 0x40, 0x00], // i
            [0x20, 0x40, 0x44, 0x3D, 0x00], // j
            [0x7F, 0x10, 0x28, 0x44, 0x00], // k
            [0x00, 0x41, 0x7F, 0x40, 0x00], // l
            [0x7C, 0x04, 0x18, 0x04, 0x78], // m
            [0x7C, 0x08, 0x04, 0x04, 0x78], // n
            [0x38, 0x44, 0x44, 0x44, 0x38], // o
            [0x7C, 0x14, 0x14, 0x14, 0x08], // p
            [0x08, 0x14, 0x14, 0x18, 0x7C], // q
            [0x7C, 0x08, 0x04, 0x04, 0x08], // r
            [0x48, 0x54, 0x54, 0x54, 0x20], // s
            [0x04, 0x3F, 0x44, 0x40, 0x20], // t
            [0x3C, 0x40, 0x40, 0x20, 0x7C], // u
            [0x1C, 0x20, 0x40, 0x20, 0x1C], // v
            [0x3C, 0x40, 0x30, 0x40, 0x3C], // w
            [0x44, 0x28, 0x10, 0x28, 0x44], // x
            [0x0C, 0x50, 0x50, 0x50, 0x3C], // y
            [0x44, 0x64, 0x54, 0x4C, 0x44], // z
            [0x00, 0x08, 0x36, 0x41, 0x00], // {
            [0x00, 0x00, 0x7F, 0x00, 0x00], // |
            [0x00, 0x41, 0x36, 0x08, 0x00], // }
            [0x10, 0x08, 0x08, 0x10, 0x08]  // ~
        ]

        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i)
            if (charCode >= 32 && charCode <= 126) {
                const charData = font5x7[charCode - 32]
                for (let col = 0; col < 5; col++) {
                    for (let row = 0; row < 7; row++) {
                        if (charData[col] & (1 << row)) {
                            this.setPixel(x + i * 6 + col, y + row, color)
                        }
                    }
                }
            }
        }
    }

    draw5x7AsciiTextWithMode(text: string, x: number, y: number, mode: OLEDDisplayMode): void {
        const textWidth = text.length * 6
        const textHeight = 8

        switch (mode) {
            case OLEDDisplayMode.Normal:
                this.draw5x7Text(text, x, y, true)
                break

            case OLEDDisplayMode.Inverse:
                this.drawRect(x, y-1, x + textWidth, y + textHeight-1, true, true, false)
                this.draw5x7Text(text, x+1, y, false)
                break  
        }
    }

    /**
     * Draws text with upper left corner at x y.
     * Text has fixed width (8 px).
     * You need to call `draw` to see the changes.
     * @param text text to draw (not all characters are implemented yet)
     * @param x coordinate x of upper left corner of text (increases towards the right)
     * @param y coordinate y of upper left corner of text (increases downwards)
     * @param color color of text
     * @param toggle sets whether to use pixel switching instead of setting the pixel to a specific color (if `true`, `color` means nothing)
     */
    draw8x11Text(text: string, x: number, y: number, color: boolean): void {
        const font = [
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x10, 0x10, 0x10, 0x10, 0x10, 0x00, 0x10, 0x10, 0x00, 0x00],
            [0x24, 0x24, 0x24, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x24, 0x24, 0x7E, 0x24, 0x7E, 0x24, 0x24, 0x00, 0x00, 0x00],
            [0x00, 0x08, 0x1C, 0x2A, 0x18, 0x0C, 0x2A, 0x1C, 0x08, 0x00, 0x00],
            [0x00, 0x24, 0x5C, 0x28, 0x08, 0x10, 0x14, 0x2A, 0x24, 0x00, 0x00],
            [0x00, 0x10, 0x28, 0x28, 0x10, 0x2A, 0x44, 0x44, 0x3A, 0x00, 0x00],
            [0x08, 0x08, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x04, 0x08, 0x08, 0x10, 0x10, 0x10, 0x10, 0x08, 0x08, 0x04, 0x00],
            [0x20, 0x10, 0x10, 0x08, 0x08, 0x08, 0x08, 0x10, 0x10, 0x20, 0x00],
            [0x00, 0x08, 0x2A, 0x1C, 0x1C, 0x2A, 0x08, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x08, 0x08, 0x3E, 0x08, 0x08, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x08, 0x10, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x18, 0x00, 0x00],
            [0x04, 0x04, 0x08, 0x08, 0x08, 0x10, 0x10, 0x10, 0x20, 0x20, 0x00],
            [0x00, 0x1C, 0x22, 0x22, 0x22, 0x22, 0x22, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x08, 0x18, 0x28, 0x08, 0x08, 0x08, 0x08, 0x3E, 0x00, 0x00],
            [0x00, 0x1C, 0x22, 0x02, 0x04, 0x08, 0x10, 0x20, 0x3E, 0x00, 0x00],
            [0x00, 0x1C, 0x22, 0x02, 0x0C, 0x02, 0x02, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x04, 0x0C, 0x14, 0x14, 0x24, 0x3E, 0x04, 0x04, 0x00, 0x00],
            [0x00, 0x3E, 0x20, 0x20, 0x3C, 0x22, 0x02, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x0C, 0x10, 0x20, 0x3C, 0x22, 0x22, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x3E, 0x02, 0x04, 0x08, 0x08, 0x10, 0x10, 0x10, 0x00, 0x00],
            [0x00, 0x1C, 0x22, 0x22, 0x1C, 0x22, 0x22, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x1C, 0x22, 0x22, 0x22, 0x1E, 0x02, 0x04, 0x18, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x10, 0x10, 0x00, 0x00, 0x10, 0x10, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x10, 0x10, 0x00, 0x00, 0x10, 0x10, 0x20, 0x00],
            [0x00, 0x00, 0x04, 0x08, 0x10, 0x20, 0x10, 0x08, 0x04, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x7E, 0x00, 0x7E, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x20, 0x10, 0x08, 0x04, 0x08, 0x10, 0x20, 0x00, 0x00],
            [0x00, 0x38, 0x44, 0x08, 0x10, 0x10, 0x00, 0x10, 0x10, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x4E, 0x52, 0x52, 0x4E, 0x40, 0x3C, 0x00, 0x00],
            [0x00, 0x18, 0x24, 0x42, 0x42, 0x7E, 0x42, 0x42, 0x42, 0x00, 0x00],
            [0x00, 0x7C, 0x42, 0x42, 0x7C, 0x42, 0x42, 0x42, 0x7C, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x40, 0x40, 0x40, 0x40, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x7C, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x7C, 0x00, 0x00],
            [0x00, 0x3E, 0x20, 0x20, 0x3C, 0x20, 0x20, 0x20, 0x3E, 0x00, 0x00],
            [0x00, 0x3E, 0x20, 0x20, 0x20, 0x3C, 0x20, 0x20, 0x20, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x40, 0x4E, 0x42, 0x42, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x42, 0x42, 0x42, 0x7E, 0x42, 0x42, 0x42, 0x42, 0x00, 0x00],
            [0x00, 0x3E, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x3E, 0x00, 0x00],
            [0x00, 0x1E, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x44, 0x38, 0x00],
            [0x00, 0x22, 0x24, 0x28, 0x30, 0x30, 0x28, 0x24, 0x22, 0x00, 0x00],
            [0x00, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x3E, 0x00, 0x00],
            [0x00, 0x41, 0x63, 0x55, 0x55, 0x49, 0x49, 0x41, 0x41, 0x00, 0x00],
            [0x00, 0x42, 0x62, 0x52, 0x52, 0x4A, 0x4A, 0x46, 0x42, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x7C, 0x42, 0x42, 0x42, 0x7C, 0x40, 0x40, 0x40, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x42, 0x42, 0x42, 0x52, 0x4A, 0x3C, 0x02, 0x00],
            [0x00, 0x7C, 0x42, 0x42, 0x42, 0x7C, 0x48, 0x44, 0x42, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x40, 0x3C, 0x02, 0x02, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x3E, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x00, 0x00],
            [0x00, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x41, 0x41, 0x22, 0x22, 0x14, 0x14, 0x08, 0x08, 0x00, 0x00],
            [0x00, 0x41, 0x41, 0x41, 0x49, 0x49, 0x49, 0x49, 0x36, 0x00, 0x00],
            [0x00, 0x63, 0x22, 0x14, 0x08, 0x08, 0x14, 0x22, 0x63, 0x00, 0x00],
            [0x00, 0x41, 0x41, 0x22, 0x14, 0x08, 0x08, 0x08, 0x08, 0x00, 0x00],
            [0x00, 0x7E, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x7E, 0x00, 0x00],
            [0x1C, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1C, 0x00],
            [0x20, 0x20, 0x10, 0x10, 0x10, 0x08, 0x08, 0x08, 0x04, 0x04, 0x00],
            [0x38, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x38, 0x00],
            [0x00, 0x00, 0x00, 0x08, 0x14, 0x22, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x00, 0x00],
            [0x08, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x02, 0x3E, 0x42, 0x42, 0x3D, 0x00, 0x00],
            [0x00, 0x40, 0x40, 0x5C, 0x62, 0x42, 0x42, 0x42, 0x7C, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x42, 0x40, 0x40, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x02, 0x02, 0x3A, 0x46, 0x42, 0x42, 0x42, 0x3E, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x42, 0x7E, 0x40, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x0E, 0x10, 0x10, 0x3C, 0x10, 0x10, 0x10, 0x10, 0x00, 0x00],
            [0x00, 0x00, 0x04, 0x38, 0x44, 0x44, 0x38, 0x40, 0x3C, 0x42, 0x3C],
            [0x00, 0x40, 0x40, 0x5C, 0x62, 0x42, 0x42, 0x42, 0x42, 0x00, 0x00],
            [0x08, 0x08, 0x00, 0x38, 0x08, 0x08, 0x08, 0x08, 0x3E, 0x00, 0x00],
            [0x04, 0x04, 0x00, 0x1C, 0x04, 0x04, 0x04, 0x04, 0x04, 0x44, 0x38],
            [0x00, 0x40, 0x40, 0x44, 0x48, 0x70, 0x48, 0x44, 0x42, 0x00, 0x00],
            [0x00, 0x38, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x3E, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x76, 0x49, 0x49, 0x49, 0x41, 0x41, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x5C, 0x62, 0x42, 0x42, 0x42, 0x42, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x42, 0x42, 0x42, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x5C, 0x62, 0x42, 0x42, 0x42, 0x7C, 0x40, 0x40],
            [0x00, 0x00, 0x00, 0x3E, 0x42, 0x42, 0x42, 0x46, 0x3A, 0x02, 0x02],
            [0x00, 0x00, 0x00, 0x6E, 0x32, 0x20, 0x20, 0x20, 0x20, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x42, 0x3C, 0x02, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x10, 0x10, 0x3C, 0x10, 0x10, 0x10, 0x12, 0x0C, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x42, 0x42, 0x42, 0x42, 0x46, 0x3A, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x22, 0x22, 0x14, 0x14, 0x08, 0x08, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x41, 0x41, 0x49, 0x49, 0x49, 0x36, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x66, 0x24, 0x18, 0x18, 0x24, 0x66, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x63, 0x22, 0x22, 0x14, 0x0C, 0x08, 0x48, 0x30],
            [0x00, 0x00, 0x00, 0x7E, 0x04, 0x08, 0x10, 0x20, 0x7E, 0x00, 0x00],
            [0x0C, 0x10, 0x10, 0x08, 0x30, 0x08, 0x10, 0x10, 0x10, 0x0C, 0x00],
            [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x00],
            [0x30, 0x08, 0x08, 0x10, 0x0C, 0x10, 0x08, 0x08, 0x08, 0x30, 0x00],
            [0x00, 0x00, 0x00, 0x32, 0x4C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
        ]

        let line = 0
        let lineStart = 0

        for (let i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
                line++
                lineStart = i + 1
            } else if (this.charsetIndex.indexOf(text[i]) !== -1) {
                // 绘制自定义字符
                for (let j = 0; j < 11; j++) {
                    for (let k = 0; k < 8; k++) {
                        if (this.charset[this.charsetIndex.indexOf(text[i])][j] & (0x01 << k)) {
                            this.setPixel(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j, color)
                        }
                    }
                }
            } else if (text[i].charCodeAt(0) < 128 && text[i].charCodeAt(0) >= 32) {
                // 绘制内置字体字符
                for (let j = 0; j < 11; j++) {
                    for (let k = 0; k < 8; k++) {
                        if (font[text[i].charCodeAt(0) - 32][j] & (0x01 << k)) {
                            this.setPixel(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j, color)
                        }
                    }
                }
            }
            basic.pause(1)
        }  
    }

    draw8x11AsciiTextWithMode(text: string, x: number, y: number, mode: OLEDDisplayMode): void {
        const textWidth = text.length * 8
        const textHeight = 11

        switch (mode) {
            case OLEDDisplayMode.Normal:
                this.draw8x11Text(text, x, y, true)
                break

            case OLEDDisplayMode.Inverse:
                this.drawRect(x, y, x + textWidth-1, y + textHeight - 2, true, true, false)
                this.draw8x11Text(text, x-1, y, false)
                break
        }
    }

    /**
     * Draws rectangle.
     * You need to call `draw` to see the changes.
     * @param x1 coordinate x of upper left corner of rectangle (increases towards the right)
     * @param y1 coordinate y of upper left corner of rectangle (increases downwards)
     * @param x2 coordinate x of lower right corner of rectangle (increases towards the right)
     * @param y2 coordinate y of lower right corner of rectangle (increases downwards)
     * @param color color of rectangle
     * @param fill sets whether only the outline or also the fill of the rectangle is drawn
     * @param toggle sets whether to use pixel switching instead of setting the pixel to a specific color (if `true`, `color` means nothing)
     */
    drawRect(x1: number, y1: number, x2: number, y2: number, color: boolean, fill: boolean, toggle: boolean): void {
        if (fill) {
            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    if (toggle) {
                        this.togglePixel(x, y)
                    } else {
                        this.setPixel(x, y, color)
                    }
                }
            }
        }
        else {
            for (let x = x1; x <= x2; x++) {
                if (toggle) {
                    this.togglePixel(x, y1)
                } else {
                    this.setPixel(x, y1, color)
                }
            }
            for (let y = y1 + 1; y < y2; y++) {
                if (toggle) {
                    this.togglePixel(x1, y)
                } else {
                    this.setPixel(x1, y, color)
                }
            }
            for (let x = x1; x <= x2; x++) {
                if (toggle) {
                    this.togglePixel(x, y2)
                } else {
                    this.setPixel(x, y2, color)
                }
            }
            for (let y = y1 + 1; y < y2; y++) {
                if (toggle) {
                    this.togglePixel(x2, y)
                } else {
                    this.setPixel(x2, y, color)
                }
            }
        }
    }

    /**
     * Draws line.
     * You need to call `draw` to see the changes.
     * @param x1 coordinate x of start of line (increases towards the right)
     * @param y1 coordinate y of start of line (increases downwards)
     * @param x2 coordinate x of end of line (increases towards the right)
     * @param y2 coordinate y of end of line (increases downwards)
     * @param color color of line
     * @param toggle sets whether to use pixel switching instead of setting the pixel to a specific color (if `true`, `color` means nothing)
     */

    drawLine(x1: number, y1: number, x2: number, y2: number, color: boolean, toggle: boolean): void {
        const line = []
        const dx = Math.abs(x2 - x1)
        const dy = Math.abs(y2 - y1)
        const sx = x1 < x2 ? 1 : -1
        const sy = y1 < y2 ? 1 : -1
        let err = dx - dy
        while (true) {
            line.push([x1, y1])
            if (x1 === x2 && y1 === y2) {
                break
            }
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy
                x1 += sx
            }
            if (e2 < dx) {
                err += dx
                y1 += sy
            }
        }
        for (const pixel of line) {
            if (toggle) {
                this.togglePixel(pixel[0], pixel[1])
            } else {
                this.setPixel(pixel[0], pixel[1], color)
            }
        }
    }

    drawCirclePoints(centerX: number, centerY: number, x: number, y: number, color: boolean): void {
        const points = [
            [centerX + x, centerY + y],
            [centerX - x, centerY + y],
            [centerX + x, centerY - y],
            [centerX - x, centerY - y],
            [centerX + y, centerY + x],
            [centerX - y, centerY + x],
            [centerX + y, centerY - x],
            [centerX - y, centerY - x]
        ]

        for (const point of points) {
            const px = point[0]
            const py = point[1]
            if (px >= 0 && px < 128 && py >= 0 && py < 64) {
                this.setPixel(px, py, color)
            }
        }
    }

    drawCircle(centerX: number, centerY: number, radius: number, color: boolean): void {
        // 边界检查
        if (centerX < 0 || centerX >= 128 || centerY < 0 || centerY >= 64) {
            return
        }

        let x = 0
        let y = radius
        let d = 3 - 2 * radius

        // 绘制初始的8个点
        this.drawCirclePoints(centerX, centerY, x, y, color)

        while (y >= x) {
            x++

            if (d > 0) {
                y--
                d = d + 4 * (x - y) + 10
            } else {
                d = d + 4 * x + 6
            }

            this.drawCirclePoints(centerX, centerY, x, y, color)
        }
    }

    drawSmoothCircle(centerX: number, centerY: number, radius: number, color: boolean): void {
        if (centerX < 0 || centerX >= 128 || centerY < 0 || centerY >= 64) {
            return
        }

        const radiusSquared = radius * radius
        const antiAliasRadius = radius + 0.5
        const antiAliasRadiusSquared = antiAliasRadius * antiAliasRadius

        for (let y = -radius - 1; y <= radius + 1; y++) {
            for (let x = -radius - 1; x <= radius + 1; x++) {
                const distanceSquared = x * x + y * y

                if (distanceSquared <= radiusSquared) {
                    // 完全在圆内
                    const px = centerX + x
                    const py = centerY + y
                    if (px >= 0 && px < 128 && py >= 0 && py < 64) {
                        this.setPixel(px, py, color)
                    }
                } else if (distanceSquared <= antiAliasRadiusSquared) {
                    // 抗锯齿区域 - 根据距离决定是否绘制
                    const distance = Math.sqrt(distanceSquared)
                    const alpha = 1 - (distance - radius)

                    // 简单的抗锯齿：以一定概率绘制像素
                    if (Math.random() < alpha) {
                        const px = centerX + x
                        const py = centerY + y
                        if (px >= 0 && px < 128 && py >= 0 && py < 64) {
                            this.setPixel(px, py, color)
                        }
                    }
                }
            }
        }
    }

    /**
     * Draws image.
     * You need to call `draw` to see the changes.
     * @param image image to draw (can be `images.createImage()` or image from extension `imageio`)
     * @param x coordinate x of upper left corner of image (increases towards the right)
     * @param y coordinate y of upper left corner of image (increases downwards)
     * @param color color of image (if `true`, pixel `true` in image will be drawn as `true`)
     * @param bg sets whether empty pixels of the image are drawn (drawn with `not color`)
     * @param toggle sets whether to use pixel switching instead of setting the pixel to a specific color (if `true`, `color` means nothing)
     */
    drawImage(image: Image, x: number, y: number, color: boolean, bg: boolean, toggle: boolean): void {
        if ((image != null) && (image != undefined)) {
            for (let img_x = 0; img_x < image.width(); img_x++) {
                for (let img_y = 0; img_y < image.height(); img_y++) {
                    let c = image.pixel(img_x, img_y)
                    if ((bg && !c) || (c)) {
                        if (!color) {
                            c = !c
                        }
                        if (toggle) {
                            this.togglePixel(x + img_x, y + img_y)
                        } else {
                            this.setPixel(x + img_x, y + img_y, c)
                        }
                    }
                }
                basic.pause(1)
            }
        }
    }

    /**
     * Add character for function `draw text`.
     * For example, if you add character "_" and call `draw text "a_b"`, it will draw "a", then your custom character, then "b".
     * Drag `character image` from the same category into field `image`.
     * @param image character image to add to custom charset
     * @param char character name
     */
    addChar(image: Image, char: string): void {
        if (char != "" && image != null && image != undefined) {
            char = char[0]
            let compressedChar: number[] = []
            for (let y = 0; y < 11; y++) {
                let tmp = 0x00
                for (let x = 0; x < 8; x++) {
                    if (image.pixel(x, y)) {
                        tmp |= 0x01 << (7 - x)
                    }
                }
                compressedChar.push(tmp)
            }
            this.charset.unshift(compressedChar)
            this.charsetIndex.unshift(char)
        }
    }

    /**
     * Create image for `add character` function.
     */

    charImage(leds: string): Image {
        return <Image><any>leds
    }

    /**
     * Set detailed display orientation
     * @param segmentRemap segment remap (true: SEG0→SEG131, false: SEG0→SEG0)
     * @param comScanDirection COM scan direction (true: COM63→COM0, false: COM0→COM63)
     */

    setOrientation(segmentRemap: boolean, comScanDirection: boolean): void {
        this.cmd1(segmentRemap ? 0xA1 : 0xA0)
        this.cmd1(comScanDirection ? 0xC8 : 0xC0)
    }
}
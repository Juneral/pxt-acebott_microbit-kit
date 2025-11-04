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
        // this.screen = pins.createBuffer(1025)
        // this.SH1106_ADDR = 0x3C

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
    drawText(text: string, x: number, y: number, color: boolean, toggle: boolean): void {
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
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x10, 0x00, 0x00],
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
                for (let j = 0; j < 11; j++) {
                    for (let k = 0; k < 8; k++) {
                        if (this.charset[this.charsetIndex.indexOf(text[i])][j] & (0x01 << k)) {
                            if (toggle) {
                                this.togglePixel(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j)
                            } else {
                                this.setPixel(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j, color)
                            }
                        }
                    }
                }
            } else if (text[i].charCodeAt(0) < 128 && text[i].charCodeAt(0) >= 32) {
                for (let j = 0; j < 11; j++) {
                    for (let k = 0; k < 8; k++) {
                        if (font[text[i].charCodeAt(0) - 32][j] & (0x01 << k)) {
                            if (toggle) {
                                this.togglePixel(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j)
                            } else {
                                this.setPixel(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j, color)
                            }
                        }
                    }
                }
            } else {
            }
            basic.pause(1)
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
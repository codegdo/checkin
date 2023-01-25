class ColorHelper {

  tintPalette(color: string): string[] {
    const colors: string[] = [];

    return colors;
  }

  shadePalette(color: string): string[] {
    const colors: string[] = [];

    return colors;
  }

  tintColor(color: string, weight: number) {
    return this.mixColor('#ffffff', color, weight);
  }

  shadeColor(color: string, weight: number) {
    return this.mixColor('#000000', color, weight);
  }

  toneColor(tone: string, color: string, weight: number) {
    return this.mixColor(tone, color, weight);
  }

  private mixColor(baseColor: string, adjustColor: string, weight = 1) {
    let color = '#';

    const normalizeBaseColor = this.normalizeColor(baseColor);
    const normalizeAdjustColor = this.normalizeColor(adjustColor);

    for (let i = 0; i <= 5; i += 2) {
      const baseColorDecimal = this.hexToDecimal(normalizeBaseColor.slice(i, i + 2));
      const adjustColorDecimal = this.hexToDecimal(normalizeAdjustColor.slice(i, i + 2));

      let val = this.decimalToHex(Math.round(adjustColorDecimal + (baseColorDecimal - adjustColorDecimal) * ((weight * 100) / 100)));

      while (val.length < 2) {
        val = '0' + val;
      }

      color += val;
    }

    return color;
  }

  private normalizeColor(hexColor: string) {
    const color = hexColor.replace(/^#/, '');
    if (color.length === 3) {
      return color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    return color;
  }

  private decimalToHex(decimalValue: number) {
    return decimalValue.toString(16);
  }

  private hexToDecimal(hexValue: string) {
    return parseInt(hexValue, 16);
  }

}

export const colorHelper = new ColorHelper();
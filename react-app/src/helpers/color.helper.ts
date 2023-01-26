class ColorHelper {
  fullPalette(color: string, range: number, key?: string): string[] {
    const tints = this.tintPalette(color, range);
    const shades = this.shadePalette(color, range);

    const colors = [...tints, color, ...shades];

    return key ? colors.map((color, i) => {
      return `${key}-${(i + 1) * 10}:${color};`;
    }) : colors;

  }

  tintPalette(color: string, range: number, key?: string): string[] {
    const colors: string[] = [];

    for (let i = 1; i < 10; i += 10 / range) {
      const tint = this.tintColor(color, i / 10);
      colors.push(tint);
    }

    colors.reverse();

    return key ? colors.map((color, i) => {
      return `${key}-${(i + 1) * 10}:${color};`;
    }) : colors;
  }

  shadePalette(color: string, range: number, key?: string): string[] {
    const colors: string[] = [];

    for (let i = 1; i < 10; i += 10 / range) {
      const shade = this.shadeColor(color, i / 10);
      colors.push(shade);
    }

    return key ? colors.map((color, i) => {
      return `${key}-${(i + 1) * 10}:${color};`;
    }) : colors;
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

      let val = this.decimalToHex(
        Math.round(
          adjustColorDecimal + (baseColorDecimal - adjustColorDecimal) * ((weight * 100) / 100)
        )
      );

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

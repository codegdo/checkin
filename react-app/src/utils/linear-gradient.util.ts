export const linearGradient = (str: string, value: string): string => {
  //"linear-gradient(90deg, rgb(231, 231, 231) 0%, rgb(14, 14, 14) 0%, rgb(14, 14, 14) 0%, rgb(231, 231, 231) 0%)"

  str = str.substring(str.indexOf('(') + 1, str.lastIndexOf(')'));
  //"90deg, rgb(231, 231, 231) 0%, rgb(14, 14, 14) 0%, rgb(14, 14, 14) 0%, rgb(231, 231, 231) 0%"

  const arr: string[] = str.split(
    /,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/
  );

  /*[
    "90deg", 
    "rgb(231, 231, 231) 0%", 
    "rgb(14, 14, 14) 0%", 
    "rgb(14, 14, 14) 0%", 
    "rgb(231, 231, 231) 0%"
  ]*/

  if (arr.length === 5) {
    const v3 = arr[3].substring(0, arr[3].lastIndexOf(' '));
    const v4 = arr[4].substring(0, arr[4].lastIndexOf(' '));
    arr[3] = v3 + value;
    arr[4] = v4 + value;
  }

  return `linear-gradient(${arr.join()})`;
};


interface GradientStop {
  color: string;
  position: string;
}

interface LinearGradient {
  angle: string;
  stops: GradientStop[];
}

export const parseLinearGradient = (str: string): LinearGradient | null => {
  const match = str.match(/^linear-gradient\((.*)\)$/);
  if (!match) return null;

  const [, params] = match;
  const angleMatch = params.match(/^([0-9]+)deg$/);
  const angle = angleMatch ? angleMatch[1] + 'deg' : 'to bottom';

  const stops = params.split(/,\s*/).slice(angleMatch ? 1 : 0).map(stop => {
    const colorMatch = stop.match(/^((rgb|hsl)a?\(.+\)|#[0-9a-fA-F]{3,8})/);
    const positionMatch = stop.match(/([0-9.]+%)/);
    if (!colorMatch || !positionMatch) return null;
    return { color: colorMatch[1], position: positionMatch[1] };
  }).filter(Boolean) as GradientStop[];

  return { angle, stops };
}

export const updateGradientStop = (gradient: LinearGradient, index: number, value: string): LinearGradient => {
  if (index < 0 || index >= gradient.stops.length) return gradient;
  const { color, position } = gradient.stops[index];
  const updatedStops = [
    ...gradient.stops.slice(0, index),
    { color, position: position + ' ' + value },
    ...gradient.stops.slice(index + 1)
  ];
  return { ...gradient, stops: updatedStops };
}

export const stringifyLinearGradient = (gradient: LinearGradient): string => {
  const angle = gradient.angle === 'to bottom' ? '' : gradient.angle + ', ';
  const stops = gradient.stops.map(stop => `${stop.color} ${stop.position}`).join(', ');
  return `linear-gradient(${angle}${stops})`;
}

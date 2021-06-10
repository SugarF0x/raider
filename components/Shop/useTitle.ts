export function useTitle(title: string, description: string, color: string) {
  return {
    titleConfig: {
      text: title,
      stroke: 'black',
      strokeWidth: 8,
      fontSize: 32,
      width: 200,
      align: 'left',
      x: 50,
      y: 203,
      fill: color
    },
    descriptionConfig: {
      text: description,
      stroke: 'black',
      strokeWidth: 6,
      fontSize: 18,
      width: 250,
      align: 'right',
      x: 190,
      y: 215,
      fill: color
    }
  }
}
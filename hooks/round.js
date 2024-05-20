export function sC(val) {
  val = val.toFixed(2);
  let num = val.toString().includes('.')
    ? val.toString().split('.')[0]
    : val.toString();
  let len = num.toString().length;
  let result = '';
  let count = 1;
  for (let i = len - 1; i >= 0; i--) {
    result = num.toString()[i] + result;
    if (count % 3 === 0 && count !== 0 && i !== 0) {
      result = ',' + result;
    }
    count++;
  }
  if (val.toString().includes('.')) {
    result = result + '.' + val.toString().split('.')[1];
  }
  return result;
}

export function formatearFecha(fecha) {
  if (fecha) {
    fecha = new Date(fecha);
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const dia = fecha.getDate();
    const mesIndex = fecha.getMonth();
    const año = fecha.getFullYear();

    return `${meses[mesIndex]} ${dia}, ${año}`;
  }
}
export function formatearHora(fecha) {
  fecha = new Date(fecha);
  let hora = fecha.getHours();
  const minutos = fecha.getMinutes();
  const esPM = hora >= 12;

  if (hora > 12) {
    hora -= 12;
  } else if (hora === 0) {
    hora = 12;
  }

  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

  return `${hora}:${minutosFormateados} ${esPM ? 'PM' : 'AM'}`;
}

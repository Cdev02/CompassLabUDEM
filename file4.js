console.log('This the fourth file added to this project');
console.log('Cambio realizado por Yoimar Moreno en la rama develop');
console.log('Otra linea agregada');
function fizzBuzz2(n) {
  for (let i = 1; i <= n; i++) {
    let str = '';

    if (i % 3 === 0) str += 'fizz';
    if (i % 5 === 0) str += 'buzz';
    if (str === '') str = i;

    console.log(str);
  }
}

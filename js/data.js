/* ============================================================
   DATA.JS — Datos de libros y autores · Biblioteca Universal
   ============================================================ */

function formatYear(year) {
  if (year < 0) return `${Math.abs(year)} a.C.`;
  return String(year);
}

function renderStars(rating, large = false) {
  const size  = large ? 16 : 12;
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  
  // Declaramos la variable como 'html'
  let html = `<svg width=\"0\" height=\"0\" style=\"position:absolute\"><defs><linearGradient id=\"halfGrad\" x1=\"0\" x2=\"1\" y1=\"0\" x2=\"1\" y1=\"0\" y2=\"0\"><stop offset=\"50%\" stop-color=\"var(--gold)\"/><stop offset=\"50%\" stop-color=\"var(--text-3)\"/></linearGradient></defs></svg><div class=\"stars-wrap\" aria-hidden=\"true\">`;
  
  // Usamos siempre 'html += ...' para que coincida perfectamente
  for (let i = 0; i < full;  i++) html += starSVG(size, 'filled');
  for (let i = 0; i < half;  i++) html += starSVG(size, 'half');
  for (let i = 0; i < empty; i++) html += starSVG(size, '');
  
  return html + `</div>`;
}

function starSVG(size, cls) {
  return `<svg class="star ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`;
}
const BOOKS = [
  { id:1, title:'1984', author:'George Orwell', year:1949, rating:4.9, era:'modern',
    genre:'Distopía · Ciencia ficción', cover:'img/1984 galeria.webp',
    synopsis:'En un futuro totalitario, Winston Smith se rebela contra el Gran Hermano. Una distopía visionaria que acuñó conceptos como doublethink y Newspeak, más vigente que nunca.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/-/es/1984-George-Orwell-Eighty-Four-Paperback/dp/605746222X'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/1984-george-orwell'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/productos/19841/'}] },

  { id:2, title:'Anna Karénina', author:'León Tolstói', year:1878, rating:4.9, era:'modern',
    genre:'Novela realista · Drama', cover:'img/anna Karenina1 galeria.webp',
    synopsis:'La aristócrata Anna abandona a su familia por el amor apasionado de Vronski, desafiando las convenciones de la sociedad rusa. Una de las grandes tragedias del amor de la literatura mundial.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/-/es/Anna-Karenina-Leo-Tolstoy/dp/0143035002'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=anna%20karenina'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/anna-karenina'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=anna+karenina'}] },

  { id:3, title:'Cien Años de Soledad', author:'Gabriel García Márquez', year:1967, rating:4.9, era:'modern',
    genre:'Realismo mágico · Novela épica', cover:'img/cien anios galeria.webp',
    synopsis:'La saga de los Buendía en el pueblo ficticio de Macondo, donde lo mágico y lo cotidiano conviven con naturalidad. Obra fundacional del realismo mágico latinoamericano.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=cien+anios+de+soledad'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=cien%20anios%20de%20soledad'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/cien-anios-de-soledad'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=+cien+anios+de+soledad'}] },
  
  { id:4, title:'Crimen y Castigo', author:'Fiódor Dostoyevski', year:1866, rating:4.9, era:'modern',
    genre:'Novela psicológica · Drama', cover:'img/crimen y castigo galeria.webp',
    synopsis:'Raskólnikov, un estudiante empobrecido, asesina a una usurera convencido de que el fin justifica los medios. Una inmersión magistral en la psicología del crimen y la redención.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=crimen+y+castigo'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/crimen-y-castigo'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=+crimen+y+castigo'}] },

  { id:5, title:'Don Quijote de la Mancha', author:'Miguel de Cervantes', year:1605, rating:4.9, era:'ancient',
    genre:'Novela de caballería · Sátira', cover:'img/Don quijote galeria.webp',
    synopsis:'Un hidalgo manchego, enloquecido por la lectura de novelas de caballería, decide convertirse en caballero andante junto a su escudero Sancho Panza. Considerada la primera novela moderna de la literatura occidental.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=Don+quijote+de+la+mancha'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=Don%20quijote%20de%20la%20mancha'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/don-quijote-de-la-mancha'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=+Don+quijote+de+la+mancha'}] },

  { id:6, title:'El Retrato de Dorian Gray', author:'Oscar Wilde', year:1890, rating:4.8, era:'modern',
    genre:'Novela gótica · Filosofía moral', cover:'img/Dorian.webp',
    synopsis:'Dorian Gray, un joven de extraordinaria belleza, vende su alma para que un retrato envejezca en su lugar. Una novela sobre la vanidad, la corrupción moral y el precio de la inmortalidad.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=el+retrato+de+dorian+gray'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=el%20retrato%20de%20dorian%20gray'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/el-retrato-de-dorian-gray'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=el+retrato+de+dorian+gray'}] },

  { id:7, title:'El Gran Gatsby', author:'F. Scott Fitzgerald', year:1925, rating:4.7, era:'modern',
    genre:'Novela modernista · Drama social', cover:'img/El gran gatsby galeria.webp',
    synopsis:'En los locos años veinte, el misterioso Jay Gatsby persigue el sueño americano y el amor perdido de Daisy Buchanan. Radiografía del exceso, la ilusión y la decadencia.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=El+gran+gatsby'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=el%20gran%20gatsby'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/el-gran-gatsby'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=el+gran+gatsby'}] },

  { id:8, title:'El Proceso', author:'Franz Kafka', year:1925, rating:4.8, era:'modern',
    genre:'Absurdismo · Novela existencial', cover:'img/El proceso galeria.webp',
    synopsis:'Josef K. es arrestado sin saber el motivo. Una pesadilla burocrática que simboliza la alienación moderna y la arbitrariedad del poder. Kafkiano en estado puro.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=el+proceso'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=el%20proceso'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/el-proceso-franz-kafka'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=el+proceso'}] },

  { id:9, title:'En Busca del Tiempo Perdido', author:'Marcel Proust', year:1913, rating:4.8, era:'modern',
    genre:'Modernismo · Autobiografía', cover:'img/En busca del tiempo perdido1.webp',
    synopsis:'El narrador busca recuperar el tiempo perdido a través de la memoria involuntaria. La magdalena mojada en té que desencadena el pasado es uno de los momentos más célebres de la literatura.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=en+busca+del+tiempo+perdido'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=en%20busca%20del%20tiempo%20perdido'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/en-busca-del-tiempo-perdido'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=en+busca+del+tiempo+perdido'}] },

  { id:10, title:'Fausto', author:'Johann Wolfgang von Goethe', year:1808, rating:4.8, era:'modern',
    genre:'Poema dramático · Tragedia', cover:'img/Fausto galeria.webp',
    synopsis:'El sabio Fausto pacta con el diablo Mefistófeles a cambio de conocimiento y placer ilimitados. La obra cumbre de la literatura alemana y uno de los grandes mitos de la cultura occidental.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=fausto'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=fausto'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/fausto'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=fausto'}] },

  { id:11, title:'Guerra y Paz', author:'León Tolstói', year:1869, rating:4.8, era:'modern',
    genre:'Novela histórica · Épica', cover:'img/Guerra y paz galeria.webp',
    synopsis:'Fresco histórico de la Rusia napoleónica que sigue a varias familias aristocráticas a través de la guerra y la paz. Una de las novelas más ambiciosas jamás escritas.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=guerra+y+paz'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=guerra%20y%20paz'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/guerra-y-paz'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=+guerra+y+paz'}] },

  { id:12, title:'Hamlet', author:'William Shakespeare', year:1603, rating:4.9, era:'ancient',
    genre:'Tragedia · Teatro isabelino', cover:'img/hamlet galeria.webp',
    synopsis:'El príncipe de Dinamarca busca vengar la muerte de su padre, presuntamente asesinado por su tío Claudio. Una tragedia que explora la duda, la traición y la condición humana con profundidad incomparable.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=hamlet'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=hamlet'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/hamlet'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=hamlet'}] },

  { id:13, title:'La Divina Comedia', author:'Dante Alighieri', year:1320, rating:4.8, era:'ancient',
    genre:'Poema épico · Alegoría', cover:'img/La divina comedia galeria.webp',
    synopsis:'Dante viaja por el Infierno, el Purgatorio y el Paraíso guiado por Virgilio y Beatriz. Obra cumbre de la literatura medieval y pilar fundamental de la lengua italiana.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=la+divina+comedia'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=la%20divina%20comedia'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/la-divina-comedia'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=la+divina+comedia'}] },

  { id:14, title:'La Odisea', author:'Homero', year:-800, rating:4.8, era:'ancient',
    genre:'Poema épico · Mitología griega', cover:'img/La odisea galeria.webp',
    synopsis:'Odiseo emprende el largo viaje de regreso a Ítaca tras la guerra de Troya, enfrentando monstruos, dioses y la fuerza del destino. Arquetipo del viaje heroico en la literatura universal.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=la+odisea'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=la%20odisea'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/la-odisea'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=la+odisea'}] },

  { id:15, title:'Las Aventuras de Huckleberry Finn', author:'Mark Twain', year:1884, rating:4.7, era:'modern',
    genre:'Aventura · Crítica social', cover:'img/Las Aventuras de huckbery flin galeria.webp',
    synopsis:'Huck Finn huye de su padre abusivo y viaja por el río Mississippi junto a Jim, un esclavo fugitivo. Una novela sobre la libertad, la amistad y la hipocresía de la sociedad americana del siglo XIX.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=Las+Aventuras+de+Huckleberry+Finn'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=Las%20Aventuras%20de%20Huckleberry%20Finn'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/las-aventuras-de-huckleberry-finn'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=Las+Aventuras+de+Huckleberry+Finn'}] },

  { id:16, title:'Los Hermanos Karamázov', author:'Fiódor Dostoyevski', year:1880, rating:4.9, era:'modern',
    genre:'Novela filosófica · Drama familiar', cover:'img/Los hermanos karamazov1.webp',
    synopsis:'Tres hermanos de caracteres opuestos se ven envueltos en el asesinato de su padre. La obra maestra final de Dostoyevski, una exploración monumental de la fe, la moral y la condición humana.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=Los+Hermanos+Karamazov'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=Los%20Hermanos%20Karamazov'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/los-hermanos-karamazov'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=++Los+Hermanos+Karamazov'}] },

  { id:17, title:'Madame Bovary', author:'Gustave Flaubert', year:1857, rating:4.7, era:'modern',
    genre:'Realismo · Novela psicológica', cover:'img/Madame bovary galeria.webp',
    synopsis:'Emma Bovary, hastiada de la mediocridad provincial, busca en el romanticismo y el adulterio una salida que la lleva a la ruina. Maestra del estilo indirecto libre.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=Madame+Bovary'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=Madame%20Bovary'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/madame-bovary'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=++Madame+Bovary'}] },

  { id:18, title:'Moby Dick', author:'Herman Melville', year:1851, rating:4.7, era:'modern',
    genre:'Aventura marítima · Novela filosófica', cover:'img/Moby Dick galeria.webp',
    synopsis:'El capitán Ahab obsesionado conduce a su tripulación en una persecución implacable de la ballena blanca. Épica del mar, la obsesión y los límites de la voluntad humana.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=Moby+Dick'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=Moby%20Dick'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/moby-dick'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=+Moby+Dick'}] },

  { id:19, title:'Orgullo y Prejuicio', author:'Jane Austen', year:1813, rating:4.8, era:'modern',
    genre:'Novela romántica · Comedia de costumbres', cover:'img/Orgullo1.webp',
    synopsis:'Elizabeth Bennet y el altivo Mr. Darcy navegan los prejuicios sociales y sus propios malentendidos hacia un amor que desafía las conventions de la Inglaterra regencia.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=Orgullo+y+Prejuicio'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=Orgullo%20y%20Prejuicio'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/orgullo-y-prejuicio'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=Orgullo+y+Prejuicio'}] },

  { id:20, title:'Ulises', author:'James Joyce', year:1922, rating:4.6, era:'modern',
    genre:'Modernismo · Novela experimental', cover:'img/Ulises1.webp',
    synopsis:'Un día en Dublín visto a través de la conciencia de Leopold Bloom. Obra maestra del modernismo literario y de la técnica del monólogo interior. Compleja, inabarcable y genial.',
    buyLinks:[{label:'Amazon',url:'https://www.amazon.com/s?k=ulises'},{label:'Casa del Libro',url:'https://www.casadellibro.com/libro-1984/9788499890944/2034881?query=ulises%20joyce'},{label:'Mercado Libre',url:'https://listado.mercadolibre.com.ar/ulises-joyce'},{label:'El Ateneo',url:'https://www.yenny-elateneo.com/search/?q=ulises'}] }
];


const AUTHORS = [
  {
    id:1, name:'Miguel de Cervantes', dates:'1547 – 1616', era:'Siglo de Oro', nationality:'Español', initials:'MC',
    genres:['Novela','Poesía','Teatro'],
    bio:'Considerado el mayor escritor en lengua española, Cervantes creó con Don Quijote la primera novela moderna. Su vida estuvo marcada por la aventura, el cautiverio y la pobreza.',
    bioExtended:'Miguel de Cervantes Saavedra nació en Alcalá de Henares en 1547. Participó en la batalla de Lepanto (1571), donde perdió la movilidad de su mano izquierda, ganándose el apodo de "el manco de Lepanto". Fue capturado por piratas berberiscos y pasó cinco años como cautivo en Argel antes de ser rescatado. De vuelta en España, trabajó como recaudador de impuestos y sufrió varios encarcelamientos. En prisión, según la tradición, comenzó a concebir el Quijote. La primera parte se publicó en 1605 y fue un éxito inmediato. Don Quijote de la Mancha es considerada la primera novela moderna de la literatura occidental y la obra más influyente en lengua española. Murió en Madrid el 22 de abril de 1616, el mismo año que Shakespeare.',
    influence:'Cervantes inauguró la novela moderna tal como la conocemos hoy. Su técnica de narrativa dentro de la narrativa y sus personajes complejos influyeron en todos los grandes novelistas posteriores, desde Flaubert hasta Borges.',
    works:['Don Quijote','Novelas Ejemplares','La Galatea'],
    image:'img/autores/cervantes.webp'
  },
  {
    id:2, name:'William Shakespeare', dates:'1564 – 1616', era:'Renacimiento', nationality:'Inglés', initials:'WS',
    genres:['Teatro','Poesía','Tragedia','Comedia'],
    bio:'El Bardo de Avon es el escritor más influyente en lengua inglesa. Sus 37 obras de teatro y 154 sonetos definen el canon literario occidental.',
    bioExtended:'William Shakespeare nació en Stratford-upon-Avon en 1564. Alrededor de 1590 se trasladó a Londres, donde comenzó su carrera como actor y dramaturgo. Fue co-propietario del Globe Theatre, inaugurado en 1599. Sus obras cubren tragedias (Hamlet, Macbeth, Otelo, Rey Lear), comedias (El sueño de una noche de verano) y dramas históricos (Enrique V, Ricardo III). Sus 154 sonetos son considerados la cumbre de la poesía lírica en inglés. Su obra fue compilada póstumamente en el First Folio de 1623.',
    influence:'Shakespeare inventó más de 1.700 palabras en inglés y sus personajes se convirtieron en arquetipos universales. Ha sido traducido a más idiomas que cualquier otro autor y sus obras se representan continuamente en todo el mundo.',
    works:['Hamlet','Macbeth','Romeo y Julieta','Rey Lear'],
    image:'img/autores/shakespeare.jpg'
  },
  {
    id:3, name:'León Tolstói', dates:'1828 – 1910', era:'Realismo ruso', nationality:'Ruso', initials:'LT',
    genres:['Novela','Filosofía moral','Ensayo'],
    bio:'Conde y filósofo, Tolstói elevó la novela realista a su máxima expresión. Su búsqueda de la verdad moral lo llevó desde Guerra y Paz hasta el ascetismo espiritual.',
    bioExtended:'Lev Nikoláyevich Tolstói nació en Yásnaya Polyana, Rusia, en 1828. Sirvió en el ejército durante la guerra de Crimea. Guerra y Paz (1869) y Anna Karénina (1878) lo establecieron como el mayor novelista ruso. En sus últimos años experimentó una crisis espiritual que lo llevó a abrazar un cristianismo ascético propio, renunciar a sus derechos de autor y repartir sus tierras. Murió en 1910 en una pequeña estación de tren, huyendo de su propia casa en busca de una vida más simple.',
    influence:'Dostoyevski, Chéjov, Virginia Woolf, Faulkner y García Márquez reconocieron su deuda con Tolstói. Gandhi lo llamó su maestro moral. Sus ideas sobre la resistencia no violenta influyeron en movimientos de derechos civiles en todo el mundo.',
    works:['Guerra y Paz','Anna Karénina','La Muerte de Iván Ilich'],
    image:'img/autores/tolstoi.jpg'
  },
  {
    id:4, name:'Fiódor Dostoyevski', dates:'1821 – 1881', era:'Realismo ruso', nationality:'Ruso', initials:'FD',
    genres:['Novela psicológica','Drama','Filosofía'],
    bio:'Sobreviviente de un simulacro de fusilamiento y los campos de Siberia, Dostoyevski exploró como nadie los abismos del alma humana.',
    bioExtended:'Fiódor Mijáilovich Dostoyevski nació en Moscú en 1821. En 1849 fue arrestado y condenado a muerte. Momentos antes de ser ejecutado, la pena fue conmutada por cuatro años de trabajos forzados en Siberia. Esta experiencia transformó profundamente su visión del mundo y de la fe. Luchó contra la epilepsia y la adicción al juego durante toda su vida. Sus grandes novelas exploran la culpa, la redención, el libre albedrío y la existencia de Dios con una profundidad psicológica sin precedentes.',
    influence:'Nietzsche, Freud, Kafka, Camus y Sartre reconocieron su influencia fundamental. Se le considera uno de los precursores del existencialismo y del psicoanálisis literario.',
    works:['Crimen y Castigo','El Idiota','Los Hermanos Karamázov'],
    image:'img/autores/dostoyevski.jpg'
  },
  {
    id:5, name:'Gabriel García Márquez', dates:'1927 – 2014', era:'Boom latinoamericano', nationality:'Colombiano', initials:'GG',
    genres:['Realismo mágico','Novela','Periodismo'],
    bio:'Premio Nobel de Literatura en 1982, García Márquez transformó la narrativa latinoamericana con el realismo mágico.',
    bioExtended:'Gabriel José García Márquez nació en Aracataca, Colombia, en 1927. Fue criado por sus abuelos maternos. Estudió derecho y trabajó como periodista antes de dedicarse plenamente a la literatura. Cien Años de Soledad (1967) fue un fenómeno editorial: se vendieron 8.000 ejemplares en una semana en Buenos Aires. En 1982 recibió el Premio Nobel de Literatura. Vivió en México la mayor parte de su vida adulta.',
    influence:'García Márquez consolidó el realismo mágico internacionalmente y colocó la narrativa latinoamericana en el centro del canon mundial. Influenció a Isabel Allende, Salman Rushdie y a innumerables escritores en todo el mundo.',
    works:['Cien Años de Soledad','El Amor en los Tiempos del Cólera','El Coronel no tiene quien le escriba'],
    image:'img/autores/gabriel garcia marquez.jpg'
  },
  {
    id:6, name:'Franz Kafka', dates:'1883 – 1924', era:'Modernismo', nationality:'Checo-alemán', initials:'FK',
    genres:['Absurdismo','Existencialismo','Novela corta'],
    bio:'Empleado de seguros praguense que escribía de noche, Kafka creó un universo onírico y burocrático que da nombre a un adjetivo.',
    bioExtended:'Franz Kafka nació en Praga en 1883 en el seno de una familia judía de habla alemana. Estudió derecho y trabajó en una compañía de seguros, escribiendo literatura por las noches. Nunca publicó sus novelas principales; pidió a su amigo Max Brod que las destruyera tras su muerte. Brod ignoró la petición y publicó El Proceso, El Castillo y América. Kafka murió de tuberculosis en 1924 a los 40 años.',
    influence:'El adjetivo "kafkiano" entró en todos los idiomas. Influyó en Camus, Borges, Beckett y en toda la literatura del absurdo. Su visión profética de la burocracia totalitaria anticipó los regímenes del siglo XX.',
    works:['El Proceso','La Metamorfosis','El Castillo'],
    image:'img/autores/kafka.jpg'
  },
  {
    id:7, name:'George Orwell', dates:'1903 – 1950', era:'Siglo XX', nationality:'Inglés', initials:'GO',
    genres:['Distopía','Ensayo político','Periodismo'],
    bio:'Eric Arthur Blair, conocido como George Orwell, fue periodista y novelista comprometido con la justicia social. Sus obras son pilares del pensamiento político moderno.',
    bioExtended:'Eric Arthur Blair nació en Motihari, India, en 1903. Ingresó en la Policía Imperial en Birmania, experiencia que le dejó un profundo rechazo al imperialismo. Vivió entre los más pobres de Londres y París. Combatió en la Guerra Civil Española del lado republicano y fue herido de bala en el cuello. Rebelión en la Granja (1945) y 1984 (1949) son sus obras más conocidas. Murió de tuberculosis en 1950 a los 46 años.',
    influence:'Términos como "Gran Hermano", "doublethink" y "Newspeak" se convirtieron en parte del vocabulario político universal. Orwell es la referencia obligada en cualquier debate sobre totalitarismo y libertad de expresión.',
    works:['1984','Rebelión en la Granja','Homenaje a Cataluña'],
    image:'img/autores/orwell.jpg'
  },
  {
    id:8, name:'Dante Alighieri', dates:'1265 – 1321', era:'Edad Media', nationality:'Italiano', initials:'DA',
    genres:['Poesía épica','Alegoría','Filosofía'],
    bio:'Poeta, filósofo y político florentino que escribió La Divina Comedia en el exilio. Padre de la lengua italiana moderna.',
    bioExtended:'Dante Alighieri nació en Florencia en 1265. Se enamoró de Beatriz Portinari, quien se convirtió en la musa y guía espiritual de toda su obra. Participó en la política florentina y en 1302 fue condenado al exilio permanente. Escribió La Divina Comedia durante sus años de destierro, en toscano vulgar en lugar del latín culto, estableciendo así el fundamento de la lengua italiana. Murió en Rávena en 1321.',
    influence:'La Divina Comedia estableció el toscano como lengua literaria italiana. Influyó en Miguel Ángel, Rafael, T.S. Eliot y en incontables artistas. La estructura de sus tres reinos ha modelado la imaginación occidental del más allá.',
    works:['La Divina Comedia','La Vita Nuova','De Vulgari Eloquentia'],
    image:'img/autores/dante.jpg'
  },
  {
    id:9, name:'Oscar Wilde', dates:'1854 – 1900', era:'Esteticismo', nationality:'Irlandés', initials:'OW',
    genres:['Novela gótica','Teatro','Poesía','Aforismo'],
    bio:'Gran exponente del esteticismo victoriano. Brillante, provocador y trágico, desafió las convenciones morales de su época con elegancia e ingenio.',
    bioExtended:'Oscar Wilde nació en Dublín en 1854. Estudió en Oxford donde adoptó el esteticismo. Se convirtió en la figura más brillante de los salones londinenses. En 1895 fue procesado y condenado a dos años de trabajos forzados por su relación con Lord Alfred Douglas. La cárcel destruyó su salud y su carrera. Tras su liberación se exilió en Francia y murió en París en 1900, en la pobreza.',
    influence:'Wilde anticipó el esteticismo moderno y la idea de que el estilo es una forma de pensamiento. Sus aforismos son citados universalmente. Su vida y proceso judicial se convirtieron en símbolos de la lucha por los derechos individuales.',
    works:['El Retrato de Dorian Gray','La Importancia de Llamarse Ernesto','El Abanico de Lady Windermere'],
    image:'img/autores/wilde.jpg'
  },
  {
    id:10, name:'Johann Wolfgang von Goethe', dates:'1749 – 1832', era:'Romanticismo alemán', nationality:'Alemán', initials:'JG',
    genres:['Poesía','Drama','Novela','Ciencia'],
    bio:'Figura central de la literatura alemana. Con Fausto creó una obra que trasciende géneros y épocas.',
    bioExtended:'Johann Wolfgang von Goethe nació en Fráncfort del Meno en 1749. Las desventuras del joven Werther (1774) lo hizo famoso en toda Europa. Trabajó décadas al servicio del Duque de Weimar, donde dirigió el teatro y realizó investigaciones científicas. Fausto, en la que trabajó durante más de sesenta años, es su obra maestra. La primera parte se publicó en 1808 y la segunda, póstumamente, en 1832.',
    influence:'Goethe es considerado el Shakespeare alemán. Influyó en el Romanticismo europeo, la filosofía de Hegel y la psicología de Jung. Su concepción del "hombre fáustico" es un arquetipo de la cultura occidental moderna.',
    works:['Fausto','Las desventuras del joven Werther','Wilhelm Meister'],
    image:'img/autores/goethe.jpg'
  },
  {
    id:11, name:'Mark Twain', dates:'1835 – 1910', era:'Realismo americano', nationality:'Estadounidense', initials:'MT',
    genres:['Aventura','Sátira','Humor'],
    bio:'Gran cronista de la América del siglo XIX. Con humor, ironía y profunda humanidad retrató la sociedad de su tiempo.',
    bioExtended:'Samuel Langhorne Clemens, conocido como Mark Twain, nació en Florida, Misuri, en 1835. Creció junto al río Mississippi. Trabajó como piloto de barcos fluviales —de donde tomó su seudónimo, que significa "dos brazas de profundidad"— antes de dedicarse al periodismo y la literatura. Hemingway escribió que "toda la literatura americana moderna viene de un libro de Mark Twain llamado Huckleberry Finn".',
    influence:'Twain es considerado el padre de la literatura americana moderna. Fue el primero en usar el dialecto vernáculo como instrumento literario serio y en retratar América con humor y crítica social simultáneos.',
    works:['Las Aventuras de Huckleberry Finn','Las Aventuras de Tom Sawyer','Un yankee en la corte del Rey Arturo'],
    image:'img/autores/twain.jpg'
  },
  {
    id:12, name:'Herman Melville', dates:'1819 – 1891', era:'Romanticismo americano', nationality:'Estadounidense', initials:'HM',
    genres:['Novela filosófica','Aventura marítima','Alegoría'],
    bio:'Marinero, aventurero y escritor, Melville convirtió su experiencia en los mares del sur en literatura de alcance universal.',
    bioExtended:'Herman Melville nació en Nueva York en 1819. A los 18 años se embarcó como marinero mercante y luego sirvió en un ballenero. Moby Dick (1851) fue un fracaso comercial inmediato y fue mal comprendida por la crítica. Melville murió en 1891 en el olvido casi absoluto. Fue redescubierto en los años 1920 y hoy es considerada la gran novela americana.',
    influence:'Moby Dick influyó en Conrad, Faulkner, Borges y Cormac McCarthy. Su exploración de la obsesión y lo sublime anticipó la modernidad literaria del siglo XX.',
    works:['Moby Dick','Billy Budd','Bartleby, el escribiente'],
    image:'img/autores/melville.jpg'
  },
  {
    id:13, name:'Jane Austen', dates:'1775 – 1817', era:'Romanticismo inglés', nationality:'Inglesa', initials:'JA',
    genres:['Novela romántica','Comedia de costumbres','Crítica social'],
    bio:'Con prosa de precisión quirúrgica y humor finísimo, Austen radiografió la sociedad inglesa. Sus novelas siguen siendo extraordinariamente modernas.',
    bioExtended:'Jane Austen nació en Steventon, Hampshire, en 1775. Publicó sus seis novelas de forma anónima. Nunca se casó. Desarrolló su obra en la mesa de comedor familiar, ocultando los manuscritos cuando llegaban visitas. Murió a los 41 años. Su identidad como autora fue un secreto de familia hasta después de su muerte.',
    influence:'Austen perfeccionó el estilo indirecto libre. Influenció a Henry James, Virginia Woolf y a toda la novela psicológica moderna. Hoy sus obras generan un universo cultural propio con millones de seguidores.',
    works:['Orgullo y Prejuicio','Sentido y Sensibilidad','Emma'],
    image:'img/autores/jane austen.jpg'
  }
];

$('.carousel').on('slide.bs.carousel', function () {
  if ($('#primero').hasClass("active")) {
    $('#texto').html("Animaciones y sonidos activados por el teclado. Una recreación de patatap.com.  <br>{PaperJS y Howler.JS}");
  }
  if ($('#segundo').hasClass("active")) {
    $('#texto').html("Un juego para aprender a identificar RGBs. <br>{HTML, CSS, Vainilla JS}");
  }
  if ($('#tercero').hasClass("active")) {
    $('#texto').html("Un sitio para compartir cervecerías.  <br>{RESTful routes, base de datos, autenticación, Google APIs y Bootstrap}");
    }
});
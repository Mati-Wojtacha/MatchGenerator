<template>
  <div class="container-fluid">
    <div class="row" style="  align-items: center;
  justify-content: space-between; padding: 20px;">
      <div class="col-md-6">
        <h1>O Aplikacji</h1>
        <p>Głównym celem aplikacji jest wygenerowanie harmonogramu meczów w taki sposób, aby podzielić wszystkich
          uczestników na dwie grupy,
          a następnie stworzyć zestawienie, które zapewni, że żadna z możliwych kombinacji par nie będzie się powtarzać.
          Aplikacja oferuje również funkcję generowania rewanżów dla każdej z grup, co pozwala na pełniejszą
          rywalizację.
          Użytkownicy mogą wprowadzać wyniki poszczególnych meczów, co umożliwia stworzenie klarownego zestawienia,
          pokazującego ilość wygranych i przegranych każdego z graczy.</p>

        <p>
          Dodatkowo, aplikacja umożliwia generowanie wspomnianych zestawień w formacie PDF, co ułatwia ich archiwizację
          i udostępnianie</p>

        <h2>Technologie</h2>
        <p>Aplikacja została stworzona z wykorzystaniem technologii takich jak:</p>
        <ul class="list-about list-group">

          <li class="list-group-item">Vue.js</li>
          <li class="list-group-item">TypeScript</li>
          <li class="list-group-item">Bootstrap</li>
          <li class="list-group-item">PDFMake</li>
          <li class="list-group-item">Node.js</li>
        </ul>
      </div>
      <div class="col-md-6 text-center">
        <img :src="require('@/../public/logo.png')"  alt="logo" class="img-fluid">
      </div>
    </div>
  </div>
</template>
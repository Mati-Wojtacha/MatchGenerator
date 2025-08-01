<template>
  <div class="container-fluid">
    <div class="row" style="  align-items: center;
  justify-content: space-between; padding: 20px;">
      <div class="col-md-6">
        <h1>{{ $t('aboutApp.title') }}</h1>
        <p>{{ $t('aboutApp.content') }}</p>

        <p>
          {{ $t('aboutApp.content_additional') }}</p>

        <h2>{{ $t('technologies.title') }}</h2>
        <p>{{ $t('technologies.subtitle') }}</p>
        <ul class="list-about list-group">

          <li class="list-group-item">Vue.js</li>
          <li class="list-group-item">TypeScript</li>
          <li class="list-group-item">Bootstrap</li>
          <li class="list-group-item">PDFMake</li>
          <li class="list-group-item">Node.js</li>
        </ul>
      </div>
      <div class="col-md-6 text-center">
        <img :src="require('@/../public/logo.webp')"  alt="logo" class="img-fluid">
      </div>
    </div>
  </div>
</template>
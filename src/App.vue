<template>
  <main class="app-shell">
    <header class="topbar">
      <div class="brand">
        <h1>Demo ID Frontend</h1>
        <p>Available ID use cases</p>
      </div>
      <div class="repo-path">{{ displayBasePath }}</div>
    </header>

    <section class="usecase-grid" aria-label="Available ID use cases">
      <a
        v-for="usecase in usecases"
        :key="usecase.slug"
        class="usecase-card"
        :href="usecase.href"
      >
        <div class="preview" :class="usecase.slug">
          <img :src="usecase.logo" :alt="`${usecase.name} logo`">
        </div>
        <div class="card-content">
          <div class="card-row">
            <div>
              <h2>{{ usecase.name }}</h2>
              <p>{{ usecase.summary }}</p>
            </div>
            <span class="open-pill">Open</span>
          </div>
          <div class="path">{{ usecase.href }}</div>
        </div>
      </a>
    </section>

    <div class="status-row">
      <span class="status-dot" aria-hidden="true"></span>
      <span>{{ usecases.length }} use cases listed</span>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";

const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
const basePath = currentPath.endsWith("/") ? currentPath : `${currentPath}/`;

const usecases = [
  {
    name: "BeerKart",
    slug: "beerkart",
    summary: "Age-aware beer marketplace checkout demo.",
    logo: `${basePath}usecases/beerkart/assets/logo-beerkart.png`,
  },
  {
    name: "NuVex",
    slug: "nuvex",
    summary: "Identity-gated exchange trading demo.",
    logo: `${basePath}usecases/nuvex/assets/logo.png`,
  },
  {
    name: "Bankify",
    slug: "bankify",
    summary: "KYC customer onboarding for digital banking using Hypersign ID.",
    logo: `${basePath}usecases/bankify/assets/logo.png`,
  },
].map((usecase) => ({
  ...usecase,
  href: `${basePath}usecases/${usecase.slug}/`,
}));

const displayBasePath = computed(() => basePath);
</script>

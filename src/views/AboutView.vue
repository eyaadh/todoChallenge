<template>
  <div
    class="animate-in zoom-in duration-500 w-full h-full flex flex-col items-center gap-4 text-todo-black pt-20 sm:pt-40 pb-10 px-10 border border-todo-black/20 shadow rounded-xl overflow-auto bg-gray-50 ">
    <h1 class="text-3xl font-bold">What is this?</h1>
    <p class="mt-4">This project is a demonstration of a ToDo application that a colleague and I developed. The entire
      application is designed to function entirely within the browser, leveraging the Vue.js framework for its core
      functionality. To achieve a polished and responsive user interface, we utilized Tailwind CSS, which provides a
      comprehensive suite of utility classes for styling.</p>
    <p>For state management, we chose Pinia, a modern state management library that integrates seamlessly with Vue. To
      ensure that user data persists across browser sessions, we implemented local storage (using vueuse - useStorage),
      allowing users to close and return to the app without losing their data.</p>
    <p>To enhance the user experience with smooth transitions and interactive elements, we incorporated animation
      libraries such as tailwindcss-animate and @formkit/auto-animate. Additionally, to expedite development and avoid
      reinventing the wheel, we made use of Hero Icons and Headless UI, which offer a variety of pre-built components
      and icons.</p>
    <p>The primary objective of this iteration of the app is to showcase the responsive design capabilities of Tailwind
      CSS, as well as to demonstrate foundational Vue.js concepts.</p>

    <p>Source code for the project can be found on <a href="https://github.com/eyaadh/todoChallenge" class="underline"
                                                      target="_blank">this github repository.</a></p>
    <RouterLink to="/" class=" ">
      <div class="flex gap-2 mt-4 font-bold items-center -ml-4">
        <ChevronDoubleLeftIcon class="h-4"/>
        <span>Go Back Home</span>
      </div>
    </RouterLink>

  </div>
</template>

<script setup lang="ts">
import {ChevronDoubleLeftIcon} from "@heroicons/vue/24/solid";
</script>

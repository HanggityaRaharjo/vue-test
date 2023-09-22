<script setup>
import { ref } from "vue";

defineProps({
  imageSource: String,
  fileName: String,
  size: String,
  width: String,
  height: String,
});

const statusModalShow = ref(true);

const HandleClick = () => {
  statusModalShow.value = !statusModalShow.value;
  console.log("sampe sini", statusModalShow.value);
};
</script>

<template>
  <!-- Card -->
  <div
    class="flex flex-col justify-center border p-2 border-gray-700 rounded-xl"
  >
    <div
      @click="HandleClick()"
      className="card w-full bg-base-100 shadow-xl  rounded-xl mb-2"
    >
      <figure class="">
        <a href="">
          <img
            :src="imageSource"
            alt="Shoes"
            class="rounded-xl h-64 w-full object-cover object-center"
          />
        </a>
      </figure>
    </div>
    <div class="flex justify-end gap-2">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <p class="font-semibold text-neutral">{{ fileName }}</p>
    <p class="text-gray-300">Size : {{ size }} byte</p>
    <p class="text-gray-300">Dimension : {{ width }} x {{ height }}</p>
  </div>
  <!-- End Card -->
</template>

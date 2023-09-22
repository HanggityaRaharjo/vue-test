<script setup>
import Card from "../components/Card.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const isImageSizeError = ref(false);
const isImageFormatTypeError = ref(false);
const isUploadError = ref(false);
const dataFromLocalStorage = ref([]);

onMounted(() => {
  GetDataFromLocalStorage();
});

const GetDataFromLocalStorage = () => {
  const localStorageData = localStorage.getItem("listOfImage");
  if (localStorageData) {
    dataFromLocalStorage.value = JSON.parse(localStorageData);
  }
};

const SearchFilterData = (text) => {
  const filteredData = JSON.parse(localStorage.getItem("listOfImage")).filter(
    (item) => item.title.includes(text)
  );
  dataFromLocalStorage.value = filteredData;
  if (text == "") {
    GetDataFromLocalStorage();
  }
};

const HandleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      {
        key: "b10a716ac98daf1fcc9390f34b252dbb",
        image: e.target["image"].files[0],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const result = await response.data;
    console.log("Response from server:", result);

    if (localStorage.getItem("listOfImage")) {
      let data = JSON.parse(localStorage.getItem("listOfImage"));
      const newData = [...data, result.data];
      localStorage.setItem("listOfImage", JSON.stringify(newData));
    } else {
      let arrayOfImage = [];
      arrayOfImage.push(result.data);
      localStorage.setItem("listOfImage", JSON.stringify(arrayOfImage));
    }
    GetDataFromLocalStorage();
    document.getElementById("close-button").click();
  } catch (error) {
    console.error("Error uploading image:", error);
    isUploadError.value = true;
    setTimeout(() => {
      isUploadError.value = false;
    }, 3000);
  }
};

const ValidateImage = async () => {
  console.log("sampe sini perubahan", event.target.files[0]);
  const file = event.target.files[0];
  const allowedFormats = [
    "image/jpeg",
    "image/JPEG",
    "image/jpg",
    "image/JPG",
    "image/png",
    "image/PNG",
    "image/gif",
    "image/GIF",
    "image/bmp",
    "image/BMP",
  ];
  if (!allowedFormats.includes(file.type)) {
    isImageFormatTypeError.value = true;
  } else {
    isImageFormatTypeError.value = false;
  }

  // Validasi ukuran gambar
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    isImageSizeError.value = true;
  } else {
    isImageSizeError.value = false;
  }
};
</script>

<template>
  <main class="min-h-screen p-10">
    <div class="border border-gray-700 p-5 rounded-md mb-5">
      <p class="text-neutral font-bold text-3xl mb-5">UPLOAD YOUR IMAGE</p>

      <div class="flex justify-between">
        <button
          class="btn btn-neutral w-fit flex items-center"
          onclick="my_modal_1.showModal()"
        >
          <span class="font-bold scale-125">+</span> Upload Image
        </button>

        <div class="font-semibold flex gap-5">
          <div class="p-3 text-neutral rounded-md border border-gray-700 px-5">
            Total : {{ dataFromLocalStorage.length }}
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" class="modal">
        <div
          class="modal-box w-[1000px] min-h-[200px] border border-gray-700 relative"
        >
          <div class="relative">
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              v-if="isUploadError"
            >
              <div
                class="bg-neutral rounded-xl p-3 flex flex-col justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-16 h-16 text-error"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>

                <p class="text-error font-semibold">Error upload file</p>
              </div>
            </div>
            <form v-on:submit="(e) => HandleSubmit(e)">
              <div class="flex justify-between">
                <p class="mb-1 text-sm">
                  Image format must be jpg,jpeg,bmp,png,gif
                </p>
                <p class="mb-1 text-sm">Max Size 2MB</p>
              </div>
              <input
                type="file"
                class="file-input w-full bg-gray-700 mb-3"
                name="image"
                @change="ValidateImage"
              />
              <div class="mb-5 flex flex-col gap-2 absolute">
                <div
                  class="bg-red-400 border border-red-500 rounded-md px-2 text-sm text-white animate-pulse"
                  v-if="isImageSizeError"
                >
                  Ukuran gambar terlalu besar
                </div>
                <div
                  class="bg-red-400 border border-red-500 rounded-md px-2 text-sm text-white animate-pulse"
                  v-if="isImageFormatTypeError"
                >
                  Format gambar tidak sesuai
                </div>
              </div>
              <div class="flex justify-end">
                <button class="btn btn-neutral" type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div class="absolute bottom-[2.5rem] right-32">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button
                class="py-3 px-6 font-semibold rounded-lg border border-gray-700 active:scale-95 transition duration-150"
                id="close-button"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
    <!-- Card Container -->
    <input
      type="text"
      placeholder="Search. . ."
      @change="(e) => SearchFilterData(e.target.value)"
      class="input w-full max-w-xs border border-gray-700"
    />
    <div
      class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 border border-gray-700 p-5 rounded-md"
    >
      <div v-if="dataFromLocalStorage.length == 0">Data is empty</div>
      <div v-for="item in dataFromLocalStorage" :key="item.id">
        <Card
          :imageSource="item.display_url"
          :fileName="item.title"
          :size="item.size"
          :width="item.width"
          :height="item.height"
        />
      </div>
    </div>
    <!-- Card Container -->
  </main>
</template>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="isOpen=false" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-todo-black/25"/>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md md:max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="div"
                class="flex justify-between items-center"
              >
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-todo-light-bg/10 px-8 py-2 text-sm font-medium text-todo-black hover:bg-todo-light-bg/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-todo-black focus-visible:ring-offset-2"
                  @click="isOpen=false"
                >
                  cancel
                </button>

                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-todo-light-bg px-8 py-2 text-sm font-medium text-white hover:bg-todo-light-bg/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="addTask"
                >
                  save
                </button>
              </DialogTitle>
              <div class="mt-6 w-full">
                <div class="w-full">
                  <label for="title" class="block text-xl font-medium leading-6 text-todo-black">Title</label>
                  <div class="mt-2">
                    <input type="text" name="title" id="title"
                           v-model="form.title"
                           placeholder="add a title ..."
                           class="block w-full rounded-md border-0 py-1.5 text-todo-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-todo-black sm:text-sm sm:leading-6"/>
                  </div>
                </div>

                <div class="mt-4">
                  <label for="description"
                         class="block text-xl font-medium leading-6 text-todo-black">Description</label>
                  <div class="mt-2">
                        <textarea id="description" name="description" rows="3" v-model="form.description"
                                  class="block w-full rounded-md border-0 py-1.5 text-todo-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-todo-black focus:ring-2 focus:ring-inset focus:ring-todo-black sm:text-sm sm:leading-6"/>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-todo-black">give a short description for the task.</p>
                </div>

                <div class="mt-4">
                  <p class="block text-xl font-medium leading-6 text-todo-black">Tags</p>
                  <div class="mt-2">
                    <div class="flex gap-4">
                      <div v-for="tag in taskStore.tags"
                           @click="selectTag(tag.id)"
                           :class="form.tags.findIndex((t) => t === tag.id) >= 0 ? 'bg-gray-100': ''"
                           class="flex gap-2 items-center cursor-pointer px-1.5 py-2 rounded-md hover:bg-gray-100">
                        <div class="rounded-full shrink-0 h-4 w-4" :class="tag.color"/>
                        <p class="text-todo-black text-xs">{{ tag.name }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {useTaskStore} from "@/stores/taskStore";
import {reactive, ref, defineProps, watch} from "vue";
import type {IForm} from "@/types/form";

const taskStore = useTaskStore()
const isOpen = ref(false)
const emit = defineEmits(['taskAdded'])

const props = defineProps({
  form: {
    type: Object,
    default: {
      id: null,
      title: null,
      description: null,
      tags: []
    }
  },
})

const form = reactive<IForm>({
  title: null,
  description: null,
  tags: []
})

const addTask = () => {
  if (form.title && form.tags.length > 0) {
    emit('taskAdded', form)
    closeDialog()
  } else {
    console.error('validation error!')
  }
}

const selectTag = (id: number) => {
  const idx = form.tags.findIndex((tagId) => tagId === id);
  idx === -1 ? form.tags.push(id) : form.tags.splice(idx, 1);
}

watch(() => isOpen.value, (newValue) => {
  if (newValue) {
    form.id = props.form.id
    form.title = props.form.title
    form.description = props.form.description
    form.tags = props.form.tags
  }
})

const openDialog = () => {
  isOpen.value = true
}

const closeDialog = () => {
  form.title = null
  form.description = null
  form.tags = []
  isOpen.value = false
}

defineExpose({
  openDialog, closeDialog
})
</script>
<template>
  <div class="w-full h-full border border-todo-black/20 shadow flex rounded-xl overflow-hidden">
    <!--side nav desktop view -->
    <aside class="animate-in slide-in-from-right duration-500 hidden sm:flex h-full w-1/4 bg-gray-50 flex-col py-8 px-4">
      <!--side nav title -->
      <div class="px-4 py-8">
        <h2 class="text-4xl font-bold text-todo-black">todo</h2>
      </div>

      <div class="flex flex-1 flex-col py-8 px-4">
        <!-- tags -->
        <ul class="flex flex-col gap-6 w-full">
          <li v-for="tag in taskStore.tags"
              :class="taskStore.filters.tags.findIndex((t) => t === tag.id) >= 0 ? 'border-l-4': ''"
              class="flex space-x-2 items-center cursor-pointer hover:opacity-80 p-2"
              @click="selectTagFilters(tag.id)"
          >
            <div class="shrink-0 w-6 h-6 bg-indigo-300 rounded-full" :class="tag.color"/>
            <p class="tracking-wide text-sm text-todo-black">{{ tag.name }}</p>
          </li>
        </ul>

        <div class="mt-auto relative flex items-start">
          <div class="flex h-6 items-center">
            <input id="complete-side-nav" aria-describedby="complete-side-nav" name="comments" type="checkbox"
                   v-model="hideCompleted"
                   class="h-4 w-4 rounded border-gray-300 text-todo-light-bg focus:ring-todo-light-bg"/>
          </div>
          <div class="ml-3 text-sm leading-6">
            <label for="complete-side-nav" class="font-medium text-todo-black/60">hide completed</label>
          </div>
        </div>
      </div>

      <!-- cosmetics -->
      <div class="flex flex-col p-4">
        <icon-person/>
        <RouterLink to="/about" class="text-xs text-todo-light-bg">about this project...</RouterLink>
      </div>
    </aside>

    <!-- main container -->
    <div class="h-full w-full sm:w-3/4 bg-gray-50">
      <div class="w-full flex items-center justify-between sm:justify-end pt-16 pb-4 px-4">
        <h2 class="sm:hidden text-4xl font-bold text-todo-black">todo</h2>
        <button class="text-todo-black hover:opacity-80" @click="taskDialog?.openDialog">
          <PlusIcon class="h-12"/>
        </button>
      </div>

      <div class="sm:hidden flex px-4">
        <ul class="flex gap-2 w-full">
          <li v-for="tag in taskStore.tags" class="rounded-xl border px-2 py-1 hover:opacity-80 cursor-pointer"
              @click="selectTagFilters(tag.id)"
              :class="[taskStore.filters.tags.findIndex((t) => t === tag.id) >= 0 ? 'border-b-4': '', tag.color]">
            <span class="text-sm text-todo-black">{{ tag.name }}</span>
          </li>
        </ul>
      </div>

      <div class="h-5/6 overflow-auto px-4 mt-4">
        <div class="animate-in slide-in-from-top duration-500 grid grid-cols-1 sm:grid-cols-2 gap-4" ref="tasksContainer">
          <!-- task card -->
          <div v-if="taskStore.tasks.length > 0" v-for="task in taskStore.filteredTasks"
               :key="task.id"
               class="w-full h-60 flex flex-col rounded-md bg-todo-yellow shadow-todo-light-bg/40 shadow px-4 pt-5 pb-3">
            <div class="flex justify-between text-todo-black items-center">
              <h3 class="font-bold text-xl tracking-tight leading-6" :class="[task.completed ? 'line-through': '']">
                {{ task.title }}</h3>

              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton>
                    <ChevronDownIcon class="-mr-1 h-5 w-5 text-todo-black" aria-hidden="true"/>
                  </MenuButton>
                </div>

                <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-slot="{ active }">
                        <span
                          @click="editTask(task)"
                          :class="[active ? 'bg-todo-light-bg/40 text-todo-black' : 'text-todo-black/80', 'block px-4 py-2 text-sm']">
                          edit
                        </span>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <span
                          @click="removeTask(task.id)"
                          :class="[active ? 'bg-todo-light-bg/40 text-todo-black' : 'text-todo-black/80', 'block px-4 py-2 text-sm']">
                          remove
                        </span>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>


            </div>
            <div class="flex-1 h-2/3 text-pretty pt-4">
              <p class="text-xs text-todo-black tracking-wide line-clamp-6 leading-5"
                 :class="[task.completed ? 'line-through': '']">{{ task.description }}</p>
            </div>
            <div class="flex justify-between">
              <div class="flex gap-1">
                <div v-for="tag in task.tags" class="rounded-full h-4 w-4 bg-indigo-300"
                     :class="taskStore.getTag(tag).color"/>
              </div>

              <div class="mt-auto relative flex items-start">
                <div class="flex h-6 items-center">
                  <input id="complete-task-card" aria-describedby="complete-task-card" name="comments" type="checkbox"
                         v-model="task.completed"
                         class="h-4 w-4 rounded border-gray-300 text-todo-light-bg focus:ring-todo-light-bg"/>
                </div>
                <div class="ml-2 text-xs leading-6">
                  <label for="complete-task-card" class="font-medium text-todo-black/60">Completed</label>
                </div>
              </div>

            </div>
          </div>

          <div v-else class="col-span-2 h-96 flex flex-col items-center justify-center">
            <IconConfused/>
            <p class="text-center sm:text-left font-extralight italic text-todo-light-bg">no tasks has been recorded
              yet. add a task to start tracking them...</p>
          </div>

        </div>
      </div>
    </div>

    <TaskDialog ref="taskDialog" @taskAdded="storeTask" :form="taskSelected"/>
  </div>
</template>

<script setup lang="ts">
import {PlusIcon} from "@heroicons/vue/24/solid";
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {ChevronDownIcon} from '@heroicons/vue/20/solid'
import IconPerson from "@/components/icons/IconPerson.vue";
import IconConfused from "@/components/icons/IconConfused.vue";
import {ref, watch} from "vue";
import {useTaskStore} from "@/stores/taskStore";
import TaskDialog from "@/components/TaskDialog.vue";
import type {IForm} from "@/types/form";
import type {ITask} from "@/types/tasks";
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const taskStore = useTaskStore()
const hideCompleted = ref(false)
const taskDialog = ref<typeof TaskDialog | null>(null)
const [tasksContainer] = useAutoAnimate()
const taskSelected = ref<IForm>({
  id: null,
  title: null,
  description: null,
  tags: []
})

const storeTask = (formData: IForm) => {
  const task: ITask = {
    id: formData.id || Math.random().toString(36).substr(2, 10),
    title: formData.title,
    description: formData.description,
    tags: formData.tags
  };

  if (formData.id) {
    // this is for update
    taskStore.updateTask(task)
  } else {
    // this to add new tasks
    task.completed = false
    taskStore.addTask(task)
  }
}

const editTask = (task: ITask) => {
  taskSelected.value = {
    id: task.id,
    title: task.title,
    description: task.description,
    tags: task.tags
  }
  taskDialog.value?.openDialog()
}

const removeTask = (id: string) => {
  taskStore.removeTask(id)
}

const selectTagFilters = (id: number) => {
  const idx = taskStore.filters.tags.findIndex((tag) => tag === id)
  idx === -1 ? taskStore.filters.tags.push(id) : taskStore.filters.tags.splice(idx, 1);
}

watch(() => hideCompleted.value, (newValue) => {
  newValue ? taskStore.filters.completed = newValue : taskStore.filters.completed = undefined
})
</script>

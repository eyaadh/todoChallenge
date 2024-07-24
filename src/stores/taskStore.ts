import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";
import type {ITask} from "@/types/tasks";
import {computed, ref} from "vue";
import type {IFilter} from "@/types/filters";

export const useTaskStore = defineStore("tasks", () => {
    const tasks = useStorage("tasks", [] as ITask[]);
    const filters = ref<IFilter>({
        completed: undefined,
        tags: []
    });

    const filteredTasks = computed(() => {
        return tasks.value.filter(task => {
            const statusMatch = filters.value.completed === undefined ||
                (filters.value.completed === true ? !task.completed : filters.value.completed === false ? task.completed : true);
            const tagsMatch = !filters.value.tags.length || filters.value.tags.every(tag => task.tags.includes(tag));
            return statusMatch && tagsMatch;
        });
    });

    const tags = [
        {
            id: 1,
            name: "work",
            color: "bg-blue-200"
        },
        {
            id: 2,
            name: "study",
            color: "bg-indigo-100"
        },
        {
            id: 3,
            name: "entertainment",
            color: "bg-red-200"
        },
        {
            id: 4,
            name: "family",
            color: "bg-lime-300"
        }
    ]

    function addTask(t: ITask) {
        tasks.value.push(t)
    }

    function updateTask(t: ITask) {
        // find the task and update its content
        const idx = tasks.value.findIndex(xt => xt.id === t.id);

        if (idx !== -1) {
            tasks.value[idx] = {...tasks.value[idx], ...t};
        }
    }

    function removeTask(id: string) {
        const idx = tasks.value.findIndex((task) => task.id === id)
        tasks.value.splice(idx, 1);
    }

    function getTag(id: number) {
        const idx = tags.findIndex((tag) => tag.id === id)
        return tags[idx]
    }

    return {tasks, tags, filteredTasks, filters, addTask, updateTask, removeTask, getTag};
});

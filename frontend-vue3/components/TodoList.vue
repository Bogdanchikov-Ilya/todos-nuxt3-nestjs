<template>
  <div class="p-5 container mx-auto max-w-2xl border mt-10">
    <TodoCreateTaskModal v-if="isOpenCreateTaskModal"
                         @closeModal="closeModal"
                         @updateTasksList="tasksList.refresh"
    />
<!--    {{tasksList.data}}-->
<!--    {{data}}-->
    <ul class="d-flex flex-column gap-3 p-0">
      <todo-list-item v-for="(item, index) in sortedTasksList"
      :key="item.id"
      :id="item.id"
      :name="item.title"
      :complete="item.completed"
      @deleteTaskItem="deleteTaskItem"
      @saveTaskItemName="saveTaskItemName($event, item.id)"
      @finishTask="finishTask($event, item.id)" />
  </ul>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="openCreateTaskModal">Добавить задачу</button>
  </div>
</template>
<script setup lang="ts">
import { TaskItem } from "~/models/taskItem.model";
import * as taskService from '@/services/tasksService'

const sortedTasksList = computed(() => tasksList.value.data.sort(function(a: any, b:any) {
  if (a.completed < b.completed) return -1;
  if (a.completed > b.completed) return 1;
  return 0;
}))

let isOpenCreateTaskModal = ref<boolean>(false)
let tasksList = ref(await taskService.getTasks() as any)

const closeModal = ():void => {
  isOpenCreateTaskModal.value = false
}
const openCreateTaskModal = ():void => {
  isOpenCreateTaskModal.value = true
}
const deleteTaskItem = async (id:number) => {
  await taskService.deleteTask(id)
  await tasksList.value.refresh()
}
const finishTask = async (value:boolean, id:number): Promise<void> => {
  console.log(id)
  await taskService.updateTask(id, {completed: value})
  await tasksList.value.refresh()
}
const saveTaskItemName = async (value:string, id:number): Promise<void> => {
  await taskService.updateTask(id, {title: value})
  await tasksList.value.refresh()
}
</script>
<style>
.add-task{
  position: fixed;
  bottom: 2rem;
  left: 50%
}
</style>

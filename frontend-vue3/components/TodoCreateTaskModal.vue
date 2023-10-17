<template>
  <div class="modal-background w-full absolute bg-black opacity-50"></div>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-amber-500 border z-20 bg-white p-8">
  <div class="modal-dialog">
    <div class="modal-content flex flex-col gap-3">
      <div class="modal-header flex justify-between">
        <h5 class="modal-title">Добавление задачи</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group flex flex-col">
          <label for="exampleInputPassword1">Текст</label>
          <input type="text" class="border px-1.5 py-1 rounded focus:outline-none" id="exampleInputPassword1" placeholder="Текст" v-model="taskText">
        </div>
      </div>
      <div class="modal-footer flex gap-2">
        <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="createTask">Добавить задачу</button>
        <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" data-dismiss="modal" @click="emit('closeModal')">Закрыть</button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
// import { useTodoStore } from '~/stores/todo.ts'
// const todoStore = useTodoStore()
import * as taskService from '@/services/tasksService'

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateTasksList'): void
}>()

let taskText = ref<string>('')
const createTask = async () => {
  const data = {
    title: taskText.value,
    completed: false
  }
  await taskService.createTask(data)
  emit('updateTasksList')
  closeModal()
}

const closeModal = ():void => {
  emit('closeModal')
}

</script>

<style>
.modal-background {
  top: 0;
  left: 0;
  position: fixed;
  background: black;
  opacity: .5;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
.modal{
  display: flex;
}
</style>
<template>
  <li class="flex my-3 gap-3" style="flex: 1">
    <input type="checkbox" class="form-check-input" :checked="complete" @change="changeChechbox">
    <input :value="name" class="fw-bold mx-2" style="flex: 1" v-show="isEdit" ref="input">
    <span class="fw-bold mx-2" style="flex: 1" v-show="!isEdit && !complete">{{ name }}</span>
    <del class="fw-bold mx-2" style="flex: 1" v-show="!isEdit && complete">{{ name }}</del>
    <div class="flex gap-4">
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteTaskItem">Удалить</button>
      <button class="btn btn-outline-primary" v-if="isEdit" @click="saveNewTaskName">Сохранить</button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="setEditTaskName" v-else>Редактировать</button>
    </div>
  </li>
</template> 
<script setup lang="ts">
// import { ref, nextTick } from 'vue'
const props = defineProps<{
  name: string,
  complete: boolean,
  id: number
}>()
const emit = defineEmits<{
  (e: 'deleteTaskItem', id:number): void,
  (e: 'finishTask', completed:boolean) :void,
  (e: 'saveTaskItemName', name:string): void
}>()

const isEdit = ref<boolean>(false)

const input = ref<object>({})

function deleteTaskItem() {
  emit('deleteTaskItem', props.id)
}
function changeChechbox(event: any) {
  emit('finishTask', event.target.checked)
}
async function setEditTaskName() {
  isEdit.value = true
  await nextTick()
  input.value.focus()
}
function saveNewTaskName() {
  isEdit.value = false
  emit('saveTaskItemName', input.value.value)
}
</script>

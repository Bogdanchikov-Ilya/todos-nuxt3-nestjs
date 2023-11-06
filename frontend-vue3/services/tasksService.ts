import {useMyFetch} from "~/composables/useMainApi";
import {TaskItem} from "~/models/taskItem.model";
import {taskErrors} from "~/models/taskError.model";
import { useCookie } from "#app";


export function validateTask(data: any): taskErrors {
  const errors: taskErrors = {}
  if (!data.title) {
    errors.title = 'Не введен текст задачи'
  }
  return errors
}

export async function getTasks() {
  const token = useCookie('token');
  console.log(token.value);
  try {
    const res = await useMyFetch('api/task', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
      // method: "POST",
    })
    return res
  } catch(e) {
    console.log(e);
    throw e
  }
}

// export async function getTaskById(id: number): Promise<TaskItem | null> {
//   const {data} = await useMainApi<TaskItem>(`api/task/${id}`);
//   return data.value
// }
//
export async function createTask(data) {
  const token = useCookie('token');
  const res = await useMyFetch<TaskItem>(`api/task`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  });
  return res
}
//
export async function updateTask(id: number, payload: any): Promise<TaskItem | null> {
  const token = useCookie('token');
  const {data} = await useMyFetch<TaskItem>(`api/task/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    body: payload
  });
  return data.value
}

export async function deleteTask(id: number) {
  const token = useCookie('token');
  const res = useMyFetch<TaskItem>(`api/task/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    method: 'DELETE',
  })
  return res
}
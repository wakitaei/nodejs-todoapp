const taskIDDOM = document.querySelector(".task-edit-id"); // クラス名でコロン
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

// console.log(params);
// ?id=649a5a45b52396e2ae3f176a

// console.log(id);
// 649a5a45b52396e2ae3f176a

// 1つの特定のタスクを取得する
const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    // console.log(task);
    const { _id, name, completed } = task;
    taskIDDOM.textContent = _id;
    taskNameDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
};

showTask();

// タスクの編集
editFormDOM.addEventListener("submit", async (e) => {
  console.log("submit");
  e.preventDefault();

  try {
    // inputの編集後の値
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    console.log(taskName);

    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });

    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "編集に成功しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
  }

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

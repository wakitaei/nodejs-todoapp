const tasksDOM = document.querySelector(".tasks");

const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// タスクを全件取得する
const showTasks = async () => {
  try {
    // 分割代入でdataを取得、tasksで別名
    const { data: tasks } = await axios.get("/api/v1/tasks");
    // console.log(tasks);

    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
      return;
    }

    const allTasks = tasks
      .map((task) => {
        // console.log(task);
        const { completed, _id, name } = task;

        return `<div class="single-task ${completed && "task-completed"}">
      <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
      <div class="task-links">
        <a href="edit.html?id=${_id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`;
      })
      .join("");
    // allTasksは配列で返されるためjoinでカンマを除く
    // console.log(allTasks);
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};

showTasks();

// タスクを新規作成する
formDOM.addEventListener("submit", async (event) => {
  // デフォルトでは同じページに遷移してリロードされる。
  // 非同期通信ではリロードは不要のためイベントからリロードを阻止する
  event.preventDefault();

  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", { name: name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "タスクを追加しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
  }

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
  // <div class="form-alert" style="display: none;">無効です。もう一度やり直してください。</div>
});

// タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
  // クリックしたところの要素が取れる
  const element = event.target;

  // <i class="fas fa-trash"></i>
  console.log(element);
  // <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
  console.log(element.parentElement);

  if (element.parentElement.classList.contains("delete-btn")) {
    try {
      const id = element.parentElement.dataset.id;

      await axios.delete(`/api/v1/tasks/${id}`, "");
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});

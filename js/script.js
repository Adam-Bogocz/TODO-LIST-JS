{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const changeToAllDone = () => {
        tasks = tasks.map((task) => ({ ...task, done: true }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const showHiddenElement = (buttonName) => {
        buttonName.classList.remove("button--hidden");
    }

    const hideButtons = (buttonName) => {
        buttonName.classList.add("button--hidden");
    }

    const bindButtonsEvents = () => {
        const hideDoneTasksButton = document.querySelector(".js-hidden-done");
        const changeToAllDoneButton = document.querySelector(".js-all-done");

        hideDoneTasksButton.addEventListener("click", () => {
            toggleHideDoneTasks();
        });

        changeToAllDoneButton.addEventListener("click", () => {
            changeToAllDone();
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item${(hideDoneTasks && task.done) ? " itemTasks__hidden" : ""}">
                    <button class="list__button list__button--toggleDone js-done">
                        ${task.done ? "✔" : ""}
                    </button>    
                    <span class="${task.done ? " list__item--done" : ""}">${task.content}</span>
                    <button class="list__button list__button--remove js-remove">
                        🗑
                    </button>
                </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");
        tasks.length ? showHiddenElement(buttonsElement) : hideButtons(buttonsElement);

        buttonsElement.innerHTML = `
            <button class="tasksList__item header__button js-hidden-done">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
            <button class="tasksList__item header__button js-all-done"${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>`;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();                
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}
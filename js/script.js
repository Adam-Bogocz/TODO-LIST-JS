{
    let tasks = [];
    let hideDoneTasks = false;      // zmienna używana do ukrywania przycisków - kliknięcie w przycisk musi ją przełączać

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
        console.log(tasks);
        render();
    };

    const changeToAllDone = () => {
        tasks = tasks.map((task) => ({...task, done:true}));
        render();
    };

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

    // function toggleArticleHidden(buttonName) {
    //     buttonName.classList.toggle("article--hidden");
    // }

    // function addArticleHidden(buttonName) {
    //     buttonName.classList.add("article--hidden");
    // }

    const bindButtonsEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-hidden-done");
        const changeToAllDoneButton = document.querySelectorAll(".js-done-all");

        changeToAllDoneButton.forEach((changeToAllDoneButton, index) => {
            changeToAllDoneButton.addEventListener("click", () => {
                changeToAllDone(index);
            });
        });
    };


    // tutaj pojawią się eventLitener do przycisków  np. ukończ zadania który czasem jest (jeżeli ...)

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
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

    const renderButtons = () => { };         // funkcja do renderowania przycisków

    const render = () => {              // podzielić render na 2 rózne funkcje jak wyżej
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();                                    // w przycisku ukrytym dodajemy atrybut disabled
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
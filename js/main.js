let elem_global = document.getElementById('body'), elem_mouse

elem_global.addEventListener('mousemove', function(event) {
let x = event.clientX;
let y = event.clientY;

elem_mouse = document.elementFromPoint(x, y)
})


// #region Page Maps
function page_map() {
    page = "map"

    document.querySelector('#body').innerHTML =
    `
    <div class="img__bg"></div>
    <div class="img__shadow"></div>

    <div class="container" id="container">
    </div>
    `

    document.querySelector('#container').innerHTML =
    `
    <div class="choose__block">
            <h2 class="choose__block__title">Выберите карту</h2>
            <hr class="choose__block__hr">
            <div style="display: flex; justify-content: space-evenly; margin-top: 25px;">

                <div class="choose__block__slot" onclick="map_choose_black(); page_form_name();" id="black">
                    <div class="choose__block__slot__color choose__block__slot_black">
                        <a class="choose__block__slot__button choose__block__slot__button__white">Тёмная</a>
                    </div>
                </div>

                <div class="choose__block__slot" onclick="map_choose_white(); page_form_name();" id="white">
                    <div class="choose__block__slot__color choose__block__slot_white">
                        <a class="choose__block__slot__button choose__block__slot__button__black">Светлая</a>
                    </div>
                </div>
            </div>
    </div>
    `
}

// #endregion

// #region Page Form Name

function page_form_name() {
    document.querySelector('#container').innerHTML =
    `
    <div class="choose__block choose__block__form">
            <h2 class="choose__block__title">Введите имя</h2>
            <hr class="choose__block__hr">
            <div style="display: flex; justify-content: space-evenly; margin-top: 25px;">
                <div style="display: flex; flex-direction: column;">
                    <input class="choose__block__input" id="username" placeholder="Username">
                    <button class="choose__block__form__button" onclick="page_game_field()">Начать</button>
                </div>
            </div>
        </div>
    `
}

// #endregion

// #region Page game field

function page_game_field() {

    page = 'game'
    console.log(page)
    username = document.querySelector('#username').value

    if (username == '') {
        username = 'User';
    }

    document.querySelector('#body').innerHTML =
    `
    <div class="block__window" ></div>

    <div class="img__shadow"></div>
    
    <div style="position: absolute; display: flex; justify-content: space-between; width: 100%;">
        <div class="gui__block" id="block_gui_hp">
        </div>

        <div class="gui__center" style="width: auto;">
            <h2 class="player__name">${username}</h2>
        </div>

        <div class="gui__center" style="width: 200px;">
            <h2 class="player__name" id="timer">00:00</h2>
        </div>

    </div>

    <div style="position: absolute; display: flex; align-items: end; justify-content: end; width: 100%; height: 100%;">
        <div class="gui__center" style="width: 200px; z-index: 12;">
            <h2 class="player__name" id="os_time">00:00:00</h2>
        </div>
    </div>

    <div class="container_field" id="container">
        <div class="player" id="player"></div>
    </div>

    `   

    time_seconds = 0; time_minutes = 0;
    hp = 5;
    array_enemys = [];
    count_enemys = 10;
    pause = false;
    game_stop = false
    x = 0;
    y = 0;
    destroy_enemys = 0
    active_trap = 0

    if (!game_start_function)
    {
        timer();
        update_pos_enemy();
        collision();

        setInterval(() => {

            check_hp_none();

            for (let i = 0; i < 3; i++)
            {
                spawn_enemy()
            }
    
            for (let i = 0; i < 1; i++){
                trap_spawn()
            }
        }, 500) 
    }

    system_time();
    draw_hp();
    spawn_finish();
    enemy_create();

    game_start_function = true

    let player = document.querySelector('#player');

    x = 100
    y = 919/2

    player.style.left = `${x}px`
    player.style.top = `${y}px`


    if (map == "white") {
        let body_elem = document.querySelector('#body')
        body_elem.style.background = "#d8d8d8";
    } else {
        let body_elem = document.querySelector('#body')
        body_elem.style.background = "rgb(90, 90, 90)";
    }
}

// #endregion

// #region Timer

function timer() {
    setInterval(() => {

        if (!pause && !game_stop)
        {
            let time_elem = document.querySelector('#timer')

            time_seconds += 1;

            if (time_seconds == 60) {
                time_seconds = 0;
                time_minutes += 1;
            }

            if (time_seconds < 10 && time_minutes < 10) {
                time_elem.innerHTML = '0' + time_minutes + ':' + '0' + time_seconds
            }
            if (time_seconds >= 10 && time_minutes < 10) {
                time_elem.innerHTML = '0' + time_minutes + ':' + time_seconds
            }

            if (time_seconds >= 10 && time_minutes >= 10) {
                time_elem.innerHTML = time_minutes + ':' + time_seconds
            }
        }
        
    }, 1000)
}

// #endregion

// #region System Time

function system_time() {

    let os_time_elem = document.querySelector('#os_time')

    let current_data = new Date();
        let os_time_sec = current_data.getSeconds();
        let os_time_min = current_data.getMinutes();
        let os_time_hour = current_data.getHours();

        if (os_time_sec < 10) {
            os_time_sec = '0' + os_time_sec
        }

        if (os_time_min < 10) {
            os_time_min = '0' + os_time_min
        }

        if (os_time_hour < 10) {
            os_time_hour = '0' + os_time_hour
        }


        os_time_elem.innerHTML = `${os_time_hour}:${os_time_min}:${os_time_sec}`

    setInterval(() => { 

        let current_data = new Date();
        let os_time_sec = current_data.getSeconds();
        let os_time_min = current_data.getMinutes();
        let os_time_hour = current_data.getHours();

        if (os_time_sec < 10) {
            os_time_sec = '0' + os_time_sec
        }

        if (os_time_min < 10) {
            os_time_min = '0' + os_time_min
        }

        if (os_time_hour < 10) {
            os_time_hour = '0' + os_time_hour
        }

        os_time_elem.innerHTML = `${os_time_hour}:${os_time_min}:${os_time_sec}`

    }, 1000)
}

// #endregion

// #region Map Check

function map_choose_black() {
    map = 'black';
    console.log(map)
}

function map_choose_white() {
    map = 'white';
    console.log(map)
}

// #endregion

// #region Enemy create

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function enemy_create() {

        let body = document.querySelector('#body')

        let room_width = 1850;
        let room_height = 800;

        for (let i = 0; i < count_enemys; i++) {

            let dir_num = getRandomInt(4)
            let direction = '';
            if (dir_num == 0) {direction = 'top';}
            else if (dir_num == 1) {direction = 'right';}
            else if (dir_num == 2) {direction = 'bottom';}
            else if (dir_num == 3) {direction = 'left';}

            document.querySelector('.container_field').innerHTML +=
            `
            <div class="enemy ${direction}" id="enemy" ></div>
            `

            let enemy_list = document.querySelectorAll("#enemy")

            let color = getRandomInt(2)

            if (color == 1) 
            { 
                enemy_list[i].style.background = 'linear-gradient(rgb(255, 0, 0), rgb(75, 0, 0))'
            } else { 
                enemy_list[i].style.background = 'linear-gradient(rgb(143, 195, 255), rgb(0, 75, 145))' 
            }

            let enemy_x = getRandomInt(room_width);
            let enemy_y = getRandomInt(room_height);

            enemy_list[i].style.left = enemy_x + 'px';
            enemy_list[i].style.top = enemy_y + 'px';
        }
    }

// #endregion

// #region Update pos enemy

    function update_pos_enemy() {

        setInterval(() => {

            if (!pause)
            {
                if (count_enemys > 0)
                {   

                    for (let i = 0; i < count_enemys; i++) {

                        let enemy_list = document.querySelectorAll(`#enemy`);
                        let clases = enemy_list[i].className.split(' ')
                        enemy_step(enemy_list[i], clases)

                        let enemy_css = window.getComputedStyle(enemy_list[i])
                        let enemy_x = Number(enemy_css.left.slice(0, -2));
                        let enemy_y = Number(enemy_css.top.slice(0, -2));

                        if (enemy_x < -50) { enemy_list[i].remove(); console.log('enemy delete', count_enemys); count_enemys--;}
                        if (enemy_x > 1920) { enemy_list[i].remove(); console.log('enemy delete', count_enemys); count_enemys-- }
                        if (enemy_y < -50) { enemy_list[i].remove(); console.log('enemy delete', count_enemys); count_enemys-- }
                        if (enemy_y > 900) { enemy_list[i].remove(); console.log('enemy delete', count_enemys); count_enemys-- }

                    }
                }
            }

        }, 50);
    }


    function enemy_step(enemy, clases) {

        let enemy_css = window.getComputedStyle(enemy)

        let enemy_x = Number(enemy_css.left.slice(0, -2));
        let enemy_y = Number(enemy_css.top.slice(0, -2));

        let speed = 5;

        if (clases[1] == 'top') {
            enemy_y -= speed;
            enemy.style.top = enemy_y + 'px';
        }

        if (clases[1] == 'right') {
            enemy_x += speed;
            enemy.style.left = enemy_x + 'px';
        }

        if (clases[1] == 'bottom') {
            enemy_y += speed;
            enemy.style.top = enemy_y + 'px';
        }

        if (clases[1] == 'left') {
            enemy_x -= speed;
            enemy.style.left = enemy_x + 'px';
        }

        // console.log(enemy_x, enemy_y)

        // if (dir >= 0 && dir < 20) {
        //     for (let i = 0; i < step; i++) {
        //         enemy_y -= speed;
        //         enemy.style.top = enemy_y + 'px';
        //     }        
        // }

        // if (dir >= 20 && dir < 40) {
        //     for (let i = 0; i < step; i++) {
        //         enemy_x += speed;
        //         enemy.style.left = enemy_x + 'px';
        //     }
        // }

        // if (dir >= 40 && dir < 60) {
        //     for (let i = 0; i < step; i++) {
        //         enemy_y += speed;
        //         enemy.style.top = enemy_y + 'px';
        //     }
        // }

        // if (dir >= 60 && dir <= 80) {
        //     for (let i = 0; i < step; i++) {
        //         enemy_x -= speed;
        //         enemy.style.left = enemy_x + 'px';
        //     }
        // }
    }

// #endregion

// #region Spawn enemy 

    function spawn_enemy() {
        if (!pause && !game_stop)
        {
            let room_width = 1850;
            let room_height = 800;
            count_enemys ++;

            let dir_num = getRandomInt(4)
            let direction = '';
            if (dir_num == 0) {direction = 'top';}
            else if (dir_num == 1) {direction = 'right';}
            else if (dir_num == 2) {direction = 'bottom';}
            else if (dir_num == 3) {direction = 'left';}


            document.querySelector('.container_field').innerHTML +=
                `
                <div class="enemy ${direction}" id="enemy"></div>
                `

            let enemy_list = document.querySelectorAll(`#enemy`)

            let enemy_x = getRandomInt(room_width);
            let enemy_y = getRandomInt(room_height);

            let color = getRandomInt(2)

            if (color == 1) 
            { 
                enemy_list[count_enemys-1].style.background = 'linear-gradient(rgb(255, 0, 0), rgb(75, 0, 0))'
            } else { 
                enemy_list[count_enemys-1].style.background = 'linear-gradient(rgb(143, 195, 255), rgb(0, 75, 145))' 
            }

            
            enemy_list[count_enemys-1].style.left = enemy_x + 'px';
            enemy_list[count_enemys-1].style.top = enemy_y + 'px';

            console.log('create enemy')
        }
    }

// #endregion

// #region Collision

    function collision() {
        setInterval(() => {

            let enemy_list = document.querySelectorAll('#enemy')

            if (!game_stop)
            {
                for (let i = 0; i < enemy_list.length; i++) {
                    
                    let enemy_css = window.getComputedStyle(enemy_list[i])
                    let enemy_x = Number(enemy_css.left.slice(0, -2));
                    let enemy_y = Number(enemy_css.top.slice(0, -2));
        
                    if (enemy_x + 35 > x + 10 && enemy_x < x + 40 && enemy_y + 35 > y + 10 && enemy_y < y + 40) {
                        enemy_list[i].remove();
                        hp_minus();
                        count_enemys--;
                        destroy_enemys++;
                    }
                }

                let trap_list = document.querySelectorAll('#trap')
                
                for (let i = 0; i < trap_list.length; i++) {
                    let trap_css = window.getComputedStyle(trap_list[i])
                    let trap_x = Number(trap_css.left.slice(0, -2));
                    let trap_y = Number(trap_css.top.slice(0, -2));

                    if (x < trap_x + 35 && x + 45 > trap_x && y - 5 < trap_y + 35 && y + 45 > trap_y) {
                        trap_list[i].remove();
                        hp_minus();
                        active_trap++;
                    }
                }

                let finish = document.querySelector('#finish')

                let finish_css = window.getComputedStyle(finish)
                let finish_x = Number(finish_css.left.slice(0, -2));
                let finish_y = Number(finish_css.top.slice(0, -2));

                if (x - 10 < finish_x + 100 && x + 45 > finish_x && y - 5 < finish_y + 100 && y + 45 > finish_y) {
                    window_win();
                }
            }
        }, 1)
    }

// #endregion

// #region draw hp

    function draw_hp() {

        let block_gui_hp = document.querySelector('#block_gui_hp')

        for (let i = 0; i < hp; i++) {
            block_gui_hp.innerHTML += 
            `
            <div class="gui__block__elem__hp"></div>
            `
        }

    }

    function hp_minus() {

        if (hp > 0) {hp--}

        let elem_hp = document.querySelectorAll('.gui__block__elem__hp')
        let revers_hp = 5 - hp;

        if (hp >= 0) {
            for (let i = hp; i < 5; i++) {
                elem_hp[i].style.background = 'linear-gradient(rgb(0, 0, 0), rgb(37, 37, 37))'
            }
        }
        console.log(hp, elem_hp.length)
    }

// #endregion

// #region spawn trap

    function trap_spawn() {

        if (!pause && !game_stop)
        {
            let room_width = 1850;
            let room_height = 800;

            document.querySelector('.container_field').innerHTML +=
                `
                <div class="trap" id="trap">
                    <img src="./img/ico_danger.png" class="trap__img" alt="">
                </div>
                `

            let trap_list = document.querySelectorAll(`#trap`)

            let trap_x = getRandomInt(room_width);
            let trap_y = getRandomInt(room_height);

            trap_list[trap_list.length-1].style.left = trap_x + 'px';
            trap_list[trap_list.length-1].style.top = trap_y + 'px';
        }
    }

// #endregion

// #region spawn finish

    function spawn_finish() {

        let room_height = 800;

        document.querySelector('.container_field').innerHTML +=
                `
                <div class="finish" id="finish">
                    <div class="finish__center" id="finish_exit">
                        <img src="./img/ico_home.png" class="trap__img" alt="">
                    </div>
                </div>
                `

        let finish = document.querySelector('#finish')

        let finish_x = 1700
        let finish_y = getRandomInt(room_height)

        finish.style.left = finish_x + 'px';
        finish.style.top = finish_y + 'px';
    }

// #endregion

// #region pause

function pause_game() {


    if (pause) {
        document.querySelector('.block__window').innerHTML =
        `
            <div class="pause_background">
                <div class="pause__window">
                    <h2 class="pause__block__title">Пауза</h2>
                </div>
            <div>
        `
    } else {
        document.querySelector('.block__window').innerHTML =
        `
        `
    }
}

// #endregion

// #region Win menu

function window_win() {

    game_stop = true

    time = document.querySelector('#timer').innerHTML

    document.querySelector('.block__window').innerHTML =
    `
    <div class="pause_background">
            <div class="window__win">
                <h2 class="window__win__title">Победа!</h2>
                <hr class="choose__block__hr">
                <p class="window__win__p">Time: ${time}</p>
                <p class="window__win__p">Уничтожено монстров: ${destroy_enemys}</p>
                <p class="window__win__p">Активировано ловушек: ${active_trap}</p>
                <p class="window__win__p">Осталось жизней: ${hp}</p>

                <button class="window__win__button" onclick="page_map()">Играть ещё</button>
                
            </div>
    </div>
    ` 

}

// #endregion

// #region Lose nemu

    function window_lose() {
        game_stop = true
        time = document.querySelector('#timer').innerHTML

        document.querySelector('.block__window').innerHTML =
        `
        <div class="pause_background">
            <div class="window__win">
                <h2 class="window__win__title">Поражение!</h2>
                <hr class="choose__block__hr">
                <p class="window__win__p">Time: ${time}</p>
                <p class="window__win__p">Уничтожено монстров: ${destroy_enemys}</p>
                <p class="window__win__p">Активировано ловушек: ${active_trap}</p>
                <p class="window__win__p">Осталось жизней: ${hp}</p>

                <button class="window__win__button" onclick="page_map()">Играть ещё</button>
                
            </div>
        </div>
        `
        
    }

// #endregion

// #region HP = 0

    function check_hp_none() {
        if (hp == 0) {
            window_lose()
        }
    }

// #endregion

let game_start_function = false;
let page = "map"
let username = "User"
let map;

let time_seconds = 0, time_minutes = 0;
let hp = 5;
let array_enemys = [];
let count_enemys = 10;
let pause = false;
let game_stop = false
let x = 0;
let y = 0;
const speed = 10;

let destroy_enemys = 0
let active_trap = 0

page_map();




document.addEventListener('keydown', (event) => {

    if (page == 'game' && !pause && !game_stop)
    {
        if (event.key === 'w') {
            y -= speed;

        } else if (event.key === 's') {
            y += speed;

        } else if (event.key === 'a') {
            x -= speed;

        } else if (event.key === 'd') {
            x += speed;
        }

        if (event.key === 'w' && event.key ==='d') {
            y -= speed; x += speed;
        }

        player.style.left = `${x}px`;
        player.style.top = `${y}px`;
    }

    if (event.key === "Escape" && page == 'game') {
        if (!pause) {
            pause = true
            pause_game()
        } else {
            pause = false
            console.log(pause)
            pause_game()
        }
    } 
});

function movePlayer(event) {

    if (!pause && !game_stop)
    {
        switch (event.key) {
            case 'ArrowUp':
                y -= speed
                break;
            case 'ArrowDown':
                y += speed
                break;
            case 'ArrowLeft':
                x -= speed
                break;
            case 'ArrowRight':
                x += speed
                break;
            default:
        }

        player.style.left = `${x}px`;
        player.style.top = `${y}px`;
    }

}

setInterval(() => {
    if (page == 'game' && !pause && !game_stop) {
        document.addEventListener('keydown', movePlayer);
    }
}, 1);


console.log(page)

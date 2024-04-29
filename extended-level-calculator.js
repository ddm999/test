window.onload = init;

let cached_collector_levels = {
    1: 0,
    2: 30,
    3: 120,
    4: 250,
    5: 390,
    6: 550,
    7: 730,
    8: 950,
    9: 1210,
    10: 1510,
    11: 1850,
    12: 2240,
    13: 2680,
    14: 3170,
    15: 3710,
    16: 4300,
    17: 4950,
    18: 5650,
    50: 54450,
    100: 233200,
    150: 536950,
    200: 965700,
    250: 1519450,
    300: 2198200,
    350: 3001950,
    400: 3930700,
    450: 4984450,
    500: 6163200,
    550: 7466950,
    600: 8895700,
    650: 10449450,
    700: 12128200,
    750: 13931950,
    800: 15860700,
    850: 17914450,
    900: 20093200,
    950: 22396950,
    1000: 24825700,
    1250: 38844450,
    1500: 55988200,
    1750: 76256950,
    2000: 99650700,
    2500: 155813200,
    3000: 224475700,
    3500: 305638200,
    4000: 399300700,
    4500: 505463200,
    5000: 624125700,
    6000: 898950700,
    7000: 1223775700,
    8000: 1598600700,
    9000: 2023425700,
    10000: 2498250700
};

let collector_level_increment_base = -4;

function init(){
    const input_totalXP = document.getElementById("total-xp");
    const input_lv50XP = document.getElementById("lv50-xp");
    const circle_nextlevel = document.getElementById("next-level-circle");
    const text_curlevel = document.getElementById("current-level");
    const text_curlevelxp = document.getElementById("current-level-xp");
    const text_nextlevelxp = document.getElementById("next-level-xp");

    input_totalXP.oninput = () => {
        if (input_totalXP.value == "")
        {
            input_lv50XP.value = "";
            calculateLevel(0);
        }
        else if (!isNaN(input_totalXP.value))
        {
            let lv50value = parseInt(input_totalXP.value) - cached_collector_levels[50];
            if (lv50value >= 0)
                input_lv50XP.value = lv50value;
            else
                input_lv50XP.value = "";
            calculateLevel(input_totalXP.value);
        }
        else
        {
            calculateLevel(0);
        }
    }

    input_lv50XP.oninput = () => {
        if (input_lv50XP.value == "")
        {
            input_totalXP.value = "";
            calculateLevel(0);
        }
        else if (!isNaN(input_lv50XP.value))
        {
            input_totalXP.value = parseInt(input_lv50XP.value) + cached_collector_levels[50];
            calculateLevel(input_totalXP.value);
        }
        else
        {
            calculateLevel(0);
        }
    }

    function calculateLevel(xp_value){
        let cache_level = Object.keys(cached_collector_levels).reverse().find(key => cached_collector_levels[key] <= xp_value);
        let remaining_xp = xp_value - cached_collector_levels[cache_level];
        let next_level_xp = 0;
        let level = parseInt(cache_level);
        while (true) {
            next_level_xp = cached_collector_levels[level+1]-cached_collector_levels[level];
            if (isNaN(next_level_xp))
                next_level_xp = (level+1+collector_level_increment_base)*50;

            if (remaining_xp >= next_level_xp)
            {
                level++;
                remaining_xp -= next_level_xp;
            }
            else
            {
                break;
            }
        }

        text_curlevel.textContent = level;
        text_curlevel.style.fontSize = "";
        if (level.toString().length>4) {
            text_curlevel.style.fontSize = "12px";
        }
        text_curlevelxp.textContent = remaining_xp.toLocaleString();
        text_nextlevelxp.textContent = next_level_xp.toLocaleString();
        circle_nextlevel.setAttribute("stroke-dasharray", (144.5*remaining_xp/next_level_xp)+" 144.5")
    }
}
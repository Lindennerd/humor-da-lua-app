var apiProd = 'https://humor-da-lua.herokuapp.com/calendar';
var apiDev = "http://localhost:8080/calendar?month=08";

function load_moon_phases(obj, callback){
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText))
        }
    }
    xmlhttp.open("GET", apiDev, true)
    xmlhttp.send()
}

function mark_moon_phases(moon){
    var CSS_selector_identifier = ".contains_day_number" // Put the selector that identifies the boxes that contain the day number in your calendar.
    document.querySelectorAll(CSS_selector_identifier).forEach(function(box,i){
        if (moon.phase[i+1].isPhaseLimit){           
            var url="data:image/svg+xml;utf8, " + moon.phase[i+1].svgMini 
            box.style.backgroundImage ='url("' + url +'")'
            box.style.backgroundSize ="25%"
            box.style.backgroundRepeat ="no-repeat"
            box.style.backgroundPosition ="5px 5px"            
        }
    })
}
    
 
document.addEventListener("DOMContentLoaded", () => {
    var year =  (new Date).getFullYear()
    var month = (new Date).getMonth()    
    create_calendar_to_show_example(year,month)
    var configMoon = {    
        month 		: month + 1,
        year  		: year,    
        lightColor	: "rgb(255,255,100)", 
        shadeColor	: "black" 
    }
    load_moon_phases(configMoon,mark_moon_phases)
})
    
    
    
function create_calendar_to_show_example(year,month){
/*
This function creates a standard calendar to show the example, create yours in the way you think is most convenient (PHP ASP ...).
*/
    var week, box, td
    var table = document.createElement("table")
    table.setAttribute("style","width: 100%; max-width: 700px;margin:auto;font-size: 30px;margin-bottom: 20px;border-collapse: collapse;font-family:sans-serif")
    var tr = document.createElement("tr")
    var th = document.createElement("th")
    th.setAttribute("colspan",7 )
    th.innerHTML =1+ month+"/"+year
    table.appendChild(tr)
    tr.appendChild(th)
    const first_day_week_sunday = false 
    var empty_initial_boxes = new Date(year,month,1).getDay() - 
        (first_day_week_sunday ? 0 : 1)
    var number_days_month = new Date(year, month + 1, 0).getDate()
    var number_weeks_month= Math.ceil((empty_initial_boxes + number_days_month) /7)
    var index = 0
    var number_day = 0
    for (week = 0 ; week < number_weeks_month ; week++){
        tr = document.createElement("tr")
        for (box =0 ; box<7; box++){
            td = document.createElement("td")
            td.setAttribute("style","border:1px solid black;width: calc(100% / 7);padding: 15px 5px 5px 0px;text-align:right;")            
            if (index>=empty_initial_boxes){
                number_day++
                if (number_day <= number_days_month){
                    td.innerHTML= number_day
                    td.className = "contains_day_number"  // We use this class to identify the boxes containing the day numbers.
                    td.style.backgroundColor = "darkgray"
                    if ((new Date).getDate() == number_day) td.style.boxShadow ="inset 0 0 0 2px white"
                    if (new Date(year,month,number_day).getDay()== 0){
                        td.style.backgroundColor="gray"
                        td.style.color="white"
                    }
                }
            }
            index++
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }  
    document.getElementById("ex4").appendChild(table)
}
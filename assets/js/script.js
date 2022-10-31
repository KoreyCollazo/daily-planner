var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));
var nineAmInputEl = document.getElementById("nine");
var saveButton = document.getElementsByClassName("btn btn-info btn-lg")
var nineTime = document.querySelector("body > main > div > div:nth-child(1) > div.col-2 > p")

var planner = [
{
    id: "0",
    hour: "09",
    meridiem: "am",
    plannedEvent: ""
},
{
    id: "1",
    hour: "10",
    meridiem: "am",
    plannedEvent: ""
},
{
    id: "2",
    hour: "11",
    meridiem: "am",
    plannedEvent: ""
},
{
    id: "3",
    hour: "12",
    meridiem: "pm",
    plannedEvent: ""
},
{
    id: "4",
    hour: "01",
    meridiem: "pm",
    plannedEvent: ""
},
{
    id: "5",
    hour: "02",
    meridiem: "pm",
    plannedEvent: ""
},
{
    id: "6",
    hour: "03",
    meridiem: "pm",
    plannedEvent: ""
},
{
    id: "7",
    hour: "04",
    meridiem: "pm",
    plannedEvent: ""
},
{
    id: "8",
    hour: "05",
    meridiem: "pm",
    plannedEvent: ""
},
]

planner.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // create save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})








function renderMessage() {
    var lastEvent = JSON.parse(localStorage.getItem("planner"));
    if (lastEvent !== null) {
      nineAmInputEl.textContent = lastEvent.nineTime
    }
}
  

function saveToLocal(){
    localStorage.setItem("planner", JSON.stringify(planner));
}

function savedMessageAlert() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
    }

    alert('Appointment added to local storage ✓', 'success')
}





for (var i = 0 ; i < saveButton.length; i++) {
    saveButton[i].addEventListener('click', function(){
        saveToLocal()
        savedMessageAlert()
    }) ; 
 }







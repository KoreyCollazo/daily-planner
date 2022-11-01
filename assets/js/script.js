//set current time
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));
var saveButton = document.getElementsByClassName("col-md-1 saveBtn")

//variable holding events
var planner = [
{
    id: "0",
    hour: "09",
    meridiem: "am",
    plannedEvent: "",
    militaryTime: "09"
},
{
    id: "1",
    hour: "10",
    meridiem: "am",
    plannedEvent: "",
    militaryTime: "10"
},
{
    id: "2",
    hour: "11",
    meridiem: "am",
    plannedEvent: "",
    militaryTime: "11"
},
{
    id: "3",
    hour: "12",
    meridiem: "pm",
    plannedEvent: "",
    militaryTime: "12"
},
{
    id: "4",
    hour: "01",
    meridiem: "pm",
    plannedEvent: "",
    militaryTime: "13"
},
{
    id: "5",
    hour: "02",
    meridiem: "pm",
    plannedEvent: "",
    militaryTime: "14"
},
{
    id: "6",
    hour: "03",
    meridiem: "pm",
    plannedEvent: "",
    militaryTime: "15"
},
{
    id: "7",
    hour: "04",
    meridiem: "pm",
    plannedEvent: "",
    militaryTime: "16"
},
{
    id: "8",
    hour: "05",
    meridiem: "pm",
    plannedEvent: "",
    militaryTime: "17"
},
]

planner.forEach(function(eventBlock) {
    // create event row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // create time label
    var hourField = $("<div>")
        .text(`${eventBlock.hour}${eventBlock.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // create event input
    var eventHour = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
    });
    var eventData = $("<textarea>");
    eventHour.append(eventData);
    
    if (eventBlock.militaryTime < moment().format("HH")) {
        eventData.attr ({
            "class": "past eventInput", 
        })
    } else if (eventBlock.militaryTime === moment().format("HH")) {
        eventData.attr({
            "class": "present eventInput"
        })
    } else if (eventBlock.militaryTime > moment().format("HH")) {
        eventData.attr({
            "class": "future eventInput"
        })
    }
    eventData.attr("id", eventBlock.id);

    // create save button
    var saveButton = $("<i class='far fa-save fa-lg bi bi-save'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, eventHour, savePlan);
})

//display localstorage data
function displayEvents() {
    planner.forEach(function (eventBlockA) {
        $(`#${eventBlockA.id}`).val(eventBlockA.plannedEvent);
    })
}

function loadEvents() {
    var savedPlanner = JSON.parse(localStorage.getItem("planner"));

    if (savedPlanner) {
        planner = savedPlanner;
    }

    saveToLocal();
    displayEvents();
}

//Save to local data
function saveToLocal(){
    localStorage.setItem("planner", JSON.stringify(planner));
}

//displays save message
function savedMessageAlert() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
    
}

    alert('Event added to local storage ✓', 'success')
}

//adds event listners
for (var i = 0 ; i < saveButton.length; i++) {
    saveButton[i].addEventListener('click', function(event){
        event.preventDefault();
        var eventIndex = $(this).siblings(".description").children(".eventInput").attr("id");
        planner[eventIndex].plannedEvent = $(this).siblings(".description").children(".eventInput").val();
        saveToLocal()
        displayEvents()
        savedMessageAlert()
    }) ; 
 }








var timeArray = [];
var addedHours = 0;
var addedMinutes = 0;
var addedSeconds = 0;
var totalHours = 0;
var finalSum = '';

var time = ["1:33:27", "2:24:28", "3:22:58", "4:18:52", "1:46:18", "2:41:33", "5:59:29"];

function parseTime(time) {

    for (var i = 0; i < time.length; i++) {

        var arr = [];
        var hours = time[i].substr(0, 1);
        var minutes = time[i].substr(2,2);
        var seconds = time[i].substr(5,2);

        arr = [i, hours, minutes, seconds];

        timeArray[i] = arr;

    }
    
    return timeArray;
    
}

parseTime(time);

function addSeconds(array) {
    
    var sum = 0;
    
    for (var i = 0; i < array.length; i++) {
        
        var num = +array[i][3];
        sum += num;
        
    }
    
    var minutes = 0;
    
    while (sum > 0) {

        if (sum < 60) {
            
            addedSeconds = sum;
            addedMinutes = minutes;
            return;
        }
        
        minutes += 1;
        sum -= 60;
    
    }
    
}

function addMinutes(array) {
    
    var sum = 0;
    
    for (var i = 0; i < array.length; i++) {
        
        var num = +array[i][2];
        var addHours = +array[i][1];
        totalHours += addHours;
        sum += num;
        
    }
    
    var hours = 0;
    
    while (sum > 0) {

        if (sum < 60) {
            
            addedMinutes += sum;
            addedHours = hours
            return;
        }
        
        hours += 1;
        sum -= 60;
    
    }
    
}

addSeconds(timeArray);
addMinutes(timeArray);

function totalTime(hours, extrahours, minutes, seconds) {

    var totalHours = hours + extrahours;
    var minutes = "0" + minutes.toString();
    var seconds = "0" + seconds.toString();
    
    minutes.slice(minutes.length - 2, minutes.length);
    seconds.slice(seconds.length - 2, seconds.length);
    
    finalSum = totalHours + ":" + minutes + ":" + seconds;
    
    return finalSum;
}

totalTime(totalHours, addedHours, addedMinutes, addedSeconds);

console.log("Total Time:", finalSum);


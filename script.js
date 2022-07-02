var startPos, watchId
var startLat = document.getElementById('startLat')
var startLon = document.getElementById('startLon')
var currLat = document.getElementById('currLat')
var currLon = document.getElementById('currLon')
function startTracking() {
    if (navigator.geolocation) {
        document.getElementById('startBtn').style.display = 'none'
        document.getElementById('stopBtn').style.display = 'block'

        // Get Position
        navigator.geolocation.getCurrentPosition(showPosition, showError)

        // Watch Position
        watchId = navigator.geolocation.watchPosition(showUpdatedPosition, showError)
    }
    else {
        alert('Your browser doesn\'t\ Geolocation')
    }
}

function stopTracking() {
    navigator.geolocation.clearWatch(watchId)
    alert('Tracking has stopped')
    document.getElementById('startBtn').style.display = 'block'
    document.getElementById('stopBtn').style.display = 'none'
    startLat.innerHTML = 'Acquiring Latitude...'
    startLon.innerHTML = 'Acquiring Latitude...'
    currLat.innerHTML = 'Acquiring Latitude...'
    currLon.innerHTML = 'Acquiring Latitude...'
    document.getElementById('distanceCovered').innerHTML = '0'
}

function showPosition(position) {
    startPos = position
    startLat.innerHTML = "Latitude: " + startPos.coords.latitude
    startLon.innerHTML = "Longitude: " + startPos.coords.longitude
}

function showUpdatedPosition(position) {
    /* currLat.innerHTML = "Latitude: 19.406200"
    currLon.innerHTML = "Longitude: 73.267303"
    document.getElementById('distanceCovered').innerHTML = calculateDistance(startPos.coords.latitude, startPos.coords.longitude, 19.406200, 73.267303) */
    currLat.innerHTML = "Latitude: " + position.coords.latitude
    currLon.innerHTML = "Longitude: " + position.coords.longitude
    document.getElementById('distanceCovered').innerHTML = calculateDistance(startPos.coords.latitude, startPos.coords.longitude, position.coords.latitude, position.coords.longitude)
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}
Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}
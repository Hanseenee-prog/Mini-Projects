const updateClock = () => {
    const now = new Date();

    const timeUnits = {
        hrs: now.getHours(),
        min: now.getMinutes(),
        sec: now.getSeconds()
    }

    // Helper function to add the leading zeros
    const format = (unit) => String(unit).padStart(2, "0");

    // Update entries
    Object.entries(timeUnits).forEach(([id, value]) => {
        document.getElementById(id).innerHTML = format(value);
    })
}

setInterval(updateClock, 1000);

// Start the clock
updateClock();
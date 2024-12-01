// Submit Alert
function Alert() {
    window.alert("You enrolled successfully.");
}

// Add/ Remove Sections in the Form
$(document).ready(function() {
    $('#add-section').click(function() {
        var newSection = $('#original-form-section').clone();
        newSection.find('input[type="text"]').val('');
        newSection.find('input[type="file"]').val('');
        newSection.removeAttr('id');  // Remove the id attribute to avoid duplicate ids
        $('#form-sections-container').append(newSection);
        $('#remove-section').show();
    });
    $('#remove-section').click(function() {
        $('#form-sections-container .form-section').last().remove();
        if ($('#form-sections-container .form-section').length <= 1) {
            $('#remove-section').hide();  // Hide the "Remove Last Section" button if only the original section is left
        }
    });
});



// Notification Panel
document.addEventListener('DOMContentLoaded', function() {
    var notificationButton = document.getElementById('notificationButton');
    var notificationPanel = document.getElementById('notificationPanel');

    notificationButton.addEventListener('click', function() {

        event.stopPropagation();

        if (notificationPanel.style.display === 'none' || notificationPanel.style.display === '') {
            notificationPanel.style.display = 'block';
        } else {
            notificationPanel.style.display = 'none';
        }
    });

    // Hide the notification panel if clicked outside
    document.addEventListener('click', function(event) {
        var isClickInside = notificationPanel.contains(event.target) || notificationButton.contains(event.target);

        if (!isClickInside) {
            notificationPanel.style.display = 'none';
        }
    });
});

// Right Sidebar
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('rightSidebar');
    const mainContent = document.getElementById('mainContent');
    const hideSidebarBtn = document.getElementById('hideSidebarBtn');
    const showSidebarBtn = document.getElementById('showSidebarBtn');

    const sidebarState = localStorage.getItem('sidebarState');

    const checkWindowSize = () => {
        if (window.innerWidth < 1200) { // Change the width threshold as needed
            sidebar.classList.add('hidden');
            mainContent.classList.add('expanded');
            hideSidebarBtn.style.display = 'none';
            showSidebarBtn.style.display = 'block';
            localStorage.setItem('sidebarState', 'hidden');
        } else {
            if (sidebarState === 'visible') {
                sidebar.classList.remove('hidden');
                mainContent.classList.remove('expanded');
                hideSidebarBtn.style.display = 'block';
                showSidebarBtn.style.display = 'none';
            }
        }
    };

    if (sidebarState === 'hidden') {
        sidebar.classList.add('hidden');
        mainContent.classList.add('expanded');
        hideSidebarBtn.style.display = 'none';
        showSidebarBtn.style.display = 'block';
    }

    hideSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('hidden');
        mainContent.classList.add('expanded');
        hideSidebarBtn.style.display = 'none';
        showSidebarBtn.style.display = 'block';
        localStorage.setItem('sidebarState', 'hidden');
    });

    showSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('expanded');
        hideSidebarBtn.style.display = 'block';
        showSidebarBtn.style.display = 'none';
        localStorage.setItem('sidebarState', 'visible');
    });

    window.addEventListener('resize', checkWindowSize);

    // Initial check
    checkWindowSize();

});

// Approve/ Reject Students in Registered Students
//document.addEventListener('DOMContentLoaded', function() {
//    const statusCell = document.getElementById('status-cell');
//    const rightButton = document.getElementById('approve-button');
//    const wrongButton = document.getElementById('reject-button');
//
//    rightButton.addEventListener('click', function() {
//        statusCell.innerHTML = '<strong>Approved</strong>';
//        statusCell.style.color = 'green'; // Set color to green for "Approved"
//    });
//
//    wrongButton.addEventListener('click', function() {
//        statusCell.innerHTML = '<strong>Rejected</strong>';
//        statusCell.style.color = 'red'; // Set color to red for "Rejected"
//    });
//});

//
//document.addEventListener('DOMContentLoaded', function() {
//            const statusCell = document.getElementById('status-cell');
//            const approveButton = document.getElementById('approve-button');
//            const rejectButton = document.getElementById('reject-button');
//
//            function handleButtonClick(button, action) {
//                const studentId = button.getAttribute('data-id');
//
//                const xhr = new XMLHttpRequest();
//                xhr.open("POST", "/handleApproval/" + studentId, true);
//                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//                xhr.onreadystatechange = function () {
//                    if (xhr.readyState === 4) {
//                        if (xhr.status === 200) {
//                            alert("Success: " + xhr.responseText);
//                        } else {
//                            alert("Error: " + xhr.responseText);
//                        }
//                    }
//                };
//                xhr.send("action=" + action);
//
//                // Update the status cell
//                statusCell.innerHTML = '<strong>' + action.charAt(0).toUpperCase() + action.slice(1) + '</strong>';
//                statusCell.style.color = action === 'Approved' ? 'green' : 'red';
//            }
//
//            approveButton.addEventListener('click', function() {
//                handleButtonClick(this, 'Approved');
//            });
//
//            rejectButton.addEventListener('click', function() {
//                handleButtonClick(this, 'rejected');
//            });
//        });


document.addEventListener('DOMContentLoaded', function() {
    const approveButtons = document.querySelectorAll('.approve-button');
    const rejectButtons = document.querySelectorAll('.reject-button');

    function handleButtonClick(button, action) {
        const studentId = button.getAttribute('data-id');
        const statusCell = button.closest('tr').querySelector('#status-cell');

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/handleApproval/${studentId}`, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert("Success: " + xhr.responseText);
                    // Update the status cell
                    statusCell.innerHTML = '<strong>' + action + '</strong>';
                    statusCell.style.color = action === 'Approved' ? 'green' : 'red';
                } else {
                    alert("Error: " + xhr.responseText);
                }
            }
        };
        xhr.send(`action=${action}`);
    }

    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleButtonClick(this, 'Approved');
        });
    });

    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleButtonClick(this, 'Rejected');
        });
    });
});






// Calendar in Main container
$(document).ready(function() {

    $("#main-calendar").evoCalendar({
        'theme': "Royal Navy",
        'eventDisplayDefault': true,
        'sidebarToggler': true,
        'sidebarDisplayDefault': false,
        'eventListToggler': true,

        calendarEvents: [
            {
                id: 'bHay68s', // Event's ID (required)
                name: "New Year", // Event name (required)
                date: "January/1/2020", // Event date (required)
                description: "Happy New Year!", // Event description (optional)
                type: "holiday", // Event type (required)
                everyYear: true // Same event every year (optional)
            },
            {
                name: "Vacation Leave",
                badge: "02/13 - 02/15", // Event badge (optional)
                date: ["February/13/2020", "February/15/2020"], // Date range
                description: "Vacation leave for 3 days.", // Event description (optional)
                type: "event",
                color: "#63d867" // Event custom color (optional)
            },
            {
                name: "Project Presentation",
                date: "July/15/2024", // Date
                description: "Second Year Project presentation", // Event description (optional)
                type: "event",
                color: "red" // Event custom color (optional)
            }
        ]
    });


//To download as an excel
    document.getElementById("downloadButton").addEventListener("click", function() {
        window.location.href = "/download/excel";
    });


    // Clone the calendar element and initialize for sidebar
    // var clonedCalendar = $("#main-calendar").clone();
    // clonedCalendar.attr('id', 'sidebar-calendar');
    // $('.hero-sidebar').append(clonedCalendar);

    // Initialize sidebar calendar
    $("#sidebar-calendar").evoCalendar({
        'theme': "Royal Navy",
        'eventDisplayDefault': false,
        'sidebarToggler': false,
        'sidebarDisplayDefault': false,
        'eventListToggler': false,
        calendarEvents: [
            {
                id: 'bHay68s',
                name: "New Year",
                date: "January/1/2020",
                description: "Happy New Year!",
                type: "holiday",
                everyYear: true
            },
            {
                name: "Vacation Leave",
                badge: "02/13 - 02/15",
                date: ["February/13/2020", "February/15/2020"],
                description: "Vacation leave for 3 days.",
                type: "event",
                color: "#63d867"
            },
            {
                name: "Project Presentation",
                date: "July/15/2024", // Date
                description: "Second Year Project presentation", // Event description (optional)
                type: "event",
                color: "red" // Event custom color (optional)
            }
        ]
    });
});




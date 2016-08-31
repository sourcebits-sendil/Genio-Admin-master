app.filter('phone', function() {

    return function(input) {
        angular.forEach(input, function(item, key) {
            if (item.type == "PHONE")  var output =  item.value
        });
return output;
    }

});

app.filter('email', function() {
    return function(input) {
        angular.forEach(input, function(item, key) {
            if (item.type == "EMAIL")  var output = item.value
        });
        return output;
    }

});

app.filter('currentStateLabel', function() {

    // Get current state and filter onlt end state
    //eg input homepage.job-hitory
    // out put job history
    return function(input) {
        var label = (input.split(".")).slice(-1)[0];
        var output = label.split("-");
        output = output.join(" ");
        return output;
    }

});
app.filter('customUserDateFilter', function($filter) {
    return function(values, dateString) {
        var filtered = [];

        if (typeof values != 'undefined' && typeof dateString != 'undefined') {
            angular.forEach(values, function(value) {
                if ($filter('date')(value.Date).indexOf(dateString) >= 0) {
                    filtered.push(value);
                }
            });
        }

        return filtered;
    }
});

app.filter('statusFilter', function() {
    return function(input) {
        if (!input) return;
        var output = (input.split("-"))
        output = output.join(" ");
        output
        return output;
    }
});
app.filter('tel', function() {
    return function(tel) {
        if (!tel) {
            return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + '-' + number.slice(3, 7);
            } else {
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        } else {
            return "(" + city;
        }

    };
});
